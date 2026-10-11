import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { UserCog } from "lucide-react";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { useUsers } from "@/hooks/useUsers";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";

const AdminUsers = () => {
  const { 
    users, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    roleFilter, 
    setRoleFilter,
    isLoading,
    error,
  } = useUsers();

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gebruikers Overzicht</h2>
          <p className="text-muted-foreground text-sm">
            Dit overzicht gebruikt Firebase-profielen en opgeslagen gegevens. Rollen van andere accounts zijn alleen zichtbaar na aansluiting van een vertrouwde serverfunctie.
          </p>
        </div>
        
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCog className="h-4 w-4 mr-2" />
              Alle Gebruikers ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <p role="status">Gebruikers laden…</p> : error ? (
              <p role="alert" className="text-destructive">Gebruikers konden niet worden geladen.</p>
            ) : <UserTable users={users} />}
          </CardContent>
        </Card>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminUsers, ["admin"]);
