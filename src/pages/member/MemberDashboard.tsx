
import React from "react";
import Header from "@/components/Header";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import TotalValueCard from "@/components/dashboard/TotalValueCard";
import FlowlutasCount from "@/components/dashboard/FlowlutasCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/dashboard/TaskList";
import ReferralBox from "@/components/dashboard/ReferralBox";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/components/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThreeScene } from "@/components/three/ThreeScene";

// Let only 'member' users access this page
const MemberDashboard = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Extract first name from email for personalized greeting
  const getFirstName = () => {
    if (!user || !user.email) return "";
    const emailParts = user.email.split('@');
    const namePart = emailParts[0];
    // Convert first letter to uppercase for nicer display
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).split('.')[0];
  };

  return (
    <div className="dashboard-shell flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <CollapsibleSidebar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-8">
            <section className="card-glass relative isolate overflow-hidden px-6 py-8 md:px-10 md:py-10">
              {/* threeui PredictiveArc — the growth arc sits behind the greeting */}
              <ThreeScene
                kind="predictive-arc"
                className="!absolute !inset-0 opacity-70"
                mode="dark"
                speed={0.6}
                spacing={6}
                dotSize={4}
                archHeight={0.6}
                thickness={0.9}
                brightness={0.9}
                hue={-10}
                saturation={1}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(90deg, rgba(17,24,50,0.95) 0%, rgba(17,24,50,0.6) 55%, rgba(17,24,50,0.1) 100%)" }}
              />
              <div className="relative space-y-3">
                <div className="eyebrow">Invest Bot IQ</div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">Member Dashboard</h1>
                <p className="max-w-xl text-ink-muted">
                  {getFirstName() ? `Welkom ${getFirstName()} bij uw Investbotiq dashboard` : "Welkom bij uw Investbotiq dashboard"}
                </p>
              </div>
            </section>
            
            {/* Four statistic cards - responsive grid with hover effects */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <CashflowSummary />
              <TotalValueCard />
              <FlowlutasCount />
              <OpenTasks />
            </div>
            
            {/* Cashflow chart + task list - stacked on mobile, side-by-side on desktop */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 fade-in">
                {isMobile ? (
                  <ScrollArea className="w-full">
                    <div className="min-w-[600px]">
                      <DashboardSummary />
                    </div>
                  </ScrollArea>
                ) : (
                  <DashboardSummary />
                )}
              </div>
              <div className="fade-in slide-up">
                <TaskList />
              </div>
            </div>
            
            {/* Referral section */}
            <ReferralBox />

            {/* Mobile help hint - only on mobile */}
            {isMobile && (
              <div className="mt-4 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground border border-muted-foreground/20">
                <p className="mb-2">Swipe over grafieken om meer detail te zien</p>
                <p>Open menu rechtsboven voor meer navigatie opties</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Export with member-only access
export default withRoleGuard(MemberDashboard, ["member"]);
