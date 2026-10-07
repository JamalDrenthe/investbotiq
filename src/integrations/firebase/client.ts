import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type DocumentData,
  type WhereFilterOp,
} from "firebase/firestore";
import { getDemoUserId } from "@/lib/demoBackend";
import { firestoreDb } from "@/lib/firebase";
import type { Database } from "@/types/data-model";
import { isDemoModeEnabled } from "@/lib/auth";

type Collections = Database["public"]["Tables"];
type CollectionName = keyof Collections;
type Row<T extends CollectionName> = Collections[T]["Row"];
type Insert<T extends CollectionName> = Collections[T]["Insert"];
type QueryData<T extends CollectionName, Single extends boolean> =
  Single extends true ? Row<T> | null : Row<T>[];
type QueryResult<T extends CollectionName, Single extends boolean> = {
  data: QueryData<T, Single>;
  error: (Error & { code?: string }) | null;
  count?: number;
};
type Filter = { field: string; operator: WhereFilterOp; value: unknown };
type Operation = "select" | "insert" | "update" | "delete";
type DocumentRow = Record<string, unknown>;

function isTimestamp(value: unknown): value is { toDate: () => Date } {
  return typeof value === "object" && value !== null && "toDate" in value &&
    typeof value.toDate === "function";
}

function toError(error: unknown): Error & { code?: string } {
  if (error instanceof Error) return error as Error & { code?: string };
  return new Error("Er is een Firestore-fout opgetreden.");
}

function toDocumentRow(data: DocumentRow, id: string): DocumentRow {
  return Object.fromEntries(
    Object.entries({ ...data, id }).map(([key, value]) => [
      key,
      isTimestamp(value)
        ? value.toDate().toISOString()
        : value,
    ]),
  );
}

function projectFields<T extends CollectionName>(row: Row<T>, fields: string[] | null): Row<T> {
  if (!fields || fields.includes("*")) return row;
  const record = row as DocumentRow;
  return Object.fromEntries(
    fields.filter((field) => field in record).map((field) => [field, record[field]]),
  ) as Row<T>;
}

class FirestoreCollectionQuery<T extends CollectionName, Single extends boolean = false>
  implements PromiseLike<QueryResult<T, Single>>
{
  private filters: Filter[] = [];
  private sort: { field: string; direction: "asc" | "desc" } | null = null;
  private textFilter: { field: string; value: string } | null = null;
  private maxResults: number | null = null;
  private startIndex = 0;
  private totalCount: number | null = null;
  private operation: Operation = "select";
  private payload: Insert<T> | Insert<T>[] | Partial<Row<T>> | null = null;
  private selectedFields: string[] | null = null;
  private includeCount = false;
  private headOnly = false;
  private singleResult = false;
  private allowEmpty = false;

  constructor(private readonly name: T) {}

  select(
    fields = "*",
    options?: { count?: "exact"; head?: boolean },
  ): FirestoreCollectionQuery<T, Single> {
    this.selectedFields = fields.split(",").map((field) => field.trim()).filter(Boolean);
    this.includeCount = options?.count === "exact";
    this.headOnly = options?.head === true;
    return this;
  }

  insert(payload: Insert<T> | Insert<T>[]): FirestoreCollectionQuery<T> {
    this.operation = "insert";
    this.payload = payload;
    return this as unknown as FirestoreCollectionQuery<T>;
  }

  update(payload: Partial<Row<T>>): FirestoreCollectionQuery<T> {
    this.operation = "update";
    this.payload = payload;
    return this as unknown as FirestoreCollectionQuery<T>;
  }

  delete(): FirestoreCollectionQuery<T> {
    this.operation = "delete";
    return this as unknown as FirestoreCollectionQuery<T>;
  }

  eq(field: string, value: unknown): this {
    this.filters.push({ field, operator: "==", value });
    return this;
  }

  is(field: string, value: unknown): this {
    this.filters.push({ field, operator: "==", value });
    return this;
  }

  neq(field: string, value: unknown): this {
    this.filters.push({ field, operator: "!=", value });
    return this;
  }

  in(field: string, values: unknown[]): this {
    this.filters.push({ field, operator: "in", value: values });
    return this;
  }

  or(expression: string): this {
    const match = /^([\w.]+)\.ilike\.%(.+)%$/.exec(expression);
    if (!match) throw new Error("Deze Firestore-zoekexpressie wordt niet ondersteund.");
    this.textFilter = { field: match[1], value: match[2].toLocaleLowerCase() };
    return this;
  }

  order(field: string, options?: { ascending?: boolean }): this {
    this.sort = { field, direction: options?.ascending === false ? "desc" : "asc" };
    return this;
  }

  limit(count: number): this {
    this.maxResults = count;
    return this;
  }

  range(from: number, to: number): this {
    this.startIndex = from;
    this.maxResults = Math.max(0, to - from + 1);
    return this;
  }

  single(): FirestoreCollectionQuery<T, true> {
    this.singleResult = true;
    return this as unknown as FirestoreCollectionQuery<T, true>;
  }

  maybeSingle(): FirestoreCollectionQuery<T, true> {
    this.singleResult = true;
    this.allowEmpty = true;
    return this as unknown as FirestoreCollectionQuery<T, true>;
  }

  then<TResult1 = QueryResult<T, Single>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<T, Single>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute(): Promise<QueryResult<T, Single>> {
    try {
      const rows = isDemoModeEnabled ? await this.executeDemo() : await this.executeFirestore();
      const selected = rows.map((row) => projectFields(row, this.selectedFields));
      const count = this.includeCount ? this.totalCount ?? rows.length : undefined;
      const visibleRows = this.headOnly ? [] : selected;
      if (!this.singleResult) {
        return { data: visibleRows as QueryData<T, Single>, error: null, count };
      }

      if (visibleRows.length === 0 && !this.allowEmpty) {
        return {
          data: null as QueryData<T, Single>,
          error: Object.assign(new Error("Geen document gevonden."), { code: "not-found" }),
          count,
        };
      }
      if (visibleRows.length > 1) {
        return {
          data: null as QueryData<T, Single>,
          error: Object.assign(new Error("Er is meer dan één document gevonden."), { code: "multiple-documents" }),
          count,
        };
      }
      return { data: (visibleRows[0] ?? null) as QueryData<T, Single>, error: null, count };
    } catch (error) {
      return {
        data: (this.singleResult ? null : []) as QueryData<T, Single>,
        error: toError(error),
      };
    }
  }

  private async executeFirestore(): Promise<Row<T>[]> {
    if (!firestoreDb) throw new Error("Firebase Firestore is niet geconfigureerd voor deze omgeving.");
    if (this.operation === "insert") return this.insertFirestore();
    const collectionRef = collection(firestoreDb, this.name);
    const constraints: QueryConstraint[] = this.filters.map(({ field, operator, value }) =>
      where(field, operator, value),
    );
    if (this.sort) constraints.push(orderBy(this.sort.field, this.sort.direction));
    const needsClientPaging = this.includeCount || this.headOnly || this.textFilter !== null;
    if (!needsClientPaging && this.maxResults !== null) {
      constraints.push(limit(this.startIndex + this.maxResults));
    }
    const snapshot = await getDocs(query(collectionRef, ...constraints));
    let rows = snapshot.docs.map((item) => toDocumentRow(item.data(), item.id) as Row<T>);
    if (this.textFilter) {
      const { field, value } = this.textFilter;
      rows = rows.filter((row) => String((row as DocumentRow)[field] ?? "").toLocaleLowerCase().includes(value));
    }
    if (needsClientPaging || this.startIndex > 0) {
      if (needsClientPaging) this.totalCount = rows.length;
      rows = rows.slice(this.startIndex, this.maxResults === null ? undefined : this.startIndex + this.maxResults);
    }

    if (this.operation === "update") return this.updateFirestore(snapshot.docs);
    if (this.operation === "delete") return this.deleteFirestore(snapshot.docs);
    return rows;
  }

  private async insertFirestore(): Promise<Row<T>[]> {
    if (!firestoreDb || !this.payload) return [];
    const inserts = Array.isArray(this.payload) ? this.payload : [this.payload];
    const insertedRows: Row<T>[] = [];
    for (const input of inserts) {
      const row = input as Insert<T> & { id?: string };
      const collectionRef = collection(firestoreDb, this.name);
      const reference = row.id ? doc(collectionRef, row.id) : doc(collectionRef);
      const writeData = {
        ...row,
        id: reference.id,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      await runTransaction(firestoreDb, async (transaction) => {
        const existing = await transaction.get(reference);
        if (existing.exists()) throw new Error("Dit document bestaat al.");
        transaction.set(reference, writeData);
      });
      insertedRows.push(toDocumentRow(writeData, reference.id) as Row<T>);
    }
    return insertedRows;
  }

  private async updateFirestore(documents: QueryDocumentSnapshot<DocumentData>[]): Promise<Row<T>[]> {
    if (!firestoreDb || !this.payload) return [];
    const updatedRows: Row<T>[] = [];
    for (let start = 0; start < documents.length; start += 400) {
      const batch = writeBatch(firestoreDb);
      for (const item of documents.slice(start, start + 400)) {
        batch.update(item.ref, { ...(this.payload as Partial<Row<T>>), updated_at: serverTimestamp() });
        updatedRows.push(toDocumentRow({ ...item.data(), ...(this.payload as DocumentRow) }, item.ref.id) as Row<T>);
      }
      await batch.commit();
    }
    return updatedRows;
  }

  private async deleteFirestore(documents: QueryDocumentSnapshot<DocumentData>[]): Promise<Row<T>[]> {
    if (!firestoreDb) return [];
    for (let start = 0; start < documents.length; start += 400) {
      const batch = writeBatch(firestoreDb);
      for (const item of documents.slice(start, start + 400)) batch.delete(item.ref);
      await batch.commit();
    }
    return [];
  }

  private async executeDemo(): Promise<Row<T>[]> {
    const rows = this.readDemoRows();
    let matching = rows.filter((row) => this.filters.every(({ field, operator, value }) => {
      const current = (row as DocumentRow)[field];
      if (operator === "==") return current === value;
      if (operator === "!=") return current !== value;
      if (operator === "in") return Array.isArray(value) && value.includes(current);
      return false;
    }));
    if (this.textFilter) {
      const { field, value } = this.textFilter;
      matching = matching.filter((row) => String((row as DocumentRow)[field] ?? "").toLocaleLowerCase().includes(value));
    }
    if (this.operation === "insert") return this.insertDemo(rows);
    if (this.operation === "update") return this.updateDemo(rows, matching);
    if (this.operation === "delete") {
      this.writeDemoRows(rows.filter((row) => !matching.includes(row)));
      return [];
    }
    const ordered = this.sort
      ? [...matching].sort((left, right) => {
          const a = (left as DocumentRow)[this.sort!.field];
          const b = (right as DocumentRow)[this.sort!.field];
          const result = String(a ?? "").localeCompare(String(b ?? ""));
          return this.sort!.direction === "asc" ? result : -result;
        })
      : matching;
    this.totalCount = ordered.length;
    return ordered.slice(this.startIndex, this.maxResults === null ? undefined : this.startIndex + this.maxResults);
  }

  private insertDemo(rows: Row<T>[]): Row<T>[] {
    const inserts = Array.isArray(this.payload) ? this.payload : this.payload ? [this.payload] : [];
    const created = inserts.map((input) => {
      const item = input as DocumentRow;
      const id = typeof item.id === "string" ? item.id : crypto.randomUUID();
      const now = new Date().toISOString();
      return { ...item, id, created_at: item.created_at ?? now, updated_at: item.updated_at ?? now } as Row<T>;
    });
    this.writeDemoRows([...rows, ...created]);
    return created;
  }

  private updateDemo(rows: Row<T>[], matching: Row<T>[]): Row<T>[] {
    const patch = this.payload as DocumentRow | null;
    if (!patch) return [];
    const updated = matching.map((row) => ({ ...row, ...patch, updated_at: new Date().toISOString() } as Row<T>));
    const updateById = new Map(updated.map((row) => [(row as DocumentRow).id, row]));
    this.writeDemoRows(rows.map((row) => updateById.get((row as DocumentRow).id) ?? row));
    return updated;
  }

  private readDemoRows(): Row<T>[] {
    try {
      const raw = localStorage.getItem(`investbotiq.demo-data.v1.${this.name}`);
      if (raw) {
        const value: unknown = JSON.parse(raw);
        if (Array.isArray(value)) return value as Row<T>[];
      }
      if (this.name === "profiles") {
        const userId = getDemoUserId();
        const legacy = userId ? localStorage.getItem(`investbotiq.profile.${userId}`) : null;
        if (legacy) return [JSON.parse(legacy) as Row<T>];
        if (userId) return [{ id: userId } as Row<T>];
      }
    } catch {
      return [];
    }
    return [];
  }

  private writeDemoRows(rows: Row<T>[]): void {
    try {
      localStorage.setItem(`investbotiq.demo-data.v1.${this.name}`, JSON.stringify(rows));
      if (this.name === "profiles") {
        const userId = getDemoUserId();
        const profile = rows.find((row) => (row as DocumentRow).id === userId);
        if (userId && profile) {
          localStorage.setItem(`investbotiq.profile.${userId}`, JSON.stringify(profile));
        }
      }
    } catch {
      throw new Error("Lokale demo-opslagruimte is niet beschikbaar.");
    }
  }
}

export const firebaseStore = {
  collection<T extends CollectionName>(name: T): FirestoreCollectionQuery<T> {
    return new FirestoreCollectionQuery(name);
  },
};
