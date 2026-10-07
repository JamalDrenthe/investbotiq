
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getReferralSummary } from "@/utils/referral-utils";

const ReferralInfo = () => {
  const { user } = useAuth();

  const { data: referralData } = useQuery({
    queryKey: ["referralInfo", user?.id],
    queryFn: async () => {
      if (!user) return { code: null, count: 0, bonus: 0 };

      // Get referral code
      const { data: referralCode, error: codeError } = await firebaseStore
        .collection("referrals")
        .select("referral_code")
        .eq("user_id", user.id)
        .is("referred_user_id", null)
        .single();

      if (codeError && codeError.code !== "not-found") {
        throw codeError;
      }

      // Get referral summary
      const summary = await getReferralSummary(user.id);

      return {
        code: referralCode?.referral_code || null,
        count: summary?.successful_referrals || 0,
        bonus: summary?.total_bonus || 0
      };
    },
    enabled: !!user,
  });

  const copyToClipboard = () => {
    if (referralData?.code) {
      const link = `https://investbotiq.nl/?ref=${referralData.code}`;
      navigator.clipboard.writeText(link);
      toast.success("Referral link gekopieerd!");
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Referrals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold">{referralData?.count || 0}</div>
        <div className="text-xs text-muted-foreground mb-2">
          €{referralData?.bonus || 0} bonus verdiend
        </div>
        {referralData?.code && (
          <Button
            variant="outline"
            className="w-full"
            onClick={copyToClipboard}
          >
            Kopieer referral code
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralInfo;
