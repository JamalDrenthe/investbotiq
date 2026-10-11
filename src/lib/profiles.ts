import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@/lib/firebase";

export async function ensureUserProfile(
  userId: string,
  email: string | null,
  displayName?: string | null,
): Promise<void> {
  if (!firestoreDb) return;

  let voornaam: string | null = null;
  let achternaam: string | null = null;
  if (displayName?.trim()) {
    const parts = displayName.trim().split(/\s+/);
    voornaam = parts[0] || null;
    achternaam = parts.slice(1).join(" ") || null;
  }

  const profileRef = doc(firestoreDb, "profiles", userId);
  const profile = await getDoc(profileRef);
  if (!profile.exists()) {
    await setDoc(profileRef, {
      id: userId,
      email,
      voornaam,
      achternaam,
      telefoonnummer: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return;
  }

  const data = profile.data();
  const updates: Record<string, unknown> = {};
  if (data.email !== email) updates.email = email;
  if (!data.voornaam && voornaam) updates.voornaam = voornaam;
  if (!data.achternaam && achternaam) updates.achternaam = achternaam;

  if (Object.keys(updates).length > 0) {
    updates.updated_at = serverTimestamp();
    await updateDoc(profileRef, updates);
  }
}
