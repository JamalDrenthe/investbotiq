import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@/lib/firebase";

export async function ensureUserProfile(userId: string, email: string | null): Promise<void> {
  if (!firestoreDb) return;

  const profileRef = doc(firestoreDb, "profiles", userId);
  const profile = await getDoc(profileRef);
  if (!profile.exists()) {
    await setDoc(profileRef, {
      id: userId,
      email,
      voornaam: null,
      achternaam: null,
      telefoonnummer: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return;
  }

  if (profile.data().email !== email) {
    await updateDoc(profileRef, { email, updated_at: serverTimestamp() });
  }
}
