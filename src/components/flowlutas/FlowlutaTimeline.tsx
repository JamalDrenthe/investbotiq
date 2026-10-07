
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/data-model";

type FlowlutaRecord = Pick<Database["public"]["Tables"]["flowlutas"]["Row"],
  "user_id" | "tier" | "status" | "activated_at" | "monthly_cashflow">;

interface FlowlutaTimelineProps {
  userId?: string;
  tier?: string;
}

export const FlowlutaTimeline = ({ userId, tier }: FlowlutaTimelineProps) => {
  const { data: timelineData } = useQuery({
    queryKey: ["flowlutas-timeline", userId, tier],
    queryFn: async () => {
      let query = firebaseStore
        .collection("flowlutas")
        .select("user_id, tier, status, activated_at, monthly_cashflow, next_activation_date")
        .order("activated_at", { ascending: false });

      if (userId) {
        query = query.eq("user_id", userId);
      }

      if (tier && tier !== "all") {
        query = query.eq("tier", parseInt(tier));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Group flowlutas by user_id
      const groupedByUser = (data as FlowlutaRecord[]).reduce<Record<string, FlowlutaRecord[]>>((acc, flowluta) => {
        if (!acc[flowluta.user_id]) {
          acc[flowluta.user_id] = [];
        }
        acc[flowluta.user_id].push(flowluta);
        return acc;
      }, {});

      return Object.entries(groupedByUser).map(([userId, flowlutas]) => ({
        userId,
        flowlutas: flowlutas.sort((a, b) => 
          new Date(a.activated_at).getTime() - new Date(b.activated_at).getTime()
        ),
      }));
    },
  });

  if (!timelineData || timelineData.length === 0) {
    return <div className="text-center py-8">Geen flowluta activaties gevonden</div>;
  }

  return (
    <div className="space-y-6">
      {timelineData.map(({ userId, flowlutas }) => (
        <Card key={userId} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Gebruiker ID: {userId.substring(0, 8)}...
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="w-full">
              <div className="flex space-x-4 p-1 min-w-max">
                {flowlutas.map((flowluta, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <Badge variant={flowluta.status === 'active' ? 'default' : 'outline'}>
                      Tier {flowluta.tier}
                    </Badge>
                    <div className="h-24 flex items-end mt-2">
                      <div 
                        className="w-16 bg-primary rounded-t-md flex items-end justify-center p-1 text-xs text-white font-medium"
                        style={{ 
                          height: `${Math.min(100, flowluta.monthly_cashflow / 10)}%`,
                          minHeight: '24px'
                        }}
                      >
                        €{flowluta.monthly_cashflow}
                      </div>
                    </div>
                    <div className="text-xs mt-1 text-center">
                      {format(new Date(flowluta.activated_at), "dd/MM/yy")}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
