import { firebaseStore } from "@/integrations/firebase/client";
import { toast } from "sonner";

export interface Referral {
  id: string;
  user_id: string;
  referral_code: string;
  referred_user_id: string | null;
  status: 'pending' | 'successful';
  created_at: string;
  updated_at: string;
  referred_user_email?: string; // Existing optional property
}

export interface ReferralSummary {
  referrer_id: string;
  pending_referrals: number;
  successful_referrals: number;
  total_bonus: number;
}

export interface ReferralReward {
  id: string;
  referral_id: string;
  user_id: string;
  reward_type: string;
  reward_value: number;
  granted_at: string;
  note: string | null;
}

export interface ReferralWithDetails {
  referral_id: string;
  referral_code: string;
  referrer_id: string;
  referrer_email: string;
  referred_user_id: string | null;
  referred_email: string | null;
  status: 'pending' | 'successful';
  rewards_count: number;
  total_rewards: number;
  last_reward_at: string | null;
  created_at: string;
}

export async function getReferralSummary(userId: string): Promise<ReferralSummary | null> {
  try {
    const { data, error } = await firebaseStore
      .collection("referrals")
      .select("user_id, referred_user_id, status")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching referral summary:", error);
      return null;
    }

    const pendingReferrals = data.filter(r => r.referred_user_id && r.status === 'pending').length;
    const successfulReferrals = data.filter(r => r.referred_user_id && r.status === 'successful').length;

    return {
      referrer_id: userId,
      pending_referrals: pendingReferrals,
      successful_referrals: successfulReferrals,
      total_bonus: successfulReferrals * 100
    };
  } catch (error) {
    console.error("Error in getReferralSummary:", error);
    return null;
  }
}

export async function getUserReferrals(userId: string): Promise<Referral[]> {
  try {
    const { data, error } = await firebaseStore
      .collection("referrals")
      .select(`
        id,
        user_id,
        referral_code,
        referred_user_id,
        status,
        created_at,
        updated_at
      `)
      .eq("user_id", userId);

    if (error) throw error;

    const referrals = data as Referral[];
    const referredUserIds = [...new Set(referrals.flatMap((item) => item.referred_user_id ? [item.referred_user_id] : []))];
    if (referredUserIds.length === 0) return referrals;

    const { data: profiles, error: profileError } = await firebaseStore
      .collection("profiles")
      .select("id, email")
      .in("id", referredUserIds);
    if (profileError) throw profileError;
    const emailById = new Map(profiles.map((profile) => [profile.id, profile.email ?? "Unknown"]));
    return referrals.map((referral) => ({
      ...referral,
      referred_user_email: referral.referred_user_id
        ? emailById.get(referral.referred_user_id) ?? "Unknown"
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching user referrals:", error);
    return [];
  }
}

export async function getUserReferralRewards(userId: string): Promise<ReferralReward[]> {
  try {
    // Since we don't have a dedicated function in the database, use a simpler approach
    const { data: referralsData, error: referralsError } = await firebaseStore
      .collection("referrals")
      .select(`
        id,
        status,
        referred_user_id,
        created_at
      `)
      .eq("user_id", userId)
      .eq("status", "successful");
    
    if (referralsError) throw referralsError;
    
    // Create synthetic rewards data for now
    const rewards: ReferralReward[] = (referralsData || []).map(referral => ({
      id: referral.id,
      referral_id: referral.id,
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100, // Fixed reward value
      granted_at: referral.created_at, // Use creation date as granted date
      note: "Referral bonus"
    }));
    
    return rewards;
  } catch (error) {
    console.error("Error fetching referral rewards:", error);
    return [];
  }
}

export async function createReferralLinkFromCode(code: string): Promise<string> {
  return `https://investbotiq.nl/?ref=${code}`;
}

export function copyReferralLink(link: string): void {
  navigator.clipboard.writeText(link)
    .then(() => toast.success("Referral link gekopieerd!"))
    .catch(() => toast.error("Kopiëren mislukt. Probeer handmatig te selecteren."));
}
