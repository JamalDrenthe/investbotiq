import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ComposeNotificationForm } from "@/components/notifications/ComposeNotificationForm";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { firebaseStore } from "@/integrations/firebase/client";
import type { Database } from "@/types/data-model";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type NotificationListItem = {
  id: string;
  title: string;
  messagePreview: string;
  sentTo: string;
  recipientCount: number;
  sentDate: string;
  type: string;
  status: string;
};

const AdminNotifications = () => {
  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ["adminNotificationHistory"],
    queryFn: async () => {
      const { data, error } = await firebaseStore.collection("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;

      const records = data as Notification[];
      const userIds = [...new Set(records.map((record) => record.user_id))];
      const profileResults = await Promise.all(
        Array.from({ length: Math.ceil(userIds.length / 30) }, (_, index) =>
          firebaseStore.collection("profiles")
            .select("id, email")
            .in("id", userIds.slice(index * 30, index * 30 + 30)),
        ),
      );
      const profileError = profileResults.find((result) => result.error)?.error;
      if (profileError) throw profileError;
      const profiles = profileResults.flatMap((result) => result.data ?? []) as Profile[];
      const emailsById = new Map(profiles.map((profile) => [profile.id, profile.email ?? profile.id]));

      return records.map((record): NotificationListItem => {
        const [title, ...content] = record.bericht.split("\n\n");
        return {
          id: record.id,
          title: title || "Notificatie",
          messagePreview: content.join(" ").slice(0, 120),
          sentTo: emailsById.get(record.user_id) ?? record.user_id,
          recipientCount: 1,
          sentDate: new Date(record.created_at).toLocaleString("nl-NL"),
          type: record.type,
          status: record.gelezen ? "read" : "delivered",
        };
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-4">Notificaties</h2>
        
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Bericht Opstellen</TabsTrigger>
            <TabsTrigger value="history">Verzonden Berichten</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nieuw Bericht</CardTitle>
                <CardDescription>
                  Stel een bericht op om te verzenden naar leden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComposeNotificationForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Verzonden Berichten</CardTitle>
                <CardDescription>
                  Overzicht van eerder verzonden berichten
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <p role="status">Berichten laden…</p> : error ? (
                  <p role="alert" className="text-destructive">Berichten konden niet worden geladen.</p>
                ) : notifications.length ? (
                  <NotificationsList notifications={notifications} />
                ) : <p>Er zijn nog geen verzonden berichten.</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminNotifications, ["admin"]);
