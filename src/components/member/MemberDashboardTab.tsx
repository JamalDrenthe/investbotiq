import React, { useState } from "react";
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

interface Props {
  onSwitchTab: (tab: MemberTab) => void;
  userName: string;
}

const cashflowChartData = [
  { month: "Jan", cashflow: 580, opbouw: 8500, rendement: 3.2 },
  { month: "Feb", cashflow: 720, opbouw: 12400, rendement: 3.6 },
  { month: "Mrt", cashflow: 880, opbouw: 16800, rendement: 3.9 },
  { month: "Apr", cashflow: 1050, opbouw: 21600, rendement: 4.1 },
  { month: "Mei", cashflow: 1200, opbouw: 27000, rendement: 4.3 },
  { month: "Jun", cashflow: 1440, opbouw: 33000, rendement: 4.6 },
  { month: "Jul", cashflow: 1620, opbouw: 39600, rendement: 4.8 },
  { month: "Aug", cashflow: 1620, opbouw: 48500, rendement: 4.9 },
  { month: "Sep (prognose)", cashflow: 1800, opbouw: 54000, rendement: 5.1 },
  { month: "Okt (prognose)", cashflow: 1980, opbouw: 61800, rendement: 5.3 },
];

const flowlutasList = [
  { id: "FL-01", name: "Flowluta Alpha", strategy: "Liquiditeit & Arbitrage", status: "Actief", yieldRate: "+4.2%", monthlyYield: "€320,00", runtime: "128 dagen", health: 99.8 },
  { id: "FL-02", name: "Flowluta Beta", strategy: "BEL Compound Yield", status: "Actief", yieldRate: "+3.9%", monthlyYield: "€290,00", runtime: "96 dagen", health: 99.4 },
  { id: "FL-03", name: "Flowluta Delta", strategy: "Staking Rebalance", status: "Actief", yieldRate: "+4.1%", monthlyYield: "€280,00", runtime: "64 dagen", health: 100 },
  { id: "FL-04", name: "Flowluta Gamma", strategy: "AI Micro-Arbitrage", status: "Actief", yieldRate: "+3.8%", monthlyYield: "€260,00", runtime: "42 dagen", health: 98.9 },
  { id: "FL-05", name: "Flowluta Epsilon", strategy: "Dynamische Liquiditeit", status: "Actief", yieldRate: "+3.7%", monthlyYield: "€240,00", runtime: "28 dagen", health: 99.6 },
  { id: "FL-06", name: "Flowluta Zeta", strategy: "Volatiliteit Demper", status: "Actief", yieldRate: "+3.5%", monthlyYield: "€230,00", runtime: "14 dagen", health: 99.9 },
];

export const MemberDashboardTab: React.FC<Props> = ({ onSwitchTab, userName }) => {
  const [chartView, setChartView] = useState<"cashflow" | "opbouw">("cashflow");
  const [selectedPeriod, setSelectedPeriod] = useState<"6m" | "1j" | "all">("1j");

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
                Tier 2 Geactiveerd
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                IQ Bot V3.4 Online
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Welkom terug, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-600 dark:from-indigo-400 dark:to-indigo-400">{userName}</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Uw portefeuille draait autonoom op volle capaciteit. Er zijn 6 actieve Flowlutas die continue maandelijkse cashflow genereren.
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
            €1.620,00
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs vorige mnd
            </span>
            <span className="text-slate-400">28 Sep uitbetaling</span>
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
            €48.500,00
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 97% naar Mijlpaal 1
            </span>
            <span className="text-slate-400">Doel: €50.000</span>
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
            6 <span className="text-sm font-bold text-slate-400">/ 8 slots</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 99.6% Bot efficiëntie
            </span>
            <span className="text-indigo-500 hover:underline flex items-center gap-0.5">
              Live monitor &rarr;
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
            2 <span className="text-sm font-bold text-amber-500">aandacht vereist</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> KYC verificatie & contract
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
                    Autonoom
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Gerealiseerde uitbetalingen en toekomstige bot prognose
                </p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setChartView("cashflow")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      chartView === "cashflow"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Cashflow (€/mnd)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartView("opbouw")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      chartView === "opbouw"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Totale Opbouw (€)
                  </button>
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-72 sm:h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashflowChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    tickFormatter={(val) => chartView === "cashflow" ? `€${val}` : `€${val/1000}k`}
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
                    formatter={(val: number) => [`€${val.toLocaleString('nl-NL')}`, chartView === "cashflow" ? "Cashflow" : "Totale Opbouw"]}
                  />
                  {chartView === "cashflow" ? (
                    <Area 
                      type="monotone" 
                      dataKey="cashflow" 
                      stroke="#9333ea" 
                      strokeWidth={3} 
                      fill="url(#indigoCashflowGrad)" 
                    />
                  ) : (
                    <Area 
                      type="monotone" 
                      dataKey="opbouw" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      fill="url(#indigoOpbouwGrad)" 
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Automatische maandelijkse compounding actief</span>
            </div>
            <button
              type="button"
              onClick={() => onSwitchTab("voortgang")}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Volledige prognoses</span>
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
                <span>Portefeuille Gezondheid</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Optimaal (99.6%)
              </span>
            </div>

            <div className="space-y-4">
              {/* Metric 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Tier 2 Uitbreiding</span>
                  <span className="text-indigo-600 dark:text-indigo-400">75% Voltooid</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full rounded-full w-[75%]" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Nog 2 Flowlutas tot Tier 3 upgrade</p>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Volgende Uitbetaling</span>
                  <span className="text-emerald-500 font-extrabold">€1.620,00</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Gepland op 28 september 2026</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                  <Gift className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Referral Cashflow Bonus</span>
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
                  Nodig een relatie uit en ontvang levenslang €100 extra maandelijkse cashflow per lid.
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
              <span>Live AI Bot Intelligence</span>
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
                Actieve Flowluta Eenheden (6 Draaiend)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Elke Flowluta voert geautomatiseerde cashflowstrategieën uit met continue liquiditeitsrebalancering.
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
          {flowlutasList.map((bot) => (
            <div 
              key={bot.id} 
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {bot.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {bot.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{bot.strategy}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {bot.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Maandelijkse Opbrengst</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{bot.monthlyYield}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Gem. Weekrendement</span>
                  <span className="font-extrabold text-emerald-500">{bot.yieldRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
