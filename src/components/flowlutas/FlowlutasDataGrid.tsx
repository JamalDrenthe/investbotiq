
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { firebaseStore } from "@/integrations/firebase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { FlowlutaCard } from "./components/FlowlutaCard";
import { FlowlutaTable } from "./components/FlowlutaTable";
import { FlowlutaPagination } from "./components/FlowlutaPagination";
import { FlowlutaStatus, FlowlutaData } from "./types/flowluta";

interface FlowlutasDataGridProps {
  tier: string;
  status: string;
  search: string;
}

const ITEMS_PER_PAGE = 10;

export const FlowlutasDataGrid = ({ tier, status, search }: FlowlutasDataGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const { data: flowlutasData } = useQuery({
    queryKey: ["flowlutas", tier, status, search, currentPage],
    queryFn: async () => {
      let query = firebaseStore
        .collection("flowlutas")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      if (tier !== "all") {
        query = query.eq("tier", parseInt(tier));
      }

      if (status !== "all") {
        const validStatuses: FlowlutaStatus[] = ["planned", "active", "paused"];
        if (validStatuses.includes(status as FlowlutaStatus)) {
          query = query.eq("status", status as FlowlutaStatus);
        }
      }

      if (search) {
        query = query.or(`id.ilike.%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      return { flowlutas: data as FlowlutaData[], totalCount: count || 0 };
    },
  });

  const totalPages = Math.ceil((flowlutasData?.totalCount || 0) / ITEMS_PER_PAGE);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages || totalPages === 0;

  const handlePreviousPage = () => {
    if (!isPreviousDisabled) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4">
          {flowlutasData?.flowlutas.map((flowluta) => (
            <FlowlutaCard key={flowluta.id} flowluta={flowluta} />
          ))}
        </div>

        {totalPages > 1 && (
          <FlowlutaPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FlowlutaTable flowlutas={flowlutasData?.flowlutas || []} />

      {totalPages > 1 && (
        <FlowlutaPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      )}
    </div>
  );
};
