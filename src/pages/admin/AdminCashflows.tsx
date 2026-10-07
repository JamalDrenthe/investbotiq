import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { CashflowSearch } from "@/components/cashflow/CashflowSearch";
import { CashflowTable } from "@/components/cashflow/CashflowTable";
import { CashflowHistoryTable } from "@/components/cashflow/CashflowHistoryTable";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import { useCashflowManagement, type CashflowUser } from "@/hooks/useCashflowManagement";
import { useAuth } from "@/components/AuthProvider";
import { firebaseStore } from "@/integrations/firebase/client";
import type { Database } from "@/types/data-model";
import Header from "@/components/Header";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Cashflow = Database["public"]["Tables"]["cashflows"]["Row"];

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

const AdminCashflows = () => {
  const { user, userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["adminCashflowUsers", user?.id, userRole],
    enabled: userRole === "admin",
    queryFn: async () => {
      const currentDate = new Date();
      const currentMonth = monthKey(currentDate);
      const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const previousMonth = monthKey(previousDate);
      const [profilesResult, cashflowsResult] = await Promise.all([
        firebaseStore.collection("profiles").select("*"),
        firebaseStore.collection("cashflows").select("*").in("maand", [currentMonth, previousMonth]),
      ]);
      if (profilesResult.error) throw profilesResult.error;
      if (cashflowsResult.error) throw cashflowsResult.error;

      const records = new Map<string, Cashflow>();
      for (const cashflow of cashflowsResult.data as Cashflow[]) {
        const key = `${cashflow.user_id}:${cashflow.maand}`;
        const existing = records.get(key);
        if (!existing || cashflow.updated_at > existing.updated_at) records.set(key, cashflow);
      }

      return (profilesResult.data as Profile[]).map((profile): CashflowUser => {
        const current = records.get(`${profile.id}:${currentMonth}`);
        const previous = records.get(`${profile.id}:${previousMonth}`);
        const currentCashflow = current?.cashflow_bedrag ?? 0;
        const previousCashflow = previous?.cashflow_bedrag ?? 0;
        return {
          id: profile.id,
          email: profile.email ?? "E-mail niet beschikbaar",
          name: [profile.voornaam, profile.achternaam].filter(Boolean).join(" ") || "Naam niet ingesteld",
          currentCashflow,
          previousCashflow,
          changePercentage: previousCashflow === 0
            ? 0
            : Number((((currentCashflow - previousCashflow) / previousCashflow) * 100).toFixed(2)),
          lastUpdated: current?.updated_at
            ? new Date(current.updated_at).toLocaleDateString("nl-NL")
            : "—",
        };
      });
    },
  });
  const filteredUsers = users.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const { cashflowValues, isUpdating, handleCashflowChange, handleSave } = useCashflowManagement(users);

  useEffect(() => {
    if (!users.length) {
      setSelectedUserId(null);
      return;
    }
    if (!selectedUserId || !users.some((account) => account.id === selectedUserId)) {
      setSelectedUserId(users[0].id);
    }
  }, [users, selectedUserId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />
        <h2 className="text-xl font-semibold mb-4">Cashflowbeheer</h2>

        <div className="flex justify-between items-center mb-6">
          <CashflowSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cashflow Aanpassingen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Pas de maandelijkse cashflow aan per gebruiker. Wijzigingen en historie worden samen in Firestore opgeslagen.
            </p>
            {isLoading ? <p role="status">Cashflows laden…</p> : error ? (
              <p role="alert" className="text-destructive">Cashflows konden niet worden geladen.</p>
            ) : (
              <CashflowTable
                users={filteredUsers}
                cashflowValues={cashflowValues}
                isUpdating={isUpdating}
                onCashflowChange={handleCashflowChange}
                onSave={handleSave}
              />
            )}

            <div className="mt-8">
              <CardTitle className="mb-4">Cashflow Historie</CardTitle>
              {selectedUserId && <CashflowHistoryTable userId={selectedUserId} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminCashflows, ["admin"]);
