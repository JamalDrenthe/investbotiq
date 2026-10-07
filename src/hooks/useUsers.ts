import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { firebaseStore } from "@/integrations/firebase/client";
import type { Database } from "@/types/data-model";
import type { UserType } from "@/components/admin/users/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Cashflow = Database["public"]["Tables"]["cashflows"]["Row"];
type Flowluta = Database["public"]["Tables"]["flowlutas"]["Row"];
type BelLoan = Database["public"]["Tables"]["bel_loans"]["Row"];

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export const useUsers = () => {
  const { user, userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const { data: allUsers = [], isLoading, error } = useQuery({
    queryKey: ["adminUsers", user?.id, userRole],
    enabled: userRole === "admin",
    queryFn: async () => {
      const currentMonth = monthKey(new Date());
      const previousDate = new Date();
      previousDate.setMonth(previousDate.getMonth() - 1);
      const previousMonth = monthKey(previousDate);
      const [profilesResult, cashflowsResult, flowlutasResult, loansResult] = await Promise.all([
        firebaseStore.collection("profiles").select("*"),
        firebaseStore.collection("cashflows").select("*").in("maand", [currentMonth, previousMonth]),
        firebaseStore.collection("flowlutas").select("user_id").eq("status", "active"),
        firebaseStore.collection("bel_loans").select("user_id, openstaand_bedrag"),
      ]);

      const failedResult = [profilesResult, cashflowsResult, flowlutasResult, loansResult]
        .find((result) => result.error);
      if (failedResult?.error) throw failedResult.error;

      const profiles = profilesResult.data as Profile[];
      const cashflows = cashflowsResult.data as Cashflow[];
      const flowlutas = flowlutasResult.data as Flowluta[];
      const loans = loansResult.data as BelLoan[];
      const currentCashflows = new Map<string, number>();
      const previousCashflows = new Map<string, number>();
      const spiritCounts = new Map<string, number>();
      const outstandingLoans = new Map<string, number>();

      for (const cashflow of cashflows) {
        const values = cashflow.maand === currentMonth ? currentCashflows : previousCashflows;
        values.set(cashflow.user_id, (values.get(cashflow.user_id) ?? 0) + cashflow.cashflow_bedrag);
      }
      for (const flowluta of flowlutas) {
        spiritCounts.set(flowluta.user_id, (spiritCounts.get(flowluta.user_id) ?? 0) + 1);
      }
      for (const loan of loans) {
        outstandingLoans.set(loan.user_id, (outstandingLoans.get(loan.user_id) ?? 0) + loan.openstaand_bedrag);
      }

      return profiles.map((profile): UserType => {
        const currentCashflow = currentCashflows.get(profile.id) ?? 0;
        const previousCashflow = previousCashflows.get(profile.id) ?? 0;
        return {
          id: profile.id,
          email: profile.email ?? "E-mail niet beschikbaar",
          name: [profile.voornaam, profile.achternaam].filter(Boolean).join(" ") || "Naam niet ingesteld",
          cashflow: currentCashflow,
          spirits: spiritCounts.get(profile.id) ?? 0,
          belLening: outstandingLoans.get(profile.id) ?? 0,
          status: "active",
          role: profile.id === user?.id ? (userRole === "admin" ? "admin" : "member") : "unknown",
        };
      });
    },
  });

  const users = allUsers.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    const matchesRole = roleFilter === "all" || account.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return {
    users,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
  };
};
