
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Sparkles, UserCog, Mail } from "lucide-react";
import { UserType } from "./types";

interface UserTableProps {
  users: UserType[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Naam / Email / Rol</TableHead>
          <TableHead>Cashflow (€)</TableHead>
          <TableHead>Spirits</TableHead>
          <TableHead>BEL-lening (€)</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              <p className="text-muted-foreground">Geen gebruikers gevonden</p>
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-1 h-3 w-3" />
                    {user.email}
                  </div>
                  <div className="flex items-center mt-1">
                    <UserCog className="mr-1 h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                      Rol: {user.role === "admin" ? "Admin" : user.role === "member" ? "Member" : "Onbekend"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4 text-green-500" />
                  <span className="font-medium">{user.cashflow}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                  <span className="font-medium">{user.spirits}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">{user.belLening.toLocaleString('nl-NL')}</span>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.status === "active" ? "default" : "outline"}
                  className={user.status === "active" ? "bg-green-500" : "bg-yellow-100 text-yellow-800"}
                >
                  {user.status === "active" ? "Actief" : "In afwachting"}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
