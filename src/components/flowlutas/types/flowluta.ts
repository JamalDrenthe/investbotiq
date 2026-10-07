
import { Database } from "@/types/data-model";

export type FlowlutaStatus = Database["public"]["Enums"]["flowluta_status"];

export interface FlowlutaData {
  id: string;
  tier: number;
  status: FlowlutaStatus;
  monthly_cashflow: number;
  activated_at: string;
  next_activation_date: string | null;
}

export interface FlowlutaCardProps {
  flowluta: FlowlutaData;
}

export interface FlowlutaStatusBadgeProps {
  status: FlowlutaStatus;
}

export interface FlowlutaPaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}
