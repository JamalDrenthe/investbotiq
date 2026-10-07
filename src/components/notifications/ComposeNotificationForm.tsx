import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { MessageTypeSelector } from "./form/MessageTypeSelector";
import { RecipientSelector } from "./form/RecipientSelector";
import { MessageForm } from "./form/MessageForm";
import { firebaseStore } from "@/integrations/firebase/client";
import { firestoreDb } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import { isDemoModeEnabled } from "@/lib/auth";
import type { Database } from "@/types/data-model";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type NotificationType = Database["public"]["Enums"]["notification_type"];

const ComposeNotificationForm = () => {
  const { userRole } = useAuth();
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState<NotificationType>("system");
  const [recipient, setRecipient] = useState("all");
  const [isSending, setIsSending] = useState(false);
  const { data: profiles = [], isLoading: isLoadingProfiles, error: profilesError } = useQuery({
    queryKey: ["notificationRecipients"],
    enabled: userRole === "admin",
    queryFn: async () => {
      const { data, error } = await firebaseStore.collection("profiles").select("*");
      if (error) throw error;
      return data as Profile[];
    },
  });

  const handleSendMessage = async () => {
    if (isDemoModeEnabled) {
      toast.error("Verzenden vereist Firebase Authentication; de demo-modus is alleen-lezen.");
      return;
    }
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast.error("Vul een titel en bericht in.");
      return;
    }
    if (profilesError || isLoadingProfiles) {
      toast.error("Ontvangers konden niet worden geladen.");
      return;
    }
    if (!firestoreDb) {
      toast.error("Firebase Firestore is niet geconfigureerd.");
      return;
    }

    const recipients = profiles.filter((profile) => recipient === "all" || profile.id === recipient);
    if (!recipients.length) {
      toast.error("Er zijn geen ontvangers beschikbaar.");
      return;
    }

    setIsSending(true);
    const campaignId = doc(collection(firestoreDb, "notifications")).id;
    try {
      for (let start = 0; start < recipients.length; start += 450) {
        const batch = writeBatch(firestoreDb);
        for (const profile of recipients.slice(start, start + 450)) {
          const notificationRef = doc(firestoreDb, "notifications", `${campaignId}_${profile.id}`);
          batch.set(notificationRef, {
            id: notificationRef.id,
            user_id: profile.id,
            type: messageType,
            bericht: `${messageTitle.trim()}\n\n${messageContent.trim()}`,
            gelezen: false,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          });
        }
        await batch.commit();
      }

      toast.success(`Bericht opgeslagen voor ${recipients.length} ontvanger${recipients.length === 1 ? "" : "s"}.`);
      setMessageTitle("");
      setMessageContent("");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Het bericht kon niet volledig worden opgeslagen. Controleer de meldingen en probeer opnieuw.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); void handleSendMessage(); }}>
      <MessageForm
        title={messageTitle}
        content={messageContent}
        onTitleChange={setMessageTitle}
        onContentChange={setMessageContent}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <MessageTypeSelector value={messageType} onChange={(value) => setMessageType(value as NotificationType)} />
        <RecipientSelector
          value={recipient}
          onChange={setRecipient}
          recipients={profiles.map((profile) => ({
            id: profile.id,
            label: [profile.voornaam, profile.achternaam].filter(Boolean).join(" ") || profile.email || profile.id,
          }))}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isDemoModeEnabled || isSending || isLoadingProfiles || Boolean(profilesError)}>
          <Send className="mr-2 h-4 w-4" />
          {isSending ? "Bezig met opslaan…" : "Verzend Bericht"}
        </Button>
      </div>
      {isDemoModeEnabled && <p className="text-sm text-muted-foreground">Verzenden is uitgeschakeld in de lokale demo-modus.</p>}
    </form>
  );
};

export { ComposeNotificationForm };
