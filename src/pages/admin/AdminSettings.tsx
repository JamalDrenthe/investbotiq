import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";
import { Settings } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Instellingen</h2>
          <p className="text-muted-foreground text-sm">
            Beheer alle systeeminstellingen voor het Investbotiq platform.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Systeeminstellingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Deze pagina is momenteel in ontwikkeling. Binnenkort kun je hier alle instellingen voor het Investbotiq platform beheren.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminSettings, ["admin"]);
