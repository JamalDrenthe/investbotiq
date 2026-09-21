
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { PreferencesProvider } from "@/lib/preferences";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Register from "@/pages/Register";
import RegisterSuccess from "@/pages/RegisterSuccess";
import FAQ from "@/pages/FAQ";
import MemberDashboard from "@/pages/member/MemberDashboard";
import MemberProgress from "@/pages/member/MemberProgress";
import MemberTasks from "@/pages/member/MemberTasks";
import MemberProfile from "@/pages/member/MemberProfile";
import MemberAIRunning from "@/pages/member/MemberAIRunning";
import MemberReferrals from "@/pages/member/MemberReferrals";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminTasks from "@/pages/admin/AdminTasks";
import AdminCashflows from "@/pages/admin/AdminCashflows";
import AdminFlowlutas from "@/pages/admin/AdminFlowlutas";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminReferrals from "@/pages/admin/AdminReferrals";
import NotFound from "@/pages/NotFound";
import WatIsInvestBotIQ from "@/pages/info/WatIsInvestBotIQ";
import HoeWerktHet from "@/pages/info/HoeWerktHet";
import MissieVisie from "@/pages/info/MissieVisie";
import TierPlannen from "@/pages/info/TierPlannen";
import Veiligheid from "@/pages/info/Veiligheid";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminLeads from "@/pages/admin/AdminLeads";

// Creating a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <PreferencesProvider>
          <AuthProvider>
            <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccess />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Info pages */}
            <Route path="/alles-over-investbot/wat-is-het" element={<WatIsInvestBotIQ />} />
            <Route path="/alles-over-investbot/hoe-werkt-het" element={<HoeWerktHet />} />
            <Route path="/alles-over-investbot/mission-vision" element={<MissieVisie />} />
            <Route path="/tier-plannen" element={<TierPlannen />} />
            <Route path="/veiligheid" element={<Veiligheid />} />

            {/* Member routes */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/progress" element={<MemberProgress />} />
            <Route path="/member/tasks" element={<MemberTasks />} />
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/ai-running" element={<MemberAIRunning />} />
            <Route path="/member/referrals" element={<MemberReferrals />} />

            <Route path="/member" element={<Navigate to="/member/dashboard" replace />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/tasks" element={<AdminTasks />} /> 
            <Route path="/admin/cashflows" element={<AdminCashflows />} />
            <Route path="/admin/flowlutas" element={<AdminFlowlutas />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/referrals" element={<AdminReferrals />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/index" element={<Navigate to="/admin" replace />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AuthProvider>
        </PreferencesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
