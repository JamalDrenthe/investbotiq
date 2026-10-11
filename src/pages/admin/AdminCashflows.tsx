import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { CashflowSearch } from "@/components/cashflow/CashflowSearch";
import { CashflowTable } from "@/components/cashflow/CashflowTable";
import { CashflowHistoryTable } from "@/components/cashflow/CashflowHistoryTable";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";
import { useCashflowManagement, type CashflowUser } from "@/hooks/useCashflowManagement";
import { useAuth } from "@/components/AuthProvider";
import { firebaseStore } from "@/integrations/firebase/client";
import type { Database } from "@/types/data-model";
import { CircleDollarSign, TrendingUp, Users, Download } from "lucide-react";
import { toast } from "sonner";

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

  const totalCurrentCashflow = users.reduce((acc, u) => acc + (cashflowValues[u.id] ?? u.currentCashflow), 0);
  const averageCashflow = users.length > 0 ? (totalCurrentCashflow / users.length).toFixed(2) : "0,00";

  const exportCashflowsCSV = () => {
    if (!users.length) {
      toast.error("Geen gegevens om te exporteren.");
      return;
    }
    const headers = ["ID", "Naam", "Email", "Huidige Cashflow (EUR)", "Vorige Cashflow (EUR)", "Verandering (%)", "Laatst Bijgewerkt"];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      `"${u.email}"`,
      cashflowValues[u.id] ?? u.currentCashflow,
      u.previousCashflow,
      `${u.changePercentage}%`,
      `"${u.lastUpdated}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `investbotiq-cashflows-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Cashflow overzicht geëxporteerd naar CSV");
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6">

        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Cashflowbeheer</h2>
            <p className="text-muted-foreground text-sm">
              Beheer en overschrijf maandelijkse cashflow bedragen per member account.
            </p>
          </div>
          <button
            type="button"
            onClick={exportCashflowsCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent transition"
          >
            <Download className="h-4 w-4" />
            Exporteer CSV
          </button>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Totale Maandcashflow</span>
              <CircleDollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold font-mono text-emerald-600">
              €{totalCurrentCashflow.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Gemiddeld per Member</span>
              <TrendingUp className="h-4 w-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold font-mono">
              €{Number(averageCashflow).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Gekoppelde Accounts</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">{users.length}</p>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <CashflowSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cashflow Aanpassingen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Klik op een regel om de historie te bekijken. Voer een bedrag in en klik op opslaan om direct een auditlog vast te leggen.
            </p>
            {isLoading ? (
              <p role="status" className="text-center py-8 text-sm text-indigo-500 animate-pulse">Cashflows laden…</p>
            ) : error ? (
              <p role="alert" className="text-destructive text-sm">Cashflows konden niet worden geladen.</p>
            ) : (
              <CashflowTable
                users={filteredUsers}
                cashflowValues={cashflowValues}
                isUpdating={isUpdating}
                onCashflowChange={handleCashflowChange}
                onSave={handleSave}
                selectedUserId={selectedUserId}
                onSelectUser={setSelectedUserId}
              />
            )}

            <div className="mt-8 border-t border-border pt-6">
              <CardTitle className="mb-4 text-lg">
                Cashflow Historie {selectedUserId ? `(Geselecteerd: ${users.find((u) => u.id === selectedUserId)?.name || selectedUserId})` : ""}
              </CardTitle>
              {selectedUserId ? (
                <CashflowHistoryTable userId={selectedUserId} />
              ) : (
                <p className="text-sm text-muted-foreground">Selecteer een gebruiker hierboven om de historie te bekijken.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminCashflows, ["admin"]);
