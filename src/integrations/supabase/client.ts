export type LocalUser = {
  id: string;
  email: string;
  created_at: string;
  app_metadata: { role: "admin" | "member" | "guest" };
  user_metadata: Record<string, unknown>;
};

export type LocalSession = {
  access_token: string;
  user: LocalUser;
};

type AuthStateChange = (event: "SIGNED_IN" | "SIGNED_OUT", session: LocalSession | null) => void;
type QueryError = Error & { code?: string };
type QueryResult = { data: unknown; error: QueryError | null };

const SESSION_KEY = "investbotiq.local-session";
const USERS_KEY = "investbotiq.local-users";
const listeners = new Set<AuthStateChange>();

const readSession = (): LocalSession | null => {
  const rawSession = localStorage.getItem(SESSION_KEY);
  return rawSession ? (JSON.parse(rawSession) as LocalSession) : null;
};

const readUsers = (): LocalUser[] => {
  const rawUsers = localStorage.getItem(USERS_KEY);
  return rawUsers ? (JSON.parse(rawUsers) as LocalUser[]) : [];
};

const saveSession = (session: LocalSession | null) => {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
};

const getOrCreateUser = (email: string): LocalUser => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const existingUser = users.find((user) => user.email === normalizedEmail);
  if (existingUser) return existingUser;

  const user: LocalUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    created_at: new Date().toISOString(),
    app_metadata: { role: normalizedEmail.startsWith("admin") ? "admin" : "member" },
    user_metadata: {},
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return user;
};

class LocalQueryBuilder implements PromiseLike<QueryResult> {
  private filters: Record<string, unknown> = {};
  private negatedFilters: Record<string, unknown> = {};
  private inFilters: Record<string, unknown[]> = {};
  private allowEmpty = false;
  private operation: "select" | "insert" | "update" = "select";
  private payload: unknown;
  private singleResult = false;

  constructor(private readonly table: string) {}

  select(_columns = "*") {
    this.operation = "select";
    return this;
  }

  insert(payload: unknown) {
    this.operation = "insert";
    this.payload = payload;
    return this;
  }

  update(payload: unknown) {
    this.operation = "update";
    this.payload = payload;
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters[column] = value;
    return this;
  }

  is(column: string, value: unknown) {
    this.filters[column] = value;
    return this;
  }

  neq(column: string, value: unknown) {
    this.negatedFilters[column] = value;
    return this;
  }

  in(column: string, values: unknown[]) {
    this.inFilters[column] = values;
    return this;
  }

  order(_column: string, _options?: { ascending?: boolean }) {
    return this;
  }

  limit(_count: number) {
    return this;
  }

  single() {
    this.singleResult = true;
    return this;
  }

  maybeSingle() {
    this.singleResult = true;
    this.allowEmpty = true;
    return this;
  }

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve(this.execute()).then(onfulfilled, onrejected);
  }

  private execute(): QueryResult {
    const session = readSession();
    const rows = this.getRows(session?.user.id);

    if (this.operation === "insert") return { data: this.payload, error: null };

    if (this.operation === "update") {
      if (this.table === "profiles" && session?.user.id) {
        const currentProfile = rows[0] ?? { id: session.user.id };
        localStorage.setItem(
          `investbotiq.profile.${session.user.id}`,
          JSON.stringify({ ...currentProfile, ...(this.payload as Record<string, unknown>) }),
        );
      }
      return { data: null, error: null };
    }

    const filteredRows = rows.filter(
      (row) =>
        Object.entries(this.filters).every(([key, value]) => row[key] === value) &&
        Object.entries(this.negatedFilters).every(([key, value]) => row[key] !== value) &&
        Object.entries(this.inFilters).every(([key, values]) => values.includes(row[key])),
    );
    const data = this.singleResult ? (filteredRows[0] ?? null) : filteredRows;
    return this.singleResult && !data && !this.allowEmpty
      ? { data: null, error: Object.assign(new Error("Geen lokale gegevens gevonden"), { code: "PGRST116" }) }
      : { data, error: null };
  }

  private getRows(userId: string | undefined): Record<string, unknown>[] {
    if (this.table === "user_roles" && userId) {
      const session = readSession();
      return [{ user_id: userId, role: session?.user.app_metadata.role ?? "member" }];
    }

    if (this.table === "profiles" && userId) {
      const rawProfile = localStorage.getItem(`investbotiq.profile.${userId}`);
      return [rawProfile ? JSON.parse(rawProfile) : { id: userId }];
    }

    return [];
  }
}

export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      if (!email.trim() || password.length < 4) {
        return {
          data: { user: null },
          error: new Error("Vul een e-mailadres en minimaal vier tekens als wachtwoord in."),
        };
      }

      const user = getOrCreateUser(email);
      const session: LocalSession = { access_token: `local-${user.id}`, user };
      saveSession(session);
      listeners.forEach((listener) => listener("SIGNED_IN", session));
      return { data: { user, session }, error: null };
    },
    signOut: async () => {
      saveSession(null);
      listeners.forEach((listener) => listener("SIGNED_OUT", null));
      return { error: null };
    },
    getSession: async () => ({ data: { session: readSession() }, error: null }),
    onAuthStateChange: (listener: AuthStateChange) => {
      listeners.add(listener);
      return { data: { subscription: { unsubscribe: () => listeners.delete(listener) } } };
    },
    updateUser: async ({ password }: { password?: string }) => ({
      error: password && password.length >= 4 ? null : new Error("Gebruik minimaal vier tekens voor het wachtwoord."),
    }),
    admin: {
      getUserById: async (id: string) => {
        const user = readUsers().find((candidate) => candidate.id === id);
        return { data: { user: user ?? null }, error: user ? null : new Error("Gebruiker niet gevonden") };
      },
    },
  },
  from: (table: string) => new LocalQueryBuilder(table),
  rpc: async (_name: string) => ({ data: 0, error: null }),
  functions: {
    invoke: async (_name: string, _options?: unknown) => ({ data: null, error: null }),
  },
};
