
import { firebaseStore } from "@/integrations/firebase/client";
import { getCurrentUserId, isDemoModeEnabled } from "@/lib/auth";
import { firestoreDb } from "@/lib/firebase";
import { collection, doc, getDocs, query, runTransaction, serverTimestamp, where } from "firebase/firestore";
import { toast } from "sonner";

export async function updateCashflow(userId: string, newAmount: number, note?: string) {
  if (isDemoModeEnabled) throw new Error("Cashflow wijzigen vereist Firebase Authentication; de demo-modus is alleen-lezen.");
  if (!firestoreDb) throw new Error("Firebase Firestore is niet geconfigureerd.");
  if (!Number.isFinite(newAmount)) throw new Error("Voer een geldig cashflowbedrag in.");
  const changedBy = getCurrentUserId();
  if (!changedBy) throw new Error("Er is geen aangemelde beheerder gevonden.");

  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const cashflowQuery = query(
    collection(firestoreDb, "cashflows"),
    where("user_id", "==", userId),
    where("maand", "==", month),
  );
  const matches = await getDocs(cashflowQuery);
  if (matches.size > 1) throw new Error("Er zijn meerdere cashflowrecords voor deze maand.");
  const cashflowRef = matches.docs[0]?.ref ?? doc(firestoreDb, "cashflows", `${userId}_${month}`);
  const historyRef = doc(collection(firestoreDb, "cashflow_history"));

  await runTransaction(firestoreDb, async (transaction) => {
    const current = await transaction.get(cashflowRef);
    const previousAmount = current.exists() ? current.data().cashflow_bedrag ?? 0 : 0;
    const timestamp = serverTimestamp();

    if (!current.exists()) {
      transaction.set(cashflowRef, {
        id: cashflowRef.id,
        user_id: userId,
        maand: month,
        cashflow_bedrag: newAmount,
        created_at: timestamp,
        updated_at: timestamp,
      });
    } else {
      transaction.update(cashflowRef, {
        cashflow_bedrag: newAmount,
        updated_at: timestamp,
      });
    }

    transaction.set(historyRef, {
      id: historyRef.id,
      user_id: userId,
      amount: newAmount,
      previous_amount: previousAmount,
      changed_by: changedBy,
      changed_at: timestamp,
      note: note ?? null,
      created_at: timestamp,
      updated_at: timestamp,
    });
  });

  return { success: true };
}

export async function activateFlowluta(flowlutaId: string) {
  try {
    const { data: flowluta, error: flowlutaError } = await firebaseStore
      .collection('flowlutas')
      .update({
        status: 'active',
        activated_at: new Date().toISOString()
      })
      .eq('id', flowlutaId)
      .select()
      .single();

    if (flowlutaError) throw flowlutaError;

    // Stuur een notificatie
    const { error: notificationError } = await firebaseStore
      .collection('notifications')
      .insert({
        user_id: flowluta.user_id,
        type: 'flowluta',
        bericht: `Je Flowluta is succesvol geactiveerd!`
      });

    if (notificationError) throw notificationError;

    return { success: true, flowluta };
  } catch (error) {
    console.error('Error activating flowluta:', error);
    throw error;
  }
}

export async function scheduleNotification({
  title,
  content,
  type,
  scheduledFor,
  recipientId,
  isGroupNotification = false
}: {
  title: string;
  content: string;
  type: 'taak' | 'flowluta' | 'system';
  scheduledFor: Date;
  recipientId?: string;
  isGroupNotification?: boolean;
}) {
  try {
    const { error } = await firebaseStore
      .collection('scheduled_notifications')
      .insert({
        title,
        content,
        type,
        scheduled_for: scheduledFor.toISOString(),
        recipient_id: recipientId,
        is_group_notification: isGroupNotification
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}
