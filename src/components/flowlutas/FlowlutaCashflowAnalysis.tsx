
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Database } from "@/types/data-model";

type FlowlutaRecord = Pick<Database["public"]["Tables"]["flowlutas"]["Row"],
  "user_id" | "tier" | "monthly_cashflow" | "created_at" | "status">;
type CashflowGroup = {
  userId: string;
  totalCashflow: number;
  flowlutas: Array<{ tier: number; monthlyAmount: number; date: string; status: string }>;
};

interface FlowlutaCashflowAnalysisProps {
  userId?: string;
  tier?: string;
}

export const FlowlutaCashflowAnalysis = ({ userId, tier }: FlowlutaCashflowAnalysisProps) => {
  const { data: cashflowData } = useQuery({
    queryKey: ["flowlutas-cashflow", userId, tier],
    queryFn: async () => {
      let query = firebaseStore
        .collection("flowlutas")
        .select("user_id, tier, monthly_cashflow, created_at, status")
        .order("created_at", { ascending: true });

      if (userId) {
        query = query.eq("user_id", userId);
      }

      if (tier && tier !== "all") {
        query = query.eq("tier", parseInt(tier));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Group flowlutas by user_id and calculate cumulative cashflow
      const groupedByUser = (data as FlowlutaRecord[]).reduce<Record<string, CashflowGroup>>((acc, flowluta) => {
        if (!acc[flowluta.user_id]) {
          acc[flowluta.user_id] = {
            userId: flowluta.user_id,
            totalCashflow: 0,
            flowlutas: [],
          };
        }

        // Only count active flowlutas for total
        if (flowluta.status === 'active') {
          acc[flowluta.user_id].totalCashflow += flowluta.monthly_cashflow;
        }
        
        acc[flowluta.user_id].flowlutas.push({
          tier: flowluta.tier,
          monthlyAmount: flowluta.monthly_cashflow,
          date: new Date(flowluta.created_at).toLocaleDateString(),
          status: flowluta.status,
        });
        
        return acc;
      }, {});

      return Object.values(groupedByUser).sort((a, b) => b.totalCashflow - a.totalCashflow);
    },
  });

  if (!cashflowData || cashflowData.length === 0) {
    return <div className="text-center py-8">Geen cashflow data beschikbaar</div>;
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-6 p-1">
        {cashflowData.map((userData) => (
          <Card key={userData.userId} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">
                  Gebruiker: {userData.userId.substring(0, 8)}...
                </CardTitle>
                <span className="text-sm font-bold">
                  Totaal: €{userData.totalCashflow}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userData.flowlutas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`€${value}`, name === "monthlyAmount" ? "Maandelijks bedrag" : name]}
                      labelFormatter={(label) => `Datum: ${label}`}
                    />
                    <Bar 
                      dataKey="monthlyAmount" 
                      name="Maandelijks bedrag" 
                      fill="#8B5CF6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
