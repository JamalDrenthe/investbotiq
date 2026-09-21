import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  PiggyBank,
  ListTodo,
  Brain,
  Users,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { IqBotBubble } from "@/components/member/IqBotBubble";
import PreferenceToggles from "@/components/PreferenceToggles";
import { usePreferences } from "@/lib/preferences";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type MemberTab = "dashboard" | "voortgang" | "takenlijst" | "intelligence" | "referrals" | "profile";

const TABS: Array<{ id: MemberTab; label: string; icon: React.ReactNode; badge?: string }> = [
  { id: "dashboard", label: "Member Dashboard", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "voortgang", label: "Voortgang", icon: <PiggyBank className="h-4 w-4" /> },
  { id: "takenlijst", label: "Takenlijst", icon: <ListTodo className="h-4 w-4" />, badge: "2" },
  { id: "intelligence", label: "Intelligence", icon: <Brain className="h-4 w-4" /> },
  { id: "referrals", label: "Mijn Referrals", icon: <Users className="h-4 w-4" /> },
  { id: "profile", label: "Profiel", icon: <User className="h-4 w-4" /> },
];

const ROUTES: Record<MemberTab, string> = {
  dashboard: "/member/dashboard",
  voortgang: "/member/progress",
  takenlijst: "/member/tasks",
  intelligence: "/member/ai-running",
  referrals: "/member/referrals",
  profile: "/member/profile",
};

export function getTabFromPath(pathname: string): MemberTab {
  if (pathname.includes("progress")) return "voortgang";
  if (pathname.includes("tasks")) return "takenlijst";
  if (pathname.includes("ai-running")) return "intelligence";
  if (pathname.includes("referrals")) return "referrals";
  if (pathname.includes("profile")) return "profile";
  return "dashboard";
}

export function useMemberSwitchTab() {
  const navigate = useNavigate();
  return (tab: MemberTab) => {
    navigate(ROUTES[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/**
 * Member portal chrome ported from investbotiq-hub: a sticky top bar with
 * pill-style tab navigation, a live status chip and a mobile drawer —
 * restyled onto the DESIGN.md canvas/glass tokens.
 */
export default function MemberPortalLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<MemberTab>(() => getTabFromPath(location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = usePreferences();

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const switchTab = (tab: MemberTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    navigate(ROUTES[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success(t("Succesvol uitgelogd"));
      navigate("/auth");
    } catch {
      toast.error(t("Fout bij uitloggen"));
    }
  };

  return (
    <div className="dashboard-shell flex min-h-screen flex-col antialiased text-ink selection:bg-indigo selection:text-white">
      {/* Sticky portal header */}
      <header className="sticky top-0 z-40 w-full border-b border-canvas-hairline bg-canvas/90 backdrop-blur-xl shadow-level-2">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-xl border border-canvas-hairline p-2.5 text-ink-muted transition-colors hover:bg-white/5 lg:hidden"
              aria-label={t("Menu")}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <BrandLogo />
          </div>

          {/* Desktop tab bar */}
          <nav className="hidden items-center gap-1 rounded-2xl border border-canvas-hairline bg-canvas-elevated/80 p-1.5 lg:flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo text-white shadow-lumen"
                    : "text-ink-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                {tab.icon}
                <span>{t(tab.label)}</span>
                {tab.badge && (
                  <span className="rounded-full bg-amber px-1.5 py-0.5 text-[9px] font-black text-graphite">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-xs font-bold text-mint sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
              <span>{t("Autonoom Live")}</span>
            </div>
            <PreferenceToggles />
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-rose/30 px-3.5 py-2 text-xs font-bold text-rose transition-all hover:bg-rose/10"
              title={t("Uitloggen")}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("Uitloggen")}</span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="space-y-2 border-b border-canvas-hairline bg-canvas px-4 py-4 shadow-level-3 fade-in lg:hidden">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo text-white shadow-lumen"
                    : "text-ink-muted hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-3">
                  {React.cloneElement(tab.icon as React.ReactElement, { className: "h-5 w-5" })}
                  {t(tab.label)}
                </span>
                {tab.badge && (
                  <span className="rounded-full bg-amber px-2 py-0.5 text-xs font-black text-graphite">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="border-t border-canvas-hairline pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm font-bold text-rose"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("Uitloggen")}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <IqBotBubble />
    </div>
  );
}
