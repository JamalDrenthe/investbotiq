import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, before, beforeEach, test } from "node:test";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

let testEnvironment;

before(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: "demo-investbotiq",
    firestore: {
      rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"),
    },
  });
});

beforeEach(async () => {
  await testEnvironment.clearFirestore();
});

after(async () => {
  await testEnvironment.cleanup();
});

async function seed(path, value) {
  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), path), value);
  });
}

test("profiles are private to their owner and admins", async () => {
  await seed("profiles/alice", { id: "alice", email: "alice@example.com" });
  const aliceDb = testEnvironment.authenticatedContext("alice").firestore();
  const bobDb = testEnvironment.authenticatedContext("bob").firestore();
  const adminDb = testEnvironment.authenticatedContext("admin", { admin: true }).firestore();

  await assertSucceeds(getDoc(doc(aliceDb, "profiles/alice")));
  await assertFails(getDoc(doc(bobDb, "profiles/alice")));
  await assertSucceeds(getDoc(doc(adminDb, "profiles/alice")));
  await assertFails(updateDoc(doc(aliceDb, "profiles/alice"), { role: "admin" }));
});

test("members can query only their own task documents", async () => {
  await seed("tasks/task-alice", { id: "task-alice", user_id: "alice", status: "open" });
  await seed("tasks/task-bob", { id: "task-bob", user_id: "bob", status: "open" });
  const aliceDb = testEnvironment.authenticatedContext("alice").firestore();

  const ownTasks = query(collection(aliceDb, "tasks"), where("user_id", "==", "alice"));
  await assertSucceeds(getDocs(ownTasks));
  await assertFails(getDocs(collection(aliceDb, "tasks")));
  await assertFails(getDoc(doc(aliceDb, "tasks/task-bob")));
  await assertSucceeds(updateDoc(doc(aliceDb, "tasks/task-alice"), { status: "completed" }));
  await assertFails(updateDoc(doc(aliceDb, "tasks/task-alice"), { priority: "high" }));
});

test("cashflows are private and financial changes require an admin", async () => {
  await seed("cashflows/cashflow-alice", {
    id: "cashflow-alice",
    user_id: "alice",
    maand: "2026-10",
    cashflow_bedrag: 125,
  });
  const aliceDb = testEnvironment.authenticatedContext("alice").firestore();
  const bobDb = testEnvironment.authenticatedContext("bob").firestore();
  const adminDb = testEnvironment.authenticatedContext("admin", { admin: true }).firestore();

  await assertSucceeds(getDoc(doc(aliceDb, "cashflows/cashflow-alice")));
  await assertFails(getDoc(doc(bobDb, "cashflows/cashflow-alice")));
  await assertFails(updateDoc(doc(aliceDb, "cashflows/cashflow-alice"), { cashflow_bedrag: 250 }));
  await assertSucceeds(updateDoc(doc(adminDb, "cashflows/cashflow-alice"), { cashflow_bedrag: 250 }));
  await assertSucceeds(setDoc(doc(adminDb, "cashflow_history/history-1"), {
    id: "history-1",
    user_id: "alice",
    amount: 250,
    previous_amount: 125,
    changed_by: "admin",
  }));
  await assertFails(setDoc(doc(aliceDb, "cashflow_history/history-2"), {
    id: "history-2",
    user_id: "alice",
    amount: 300,
    previous_amount: 250,
    changed_by: "alice",
  }));
});

test("notifications are private and users can only mark their own as read", async () => {
  await seed("notifications/for-alice", {
    id: "for-alice",
    user_id: "alice",
    type: "system",
    bericht: "Welkom",
    gelezen: false,
  });
  const aliceDb = testEnvironment.authenticatedContext("alice").firestore();
  const bobDb = testEnvironment.authenticatedContext("bob").firestore();
  const adminDb = testEnvironment.authenticatedContext("admin", { admin: true }).firestore();

  await assertSucceeds(getDoc(doc(aliceDb, "notifications/for-alice")));
  await assertFails(getDoc(doc(bobDb, "notifications/for-alice")));
  await assertSucceeds(updateDoc(doc(aliceDb, "notifications/for-alice"), { gelezen: true }));
  await assertFails(updateDoc(doc(aliceDb, "notifications/for-alice"), { type: "lead" }));
  await assertFails(setDoc(doc(aliceDb, "notifications/for-bob"), {
    id: "for-bob",
    user_id: "bob",
    type: "system",
    bericht: "Ongeautoriseerd",
    gelezen: false,
  }));
  await assertSucceeds(setDoc(doc(adminDb, "notifications/admin-message"), {
    id: "admin-message",
    user_id: "alice",
    type: "system",
    bericht: "Beheerderbericht",
    gelezen: false,
  }));
});

test("registration submissions are public but readable only by admins", async () => {
  const lead = {
    id: "lead-1",
    role: "member",
    general: {
      voornaam: "Ada",
      achternaam: "Lovelace",
      woonplaats: "Utrecht",
      geboortedatum: "1815-12-10",
      email: "ada@example.com",
      telefoon: "0612345678",
      hoe_hoorde_u_van_ons: "Website",
      referral: "",
      plus_1: "",
    },
    answers: {},
    status: "new",
    created_at: new Date(),
    updated_at: new Date(),
  };
  const anonymousDb = testEnvironment.unauthenticatedContext().firestore();
  const memberDb = testEnvironment.authenticatedContext("alice").firestore();
  const adminDb = testEnvironment.authenticatedContext("admin", { admin: true }).firestore();

  await assertSucceeds(setDoc(doc(anonymousDb, "registration_leads/lead-1"), lead));
  await assertFails(getDoc(doc(memberDb, "registration_leads/lead-1")));
  await assertSucceeds(getDoc(doc(adminDb, "registration_leads/lead-1")));
  await assertFails(setDoc(doc(anonymousDb, "registration_leads/lead-2"), { ...lead, role: "admin" }));
});

test("referral profiles can be created only for the signed-in user", async () => {
  const aliceDb = testEnvironment.authenticatedContext("alice").firestore();
  const referral = {
    id: "alice",
    user_id: "alice",
    referral_code: "alice123",
    referred_user_id: null,
    status: "pending",
  };

  await assertSucceeds(setDoc(doc(aliceDb, "referrals/alice"), referral));
  await assertFails(setDoc(doc(aliceDb, "referrals/bob"), { ...referral, id: "bob", user_id: "bob" }));
});
