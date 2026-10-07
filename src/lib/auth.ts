import {
  browserLocalPersistence,
  getIdTokenResult,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword as firebaseUpdatePassword,
  type User,
} from "firebase/auth";
import { demoBackend, getDemoUserId } from "@/lib/demoBackend";
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/profiles";
import type { LocalUser, UserRole } from "@/types/auth";

type AuthListener = (user: LocalUser | null, role: UserRole | null) => void;

export const isDemoModeEnabled =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEMO_MODE === "true";
export const isAuthAvailable = isDemoModeEnabled || isFirebaseConfigured;

export function getCurrentUserId(): string | null {
  return isDemoModeEnabled ? getDemoUserId() : firebaseAuth?.currentUser?.uid ?? null;
}

function mapFirebaseUser(user: User, role: UserRole): LocalUser {
  return {
    id: user.uid,
    email: user.email ?? "",
    created_at: user.metadata.creationTime ?? "",
    app_metadata: { role },
    user_metadata: { displayName: user.displayName },
  };
}

export function observeAuthState(listener: AuthListener): () => void {
  if (isDemoModeEnabled) {
    let active = true;
    let revision = 0;
    const { data: { subscription } } = demoBackend.auth.onAuthStateChange((_event, session) => {
      revision += 1;
      const user = session?.user ?? null;
      listener(user, user?.app_metadata.role ?? null);
    });

    const initialRevision = revision;
    void demoBackend.auth.getSession().then(({ data: { session } }) => {
      if (!active || revision !== initialRevision) return;
      const user = session?.user ?? null;
      listener(user, user?.app_metadata.role ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }

  if (!firebaseAuth) {
    listener(null, null);
    return () => undefined;
  }

  let active = true;
  let revision = 0;
  const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
    const currentRevision = ++revision;
    if (!user) {
      listener(null, null);
      return;
    }

    let role: UserRole = "member";
    try {
      const token = await getIdTokenResult(user);
      if (token.claims.admin === true) role = "admin";
    } catch {
      role = "member";
    }

    if (active && currentRevision === revision && firebaseAuth.currentUser?.uid === user.uid) {
      try {
        await ensureUserProfile(user.uid, user.email);
      } catch (error) {
        console.error("Error ensuring user profile:", error);
      }
    }

    if (active && currentRevision === revision && firebaseAuth.currentUser?.uid === user.uid) {
      listener(mapFirebaseUser(user, role), role);
    }
  });

  return () => {
    active = false;
    revision += 1;
    unsubscribe();
  };
}

export async function signInWithPassword(email: string, password: string): Promise<void> {
  if (isDemoModeEnabled) {
    const { error } = await demoBackend.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return;
  }

  if (!firebaseAuth) throw new Error("Firebase Authentication is nog niet geconfigureerd.");
  await setPersistence(firebaseAuth, browserLocalPersistence);
  await firebaseSignInWithEmailAndPassword(firebaseAuth, email.trim(), password);
}

export async function signOut(): Promise<void> {
  if (isDemoModeEnabled) {
    const { error } = await demoBackend.auth.signOut();
    if (error) throw error;
    return;
  }

  if (firebaseAuth) await firebaseSignOut(firebaseAuth);
}

export async function updatePassword(password: string): Promise<void> {
  if (isDemoModeEnabled) {
    const { error } = await demoBackend.auth.updateUser({ password });
    if (error) throw error;
    return;
  }

  if (!firebaseAuth?.currentUser) throw new Error("Log opnieuw in om je wachtwoord te wijzigen.");
  await firebaseUpdatePassword(firebaseAuth.currentUser, password);
}
