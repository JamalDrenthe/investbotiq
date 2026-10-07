import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { withRoleGuard } from "@/utils/withRoleGuard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Users, CheckCircle, AlertCircle, CircleDollarSign, 
  Filter, RefreshCw, AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferralWithDetails } from "@/utils/referral-utils";
import { useAdminReferrals } from "@/hooks/use-referrals";

const AdminReferrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "successful">("all");
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});

  const { data: referrals = [], refetch } = useAdminReferrals();

  const { data: stats = { 
    total: 0, 
    successful: 0, 
    pending: 0, 
    totalRewards: 0 
  }} = useQuery({
    queryKey: ["referralStats", referrals],
    queryFn: async () => {
      const successful = referrals.filter(r => r.status === 'successful').length;
      const pending = referrals.filter(r => r.status === 'pending' && r.referred_user_id).length;
      const totalRewards = referrals.reduce((sum, r) => sum + (r.total_rewards || 0), 0);
      
      return {
        total: referrals.filter(r => r.referred_user_id).length,
        successful,
        pending,
        totalRewards
      };
    },
    enabled: referrals.length > 0
  });

  const markAsSuccessful = async (referralId: string, referrerId: string, referredUserId: string | null) => {
    if (!referredUserId) {
      toast.error("Er is geen gebruiker gekoppeld aan deze referral");
      return;
    }
    
    setIsProcessing(prev => ({ ...prev, [referralId]: true }));
    
    try {
      // Update the referral status
      const { error: updateError } = await firebaseStore
        .collection("referrals")
        .update({ status: "successful" })
        .eq("id", referralId);
        
      if (updateError) throw updateError;
      
      // For now, just update the status
      // The trigger in the database will handle reward creation
      
      toast.success("Referral succesvol bijgewerkt");
      refetch();
    } catch (error) {
      console.error("Error marking referral as successful:", error);
      toast.error("Er is een fout opgetreden bij het bijwerken van de referral");
    } finally {
      setIsProcessing(prev => ({ ...prev, [referralId]: false }));
    }
  };
  
  const deleteReferral = async (referralId: string) => {
    setIsProcessing(prev => ({ ...prev, [referralId]: true }));
    
    try {
      const { error } = await firebaseStore
        .collection("referrals")
        .delete()
        .eq("id", referralId);
        
      if (error) throw error;
      
      toast.success("Referral verwijderd");
      refetch();
    } catch (error) {
      console.error("Error deleting referral:", error);
      toast.error("Er is een fout opgetreden bij het verwijderen van de referral");
    } finally {
      setIsProcessing(prev => ({ ...prev, [referralId]: false }));
    }
  };
  
  const filteredReferrals = referrals
    .filter(ref => ref.referred_user_id) // Only show actual referrals, not just generated codes
    .filter(ref => {
      if (statusFilter !== "all") {
        return ref.status === statusFilter;
      }
      return true;
    })
    .filter(ref => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        (ref.referrer_email && ref.referrer_email.toLowerCase().includes(search)) ||
        (ref.referred_email && ref.referred_email.toLowerCase().includes(search)) ||
        ref.referral_code.toLowerCase().includes(search)
      );
    });
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Referral Beheer</h1>
              <p className="text-muted-foreground">
                Bekijk en beheer alle referrals en toegekende beloningen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Totaal Aantal Referrals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-2xl font-bold">{stats.total}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Succesvolle Referrals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="text-2xl font-bold">{stats.successful}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Wachtende Referrals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="text-2xl font-bold">{stats.pending}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Totaal Uitgekeerd
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-2xl font-bold">€{stats.totalRewards.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Referral Overzicht</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Zoek op e-mail of referral code..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Tabs 
                      value={statusFilter} 
                      onValueChange={(v) => setStatusFilter(v as "all" | "pending" | "successful")}
                      className="w-[300px]"
                    >
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="all">Alle</TabsTrigger>
                        <TabsTrigger value="pending">Wachtend</TabsTrigger>
                        <TabsTrigger value="successful">Succesvol</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <Button variant="outline" size="icon" onClick={() => refetch()}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Uitnodiger</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Uitgenodigd</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Bonus</TableHead>
                        <TableHead>Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReferrals.length > 0 ? (
                        filteredReferrals.map((referral) => (
                          <TableRow key={referral.referral_id}>
                            <TableCell className="font-medium">{referral.referrer_email}</TableCell>
                            <TableCell>{referral.referral_code}</TableCell>
                            <TableCell>{referral.referred_email || '—'}</TableCell>
                            <TableCell>
                              {referral.status === 'successful' ? (
                                <Badge className="bg-green-500">Succesvol</Badge>
                              ) : (
                                <Badge variant="outline">Wachtend</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {format(new Date(referral.created_at), 'dd-MM-yyyy')}
                            </TableCell>
                            <TableCell>€{referral.total_rewards?.toFixed(2) || '0.00'}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {referral.status === 'pending' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={isProcessing[referral.referral_id]}
                                    onClick={() => markAsSuccessful(
                                      referral.referral_id, 
                                      referral.referrer_id,
                                      referral.referred_user_id
                                    )}
                                  >
                                    {isProcessing[referral.referral_id] ? (
                                      <RefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                      "Markeer succesvol"
                                    )}
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={isProcessing[referral.referral_id]}
                                  onClick={() => deleteReferral(referral.referral_id)}
                                  className="text-destructive"
                                >
                                  Verwijder
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            {searchTerm || statusFilter !== "all" ? (
                              <div>
                                <p>Geen resultaten gevonden</p>
                                <p className="text-sm text-muted-foreground">
                                  Probeer andere zoektermen of filters
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p>Geen referrals gevonden</p>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminReferrals, ["admin"]);
