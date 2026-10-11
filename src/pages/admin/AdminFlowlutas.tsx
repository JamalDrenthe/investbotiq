import React, { useState } from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";
import { FlowlutasDataGrid } from "@/components/flowlutas/FlowlutasDataGrid";
import { FlowlutasChart } from "@/components/flowlutas/FlowlutasChart";
import { FlowlutasFilters } from "@/components/flowlutas/FlowlutasFilters";
import { FlowlutaTimeline } from "@/components/flowlutas/FlowlutaTimeline";
import { FlowlutaCashflowAnalysis } from "@/components/flowlutas/FlowlutaCashflowAnalysis";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminFlowlutas = () => {
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  const handleTierFilter = (tier: string) => {
    setSelectedTier(tier);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSearch = (search: string) => {
    setSearchQuery(search);
  };

  return (
    <AdminPortalLayout>
      <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">Flowlutas Beheer</h1>
              <p className="text-muted-foreground">
                Beheer en monitor alle flowlutas in het systeem
              </p>
            </div>
            
            <FlowlutasFilters
              onTierFilter={handleTierFilter}
              onStatusFilter={handleStatusFilter}
              onSearch={handleSearch}
            />

            <Separator />
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overzicht</TabsTrigger>
                <TabsTrigger value="timeline">Tijdlijn</TabsTrigger>
                <TabsTrigger value="cashflow">Cashflow Analyse</TabsTrigger>
                <TabsTrigger value="chart">Trend</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <h2 className="text-lg font-semibold">Flowlutas Overzicht</h2>
                <FlowlutasDataGrid
                  tier={selectedTier}
                  status={selectedStatus}
                  search={searchQuery}
                />
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <h2 className="text-lg font-semibold">Flowluta Activatie Tijdlijn</h2>
                <p className="text-sm text-muted-foreground">
                  Visualisatie van flowluta activaties per gebruiker.
                </p>
                <FlowlutaTimeline tier={selectedTier} />
              </TabsContent>
              
              <TabsContent value="cashflow" className="space-y-4">
                <h2 className="text-lg font-semibold">Cashflow Analyse per Gebruiker</h2>
                <p className="text-sm text-muted-foreground">
                  Gedetailleerde cashflow analyse per gebruiker.
                </p>
                <FlowlutaCashflowAnalysis tier={selectedTier} />
              </TabsContent>
              
              <TabsContent value="chart" className="space-y-4">
                <h2 className="text-lg font-semibold">Cashflow Trend</h2>
                <p className="text-sm text-muted-foreground">
                  Historische trend van flowluta cashflows.
                </p>
                <FlowlutasChart />
              </TabsContent>
            </Tabs>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminFlowlutas, ["admin"]);
