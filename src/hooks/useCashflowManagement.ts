
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateCashflow } from "@/utils/firebase-utils";
import { toast } from "sonner";

export type CashflowUser = {
  id: string;
  email: string;
  name: string;
  currentCashflow: number;
  previousCashflow: number;
  changePercentage: number;
  lastUpdated: string;
};

export const useCashflowManagement = (users: CashflowUser[]) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const [cashflowValues, setCashflowValues] = useState<Record<string, number>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.currentCashflow }), {})
  );

  useEffect(() => {
    setCashflowValues((current) => ({
      ...Object.fromEntries(users.map((user) => [user.id, user.currentCashflow])),
      ...current,
    }));
  }, [users]);

  const handleCashflowChange = (userId: string, value: string) => {
    const numValue = Number.parseFloat(value);
    setCashflowValues((current) => ({ ...current, [userId]: Number.isFinite(numValue) ? numValue : 0 }));
  };

  const handleSave = async (userId: string) => {
    setIsUpdating((current) => ({ ...current, [userId]: true }));
    try {
      await updateCashflow(
        userId,
        cashflowValues[userId] ?? 0,
        "Handmatige aanpassing door admin"
      );
      await queryClient.invalidateQueries({ queryKey: ["adminCashflowUsers"] });
      toast.success("Cashflow succesvol bijgewerkt");
    } catch (error) {
      console.error("Error updating cashflow:", error);
      toast.error("Er is een fout opgetreden bij het bijwerken van de cashflow");
    } finally {
      setIsUpdating((current) => ({ ...current, [userId]: false }));
    }
  };

  return {
    cashflowValues,
    isUpdating,
    handleCashflowChange,
    handleSave,
  };
};
