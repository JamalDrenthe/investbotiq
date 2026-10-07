
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { 
  Referral,
  ReferralReward,
  ReferralSummary,
  ReferralWithDetails,
  getUserReferrals,
  getUserReferralRewards,
  getReferralSummary
} from "@/utils/referral-utils";

export function useUserReferrals(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferrals", userId],
    queryFn: async (): Promise<Referral[]> => {
      if (!userId) return [];
      return getUserReferrals(userId);
    },
    enabled: !!userId
  });
}

export function useUserReferralRewards(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferralRewards", userId],
    queryFn: async (): Promise<ReferralReward[]> => {
      if (!userId) return [];
      return getUserReferralRewards(userId);
    },
    enabled: !!userId
  });
}

export function useReferralSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ["referralSummary", userId],
    queryFn: async (): Promise<ReferralSummary | null> => {
      if (!userId) return null;
      const summary = await getReferralSummary(userId);
      
      if (!summary) {
        return {
          referrer_id: userId,
          pending_referrals: 0,
          successful_referrals: 0,
          total_bonus: 0
        };
      }
      
      return summary;
    },
    enabled: !!userId
  });
}

export function useAdminReferrals() {
  return useQuery({
    queryKey: ["adminReferrals"],
    queryFn: async (): Promise<ReferralWithDetails[]> => {
      const { data, error } = await firebaseStore
        .collection("referrals")
        .select(`
          id,
          referral_code,
          user_id,
          referred_user_id,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const userIds = [...new Set(data.flatMap((ref) => [ref.user_id, ref.referred_user_id].filter((id): id is string => Boolean(id))))];
      const { data: profiles, error: profileError } = userIds.length
        ? await firebaseStore.collection("profiles").select("id, email").in("id", userIds)
        : { data: [], error: null };
      if (profileError) throw profileError;
      const emailById = new Map(profiles.map((profile) => [profile.id, profile.email]));

      return data.map((ref): ReferralWithDetails => {
        const rewardsCount = ref.status === 'successful' ? 1 : 0;
        const totalRewards = ref.status === 'successful' ? 100 : 0;
        return {
          referral_id: ref.id,
          referral_code: ref.referral_code,
          referrer_id: ref.user_id,
          referrer_email: emailById.get(ref.user_id) || 'Unknown',
          referred_user_id: ref.referred_user_id,
          referred_email: ref.referred_user_id ? emailById.get(ref.referred_user_id) ?? null : null,
          status: ref.status as 'pending' | 'successful',
          rewards_count: rewardsCount,
          total_rewards: totalRewards,
          last_reward_at: ref.status === 'successful' ? ref.created_at : null,
          created_at: ref.created_at
        };
      });
    }
  });
}
