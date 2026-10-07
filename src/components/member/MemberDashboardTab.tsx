import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  TrendingUp, 
  PiggyBank, 
  Bot, 
  ListTodo, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Gift,
  HelpCircle,
  BarChart3,
  Calendar,
  Layers
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { MemberTab } from "@/components/member/MemberPortalLayout";
import { ThreeScene } from "@/components/three/ThreeScene";
import { firebaseStore } from "@/integrations/firebase/client";
import { useAuth } from "@/components/AuthProvider";
import type { Database } from "@/types/data-model";

interface Props {
  onSwitchTab: (tab: MemberTab) => void;
  userName: string;
}

type Cashflow = Database["public"]["Tables"]["cashflows"]["Row"];
type Flowluta = Database["public"]["Tables"]["flowlutas"]["Row"];
type Task = Database["public"]["Tables"]["tasks"]["Row"];

const monthKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const formatCurrency = (amount: number) => `€${amount.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;

export const MemberDashboardTab: React.FC<Props> = ({ onSwitchTab, userName }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"6m" | "1j" | "all">("1j");
  const { user } = useAuth();
  const { data: memberData, isLoading, error } = useQuery({
    queryKey: ["memberDashboard", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      if (!user) return { cashflows: [] as Cashflow[], flowlutas: [] as Flowluta[], tasks: [] as Task[] };
      const [cashflows, flowlutas, tasks] = await Promise.all([
        firebaseStore.collection("cashflows").select("*").eq("user_id", user.id),
        firebaseStore.collection("flowlutas").select("*").eq("user_id", user.id),
        firebaseStore.collection("tasks").select("*").eq("user_id", user.id),
      ]);
      const queryError = cashflows.error ?? flowlutas.error ?? tasks.error;
      if (queryError) throw queryError;
      return {
        cashflows: cashflows.data as Cashflow[],
        flowlutas: flowlutas.data as Flowluta[],
        tasks: tasks.data as Task[],
      };
    },
  });
  const cashflows = memberData?.cashflows ?? [];
  const flowlutas = memberData?.flowlutas ?? [];
  const activeFlowlutas = flowlutas.filter((flowluta) => flowluta.status === "active");
  const openTasks = (memberData?.tasks ?? []).filter((task) => task.status !== "completed");
  const currentMonth = monthKey(new Date());
  const previousMonth = monthKey(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
  const currentCashflow = cashflows.find((record) => record.maand === currentMonth);
  const previousCashflow = cashflows.find((record) => record.maand === previousMonth);
  const cashflowChange = currentCashflow && previousCashflow?.cashflow_bedrag
    ? ((currentCashflow.cashflow_bedrag - previousCashflow.cashflow_bedrag) / previousCashflow.cashflow_bedrag) * 100
    : null;
  const chartMonths = selectedPeriod === "6m" ? 6 : 12;
  const chartCutoff = selectedPeriod === "all" ? null : new Date(new Date().getFullYear(), new Date().getMonth() - chartMonths + 1, 1);
  const cashflowChartData = [...cashflows]
    .filter((record) => !chartCutoff || `${record.maand}-01` >= `${monthKey(chartCutoff)}-01`)
    .sort((left, right) => left.maand.localeCompare(right.maand))
    .map((record) => ({
      month: new Date(`${record.maand}-01T00:00:00`).toLocaleDateString("nl-NL", { month: "short", year: "2-digit" }),
      cashflow: record.cashflow_bedrag,
    }));

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome & Status Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-48 h-48 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 opacity-70 md:block">
            <ThreeScene kind="iq-bot" scale={0.7} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Portefeuilleoverzicht
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {activeFlowlutas.length} actieve Flowluta{activeFlowlutas.length === 1 ? "" : "s"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Welkom terug, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-600 dark:from-indigo-400 dark:to-indigo-400">{userName}</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Bekijk hier de gegevens die voor uw account zijn opgeslagen.
            </p>
          </div>

        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Maandelijkse Cashflow */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 p-5 border border-indigo-200 dark:border-indigo-900/30 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Maandelijkse Cashflow
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isLoading ? "Laden…" : currentCashflow ? formatCurrency(currentCashflow.cashflow_bedrag) : "—"}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              {cashflowChange !== null ? <><ArrowUpRight className="w-3.5 h-3.5" /> {cashflowChange > 0 ? "+" : ""}{cashflowChange.toLocaleString("nl-NL", { maximumFractionDigits: 1 })}% vs vorige maand</> : "Geen vergelijkbare maanddata"}
            </span>
            <span className="text-slate-400">{currentCashflow ? `Periode ${currentCashflow.maand}` : "Geen record deze maand"}</span>
          </div>
        </div>

        {/* KPI 2: Totale Opbouw */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 p-5 border border-indigo-200 dark:border-indigo-900/30 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Totale Vermogensopbouw
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            —
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Niet beschikbaar
            </span>
            <span className="text-slate-400">Geen vermogensveld</span>
          </div>
        </div>

        {/* KPI 3: Actieve Flowlutas */}
        <div 
          onClick={() => onSwitchTab("intelligence")}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 p-5 border border-violet-200 dark:border-violet-900/30 shadow-md hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-500/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Actieve Flowlutas
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2">
            {isLoading ? "…" : activeFlowlutas.length}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Status uit accountdata
            </span>
            <span className="text-indigo-500 hover:underline flex items-center gap-0.5">
              Bekijk overzicht &rarr;
            </span>
          </div>
        </div>

        {/* KPI 4: Takenlijst Status */}
        <div 
          onClick={() => onSwitchTab("takenlijst")}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 p-5 border border-amber-200 dark:border-amber-900/30 shadow-md hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Openstaande Acties
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ListTodo className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2">
            {isLoading ? "…" : openTasks.length} <span className="text-sm font-bold text-amber-500">open taken</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Takenlijst
            </span>
            <span className="text-amber-500 hover:underline flex items-center gap-0.5">
              Afronden &rarr;
            </span>
          </div>
        </div>

      </div>

      {/* Main Interactive Charts & Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Cashflow & Opbouw Trend */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Cashflow & Vermogensontwikkeling
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                    Geregistreerde data
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Maandbedragen uit uw account; er worden geen prognoses getoond.
                </p>
              </div>

              {/* Period selector */}
              <div className="flex items-center gap-2">
                <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  {(["6m", "1j", "all"] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedPeriod === period ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                    >
                      {period === "all" ? "Alles" : period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-72 sm:h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                {cashflowChartData.length ? <AreaChart data={cashflowChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="indigoCashflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="indigoOpbouwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false}
                    tickFormatter={(val) => `€${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#0f172a", 
                      borderColor: "#334155", 
                      borderRadius: "16px",
                      color: "#f8fafc",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
                    }} 
                    formatter={(val: number) => [`€${val.toLocaleString('nl-NL')}`, "Cashflow"]}
                  />
                  <Area type="monotone" dataKey="cashflow" stroke="#9333ea" strokeWidth={3} fill="url(#indigoCashflowGrad)" />
                </AreaChart> : <div className="flex h-full items-center justify-center text-sm text-slate-500">{error ? "Cashflowgegevens konden niet worden geladen." : "Nog geen historische cashflowgegevens."}</div>}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>{currentCashflow ? `Laatste update: ${new Date(currentCashflow.updated_at).toLocaleDateString("nl-NL")}` : "Nog geen cashflow geregistreerd"}</span>
            </div>
            <button
              type="button"
              onClick={() => onSwitchTab("voortgang")}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Cashflowgeschiedenis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Card: Actieve Status & Snel Overzicht */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
              <span>Accountoverzicht</span>
            </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">
                {isLoading ? "Laden…" : error ? "Niet beschikbaar" : "Accountdata"}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Actieve Flowlutas</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{activeFlowlutas.length}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Aantal records met status actief</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Open taken</span>
                  <span className="text-indigo-500 font-extrabold">{openTasks.length}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Gebaseerd op uw takenlijst</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                  <Gift className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Referralprogramma</span>
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                  Bekijk uw referralgegevens en deel uw persoonlijke link.
                </p>
                <button
                  type="button"
                  onClick={() => onSwitchTab("referrals")}
                  className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Mijn referral link openen</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onSwitchTab("intelligence")}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Intelligence-overzicht</span>
            </button>
          </div>
        </div>

      </div>

      {/* Active Flowlutas Units Grid */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Flowluta-records ({flowlutas.length})
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Status en bedragen zoals opgeslagen voor uw account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSwitchTab("intelligence")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 transition-all self-start sm:self-auto"
          >
            Bekijk Alle Parameters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flowlutas.map((flowluta) => (
            <div 
              key={flowluta.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {flowluta.id.slice(0, 4)}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Flowluta
                    </h4>
                    <span className="text-[10px] text-slate-400">Tier {flowluta.tier}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                  {flowluta.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Maandcashflow</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(flowluta.monthly_cashflow)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Geactiveerd</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-300">{new Date(flowluta.activated_at).toLocaleDateString("nl-NL")}</span>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && !flowlutas.length && (
            <p className="col-span-full rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
              {error ? "De Flowluta-gegevens konden niet worden geladen." : "Er zijn nog geen Flowluta-records aan dit account gekoppeld."}
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
