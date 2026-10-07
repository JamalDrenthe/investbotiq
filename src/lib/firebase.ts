import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const useFirebaseEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (useFirebaseEmulators ? "demo-api-key" : undefined),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (useFirebaseEmulators ? "localhost" : undefined),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || (useFirebaseEmulators ? "demo-investbotiq" : undefined),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (useFirebaseEmulators ? "demo-investbotiq-app" : undefined),
};

export const isFirebaseConfigured = useFirebaseEmulators || Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

export const firebaseApp = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firestoreDb = firebaseApp ? getFirestore(firebaseApp) : null;

if (useFirebaseEmulators && firebaseAuth && firestoreDb) {
  connectAuthEmulator(
    firebaseAuth,
    import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL || "http://127.0.0.1:9099",
    { disableWarnings: true },
  );
  connectFirestoreEmulator(
    firestoreDb,
    import.meta.env.VITE_FIRESTORE_EMULATOR_HOST || "127.0.0.1",
    Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT) || 8080,
  );
}
