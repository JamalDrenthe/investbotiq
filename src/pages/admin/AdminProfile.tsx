import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import SecurityCard from "@/components/profile/SecurityCard";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AdminProfile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mijn Profiel</h2>
          <p className="text-muted-foreground text-sm">
            Beheer uw persoonlijke gegevens en beveiligingsinstellingen.
          </p>
        </div>
        <div className="space-y-6">
          <PersonalInfoCard user={user} />
          <SecurityCard />
        </div>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminProfile, ["admin"]);
