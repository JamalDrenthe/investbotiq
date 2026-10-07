
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const CashflowSummary = () => {
  const { user } = useAuth();
  const { data: totalCashflow } = useQuery({
    queryKey: ["monthlyTotalCashflow", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { data, error } = await firebaseStore
        .collection("cashflows")
        .select("cashflow_bedrag")
        .eq("maand", new Date().toISOString().slice(0, 7))
        .eq("user_id", user.id)
        .single();
      
      if (error) throw error;
      return data?.cashflow_bedrag || 0;
    },
    enabled: !!user,
  });

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Maandelijkse Cashflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          €{totalCashflow?.toLocaleString("nl-NL", { minimumFractionDigits: 2 }) || "0,00"}
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowSummary;
