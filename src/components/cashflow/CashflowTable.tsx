import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, CircleDollarSign, Save } from "lucide-react";
import type { CashflowUser } from "@/hooks/useCashflowManagement";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface CashflowTableProps {
  users: CashflowUser[];
  cashflowValues: Record<string, number>;
  isUpdating: Record<string, boolean>;
  onCashflowChange: (userId: string, value: string) => void;
  onSave: (userId: string) => void;
}

export const CashflowTable = ({
  users,
  cashflowValues,
  isUpdating,
  onCashflowChange,
  onSave,
}: CashflowTableProps) => {
  if (!users.length) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Geen gebruikers gevonden</AlertTitle>
        <AlertDescription>
          Er zijn geen gebruikers gevonden die voldoen aan de zoekcriteria.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Gebruiker</TableHead>
          <TableHead>Huidige Cashflow (€)</TableHead>
          <TableHead>Vorige Cashflow (€)</TableHead>
          <TableHead>Verandering</TableHead>
          <TableHead>Laatste Update</TableHead>
          <TableHead className="text-right">Aanpassen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center font-medium">
                <CircleDollarSign className="mr-2 h-4 w-4 text-green-500" />
                {user.currentCashflow}
              </div>
            </TableCell>
            <TableCell>{user.previousCashflow}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {user.changePercentage > 0 ? (
                  <>
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-600">+{user.changePercentage}%</span>
                  </>
                ) : user.changePercentage < 0 ? (
                  <>
                    <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-600">{user.changePercentage}%</span>
                  </>
                ) : (
                  <span>0%</span>
                )}
              </div>
            </TableCell>
            <TableCell>{user.lastUpdated}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-24">
                  <Input
                    type="number"
                    value={cashflowValues[user.id] ?? user.currentCashflow}
                    onChange={(e) => onCashflowChange(user.id, e.target.value)}
                    className="text-right"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onSave(user.id)}
                  title="Opslaan"
                  disabled={isUpdating[user.id]}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
