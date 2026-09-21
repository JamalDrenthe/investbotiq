
import React, { useState } from "react";
import MemberPortalLayout from "@/components/member/MemberPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Users, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { copyReferralLink } from "@/utils/referral-utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useUserReferrals, useUserReferralRewards, useReferralSummary } from "@/hooks/use-referrals";

const MemberReferrals = () => {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState<string>("");
  
  const { data: referrals = [] } = useUserReferrals(user?.id);
  const { data: rewards = [] } = useUserReferralRewards(user?.id);
  const { data: summary } = useReferralSummary(user?.id);

  // Find the user's primary referral code
  const ownReferral = referrals.find(ref => !ref.referred_user_id);
  
  React.useEffect(() => {
    if (ownReferral?.referral_code) {
      const link = `https://investbotiq.nl/?ref=${ownReferral.referral_code}`;
      setReferralLink(link);
    }
  }, [ownReferral]);

  const handleCopyLink = () => {
    copyReferralLink(referralLink);
  };

  // Get stats from summary
  const pendingReferrals = summary?.pending_referrals || 0;
  const successfulReferrals = summary?.successful_referrals || 0;
  const totalRewards = summary?.total_bonus || 0;
  
  return (
    <MemberPortalLayout>
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Mijn Referrals</h1>
              <p className="text-muted-foreground">
                Verdien €100 extra maandelijkse cashflow voor elke vriend die zich aanmeldt via jouw referral link.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Succesvolle Referrals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="text-2xl font-bold">{successfulReferrals}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    In Behandeling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="text-2xl font-bold">{pendingReferrals}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Totale Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€{totalRewards.toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Je Referral Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Deel deze link met vrienden en familie. Wanneer zij zich aanmelden en een Spirit activeren, 
                  ontvangen jullie beiden €100 extra maandelijkse cashflow.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button onClick={handleCopyLink} className="whitespace-nowrap">
                    <Copy className="mr-2 h-4 w-4" />
                    Kopiëren
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Referral Overzicht</CardTitle>
              </CardHeader>
              <CardContent>
                {referrals.filter(ref => ref.referred_user_id).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Bonus</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals
                        .filter(ref => ref.referred_user_id)
                        .map(referral => {
                          const matchingReward = rewards.find(r => r.referral_id === referral.id);
                          return (
                            <TableRow key={referral.id}>
                              <TableCell>
                                {referral.referred_user_email || 'Onbekend'}
                              </TableCell>
                              <TableCell>
                                {referral.status === 'successful' ? (
                                  <Badge className="bg-green-500">Succesvol</Badge>
                                ) : (
                                  <Badge variant="outline">In behandeling</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {format(new Date(referral.created_at), 'dd-MM-yyyy')}
                              </TableCell>
                              <TableCell>
                                {matchingReward ? `€${Number(matchingReward.reward_value).toFixed(2)}` : '—'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p>Je hebt nog geen referrals uitgenodigd</p>
                    <p className="text-sm mt-2">
                      Deel je referral link om vrienden uit te nodigen en €100 bonus te verdienen
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jouw Beloningen</CardTitle>
              </CardHeader>
              <CardContent>
                {rewards.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Bedrag</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Notitie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rewards.map(reward => (
                        <TableRow key={reward.id}>
                          <TableCell className="capitalize">{reward.reward_type.replace('_', ' ')}</TableCell>
                          <TableCell>€{Number(reward.reward_value).toFixed(2)}</TableCell>
                          <TableCell>{format(new Date(reward.granted_at), 'dd-MM-yyyy')}</TableCell>
                          <TableCell>{reward.note || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Je hebt nog geen beloningen ontvangen</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberReferrals, ["member"]);
