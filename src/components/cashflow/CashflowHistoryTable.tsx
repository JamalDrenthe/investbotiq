
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/utils/date-utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Info } from "lucide-react";

// Define the interface for a cashflow history record
interface CashflowHistoryRecord {
  id: string;
  user_id: string;
  amount: number;
  previous_amount: number;
  changed_by: string | null;
  changed_at: string;
  note: string | null;
}

// Define the interface for profile data
interface ProfileData {
  id: string;
  voornaam: string | null;
  achternaam: string | null;
}

// Extended record including the profile data
interface CashflowHistoryWithProfile extends CashflowHistoryRecord {
  changed_by_profile: ProfileData | null;
}

export function CashflowHistoryTable({ userId }: { userId: string }) {
  const { data: history, isLoading, error } = useQuery({
    queryKey: ["cashflow-history", userId],
    queryFn: async () => {
      // We need to fix the join query since there's an issue with the relation
      // Use a separate query to get the profiles data for each record
      const { data, error } = await firebaseStore
        .collection('cashflow_history')
        .select('*')
        .eq('user_id', userId)
        .order('changed_at', { ascending: false });
      
      if (error) throw error;
      
      // If we have data and there are changed_by values, fetch the profile information
      if (data && data.length > 0) {
        // Get unique changed_by IDs
        const changedByIds = data
          .map(record => record.changed_by)
          .filter(id => id !== null) as string[];
        
        if (changedByIds.length > 0) {
          // Fetch profiles for these IDs
          const { data: profiles } = await firebaseStore
            .collection('profiles')
            .select('id, voornaam, achternaam')
            .in('id', changedByIds);
          
          // Map profiles to records
          return data.map(record => ({
            ...record,
            changed_by_profile: profiles?.find(p => p.id === record.changed_by) || null
          })) as CashflowHistoryWithProfile[];
        }
      }
      
      // Return records with null profile data if no changed_by values
      return (data || []).map(record => ({
        ...record,
        changed_by_profile: null
      })) as CashflowHistoryWithProfile[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Er is een fout opgetreden bij het ophalen van de cashflow historie. Probeer het later opnieuw.
        </AlertDescription>
      </Alert>
    );
  }

  if (!history?.length) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Geen historie</AlertTitle>
        <AlertDescription>
          Er zijn nog geen cashflow wijzigingen geregistreerd voor deze gebruiker.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Vorige Bedrag</TableHead>
            <TableHead>Nieuwe Bedrag</TableHead>
            <TableHead>Aangepast door</TableHead>
            <TableHead>Notitie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{formatDateTime(record.changed_at)}</TableCell>
              <TableCell>€{record.previous_amount}</TableCell>
              <TableCell>€{record.amount}</TableCell>
              <TableCell>
                {record.changed_by_profile ? 
                  `${record.changed_by_profile.voornaam || ''} ${record.changed_by_profile.achternaam || ''}`.trim() || '-' 
                  : '-'}
              </TableCell>
              <TableCell>{record.note || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
