import {
  browserLocalPersistence,
  getIdTokenResult,
  getRedirectResult,
  GoogleAuthProvider,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
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

export const ADMIN_EMAILS = [
  "info@investbotiq.com",
  "info@jamaldrenthe.com",
];

export function isEmailSuperAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
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
    const isSuperAdmin = isEmailSuperAdmin(user.email);
    try {
      const token = await getIdTokenResult(user);
      if (token.claims.admin === true || isSuperAdmin) role = "admin";
    } catch {
      role = isSuperAdmin ? "admin" : "member";
    }

    if (active && currentRevision === revision && firebaseAuth.currentUser?.uid === user.uid) {
      listener(mapFirebaseUser(user, role), role);
      void ensureUserProfile(user.uid, user.email, user.displayName).catch((error) => {
        console.error("Error ensuring user profile:", error);
      });
    }
  });

  return () => {
    active = false;
    revision += 1;
    unsubscribe();
  };
}

export async function checkRedirectResult(): Promise<User | null> {
  if (isDemoModeEnabled || !firebaseAuth) return null;
  try {
    const result = await getRedirectResult(firebaseAuth);
    if (result?.user) {
      await ensureUserProfile(result.user.uid, result.user.email, result.user.displayName);
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Redirect auth error:", error);
    throw error;
  }
}

export async function signInWithGoogle(): Promise<User | null> {
  if (isDemoModeEnabled) {
    const { error } = await demoBackend.auth.signInWithOAuth({ provider: "google" });
    if (error) throw error;
    return null;
  }

  if (!firebaseAuth) throw new Error("Firebase Authentication is nog niet geconfigureerd.");

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    // Attempt popup first: on modern iOS Safari and desktop, a direct user tap opens
    // the sign-in sheet/popup cleanly and returns auth via postMessage, completely
    // avoiding third-party cookie blocking and cross-domain redirect ITP issues.
    const result = await signInWithPopup(firebaseAuth, provider);
    if (result?.user) {
      await ensureUserProfile(result.user.uid, result.user.email, result.user.displayName);
      return result.user;
    }
    return null;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "auth/popup-closed-by-user") {
      return null;
    }
    if (
      err?.code === "auth/popup-blocked" ||
      err?.code === "auth/cancelled-popup-request"
    ) {
      console.warn("Popup blocked by browser, falling back to signInWithRedirect...");
      await signInWithRedirect(firebaseAuth, provider);
      return null;
    }
    throw error;
  }
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
