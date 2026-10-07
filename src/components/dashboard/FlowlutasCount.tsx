
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const FlowlutasCount = () => {
  const { user, userRole } = useAuth();
  const { data: flowlutasCount } = useQuery({
    queryKey: ["activeFlowlutas", user?.id, userRole],
    queryFn: async () => {
      if (!user) return 0;
      let query = firebaseStore
        .collection("flowlutas")
        .select("*", { count: "exact" })
        .eq("status", "active");
      if (userRole !== "admin") query = query.eq("user_id", user.id);
      const { count, error } = await query;
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Actieve Flowlutas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{flowlutasCount || 0}</div>
      </CardContent>
    </Card>
  );
};

export default FlowlutasCount;
