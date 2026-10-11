import React, { useState, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Cpu,
  ShieldCheck,
  Activity,
  Zap,
  Sliders,
  RefreshCw,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Radio,
  Clock,
  Layers,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { usePreferences } from "@/lib/preferences";
import { IqBotInteractiveConsole, type BotActionConfig } from "@/components/member/IqBotInteractiveConsole";

type StrategyMode = "conservative" | "balanced" | "dynamic";

interface TelemetryLog {
  id: string;
  timestamp: string;
  event: string;
  category: "execution" | "rebalance" | "shield" | "compound";
  gain?: string;
}

const mockChartData = [
  { time: "00:00", yieldRate: 3.2, volume: 1420 },
  { time: "04:00", yieldRate: 4.1, volume: 1680 },
  { time: "08:00", yieldRate: 6.8, volume: 2450 },
  { time: "12:00", yieldRate: 8.5, volume: 3100 },
  { time: "16:00", yieldRate: 9.2, volume: 3890 },
  { time: "20:00", yieldRate: 11.4, volume: 4620 },
  { time: "Nu", yieldRate: 12.8, volume: 5400 },
];

export const MemberIntelligenceTab: React.FC = () => {
  const { t } = usePreferences();
  const [strategyMode, setStrategyMode] = useState<StrategyMode>("balanced");
  const [autoReinvest, setAutoReinvest] = useState(true);
  const [volatilityShield, setVolatilityShield] = useState(true);
  const [liveDigest, setLiveDigest] = useState(true);
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: "log-1",
      timestamp: "Zojuist",
      event: "Autonome liquidity rebalance voltooid op Tier 2 router",
      category: "rebalance",
      gain: "+€14,80",
    },
    {
      id: "log-2",
      timestamp: "4m geleden",
      event: "Volatiliteitscontrole uitgevoerd: markt binnen veilige marges (0.02% drawdown)",
      category: "shield",
    },
    {
      id: "log-3",
      timestamp: "18m geleden",
      event: "Cashflow harvest geactiveerd voor geaggregeerde liquidity pool",
      category: "execution",
      gain: "+€32,50",
    },
    {
      id: "log-4",
      timestamp: "42m geleden",
      event: "Auto-compound cyclus uitgevoerd: extra tokens gealloceerd naar Tier 1",
      category: "compound",
    },
    {
      id: "log-5",
      timestamp: "1u geleden",
      event: "IQ Bot Neural Core parameters gesynchroniseerd met Investbotiq Cluster",
      category: "execution",
    },
  ]);

  const [simulatedInflow, setSimulatedInflow] = useState(2500);

  // Periodic heartbeat animation/log append
  useEffect(() => {
    const interval = setInterval(() => {
      const newGain = (Math.random() * 8 + 2).toFixed(2).replace(".", ",");
      const newLog: TelemetryLog = {
        id: `log-${Date.now()}`,
        timestamp: "Zojuist",
        event: "Micro-arbitrage yield distributie bevestigd",
        category: "execution",
        gain: `+€${newGain}`,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStrategyChange = (mode: StrategyMode) => {
    setStrategyMode(mode);
    const labels = {
      conservative: "Conservatief (Focus op kapitaalbehoud)",
      balanced: "Gebalanceerd (Optimale cashflow & groei)",
      dynamic: "Dynamisch (Maximaliseer compounding)",
    };
    toast.success(`Strategie ingesteld op: ${labels[mode]}`);
  };

  const getMonthlyProjection = () => {
    const rate = strategyMode === "conservative" ? 0.05 : strategyMode === "balanced" ? 0.085 : 0.13;
    return (simulatedInflow * rate).toFixed(2);
  };

  const handleBotActionTriggered = (action: BotActionConfig) => {
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}`,
      timestamp: "Zojuist",
      event: action.telemetryMsg,
      category:
        action.id === "analyse" || action.id === "research"
          ? "execution"
          : action.id === "tgc" || action.id === "onboarding"
          ? "compound"
          : "shield",
      gain: action.id === "analyse" ? "+€28,40" : action.id === "tgc" ? "+€45,00" : undefined,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-8 fade-in text-ink-on-canvas">
      {/* Hero Header & Status Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 sm:p-8 shadow-level-2 backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo/15 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/20 text-cyan border border-indigo/30 shadow-[0_0_15px_rgba(99,91,255,0.3)]">
                <Bot className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1 text-xs font-semibold text-mint">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint"></span>
                </span>
                Autonoom Actief
              </span>
              <span className="rounded-full border border-canvas-hairline bg-white/5 px-3 py-1 text-xs font-medium text-ink-on-canvas-muted font-mono">
                Investbotiq Neural Core v3.8
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-display">
                Intelligence & IQ Bot Telemetrie
              </h1>
              <p className="mt-1 text-sm text-ink-on-canvas-muted max-w-2xl">
                Realtime inzicht in de autonome cashflow-algoritmes, liquidity aggregatie en dynamische beschermingsmechanismen van Investbotiq.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                toast.success("IQ Bot parameters gesynchroniseerd met cluster!");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-canvas-hairline bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-indigo/40"
            >
              <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
              Sync Cluster
            </button>
            <div className="rounded-2xl border border-indigo/30 bg-indigo-night/60 px-4 py-2.5 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-wider text-ink-on-canvas-faint font-semibold">AI Confidentiescore</p>
              <p className="text-lg font-bold text-cyan font-mono">99.4%</p>
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 border-t border-canvas-hairline pt-6">
          <div className="rounded-2xl border border-canvas-hairline/60 bg-canvas-panel/50 p-4">
            <div className="flex items-center gap-2 text-ink-on-canvas-faint text-xs font-medium">
              <Activity className="h-4 w-4 text-cyan" />
              Uitvoeringssnelheid
            </div>
            <p className="mt-2 text-xl sm:text-2xl font-bold font-mono text-white">
              0.42 <span className="text-xs text-ink-on-canvas-faint font-sans font-normal">ms / tick</span>
            </p>
            <p className="mt-1 text-[11px] text-mint flex items-center gap-1 font-medium">
              <ArrowUpRight className="h-3 w-3" /> Ultra-low latency
            </p>
          </div>

          <div className="rounded-2xl border border-canvas-hairline/60 bg-canvas-panel/50 p-4">
            <div className="flex items-center gap-2 text-ink-on-canvas-faint text-xs font-medium">
              <Zap className="h-4 w-4 text-amber" />
              Compounding Frequentie
            </div>
            <p className="mt-2 text-xl sm:text-2xl font-bold font-mono text-white">
              24/7 <span className="text-xs text-ink-on-canvas-faint font-sans font-normal">continu</span>
            </p>
            <p className="mt-1 text-[11px] text-ink-on-canvas-muted">Geautomatiseerd per blok</p>
          </div>

          <div className="rounded-2xl border border-canvas-hairline/60 bg-canvas-panel/50 p-4">
            <div className="flex items-center gap-2 text-ink-on-canvas-faint text-xs font-medium">
              <ShieldCheck className="h-4 w-4 text-mint" />
              Volatiliteit Shield
            </div>
            <p className="mt-2 text-xl sm:text-2xl font-bold font-mono text-mint">
              100% <span className="text-xs text-ink-on-canvas-faint font-sans font-normal">beveiligd</span>
            </p>
            <p className="mt-1 text-[11px] text-mint">Max. 0.05% stop-buffer</p>
          </div>

          <div className="rounded-2xl border border-canvas-hairline/60 bg-canvas-panel/50 p-4">
            <div className="flex items-center gap-2 text-ink-on-canvas-faint text-xs font-medium">
              <Layers className="h-4 w-4 text-indigo" />
              Geactiveerde Tiers
            </div>
            <p className="mt-2 text-xl sm:text-2xl font-bold font-mono text-white">
              Tier 1 + 2 <span className="text-xs text-ink-on-canvas-faint font-sans font-normal">actief</span>
            </p>
            <p className="mt-1 text-[11px] text-cyan font-medium">Tier 3 gepland</p>
          </div>
        </div>
      </div>

      {/* Interactive IQ Bot Video Console */}
      <IqBotInteractiveConsole onActionTriggered={handleBotActionTriggered} />

      {/* Main Grid: Strategy Controls & Live Telemetry Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Strategy Allocations & Yield Graph */}
        <div className="lg:col-span-2 space-y-6">
          {/* Strategy Selection Card */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2">
            <div className="flex items-center justify-between pb-4 border-b border-canvas-hairline">
              <div className="flex items-center gap-2.5">
                <Sliders className="h-5 w-5 text-indigo" />
                <h2 className="text-lg font-semibold text-white font-display">Algoritmisch Risicoprofiel</h2>
              </div>
              <span className="text-xs font-medium text-ink-on-canvas-muted">Direct instelbaar</span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Conservative */}
              <button
                type="button"
                onClick={() => handleStrategyChange("conservative")}
                className={`relative rounded-2xl p-4 text-left transition-all border ${
                  strategyMode === "conservative"
                    ? "border-mint bg-mint/10 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                    : "border-canvas-hairline bg-canvas-panel/40 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-mint">Laag Risico</span>
                  {strategyMode === "conservative" && <CheckCircle2 className="h-4 w-4 text-mint" />}
                </div>
                <p className="mt-2 text-base font-bold text-white">Conservatief</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Focus op stabiele liquiditeit en maximale bufferreserves.
                </p>
                <p className="mt-3 text-sm font-mono font-semibold text-mint">3% - 5% / mnd</p>
              </button>

              {/* Balanced */}
              <button
                type="button"
                onClick={() => handleStrategyChange("balanced")}
                className={`relative rounded-2xl p-4 text-left transition-all border ${
                  strategyMode === "balanced"
                    ? "border-indigo bg-indigo/15 shadow-[0_0_20px_rgba(99,91,255,0.25)]"
                    : "border-canvas-hairline bg-canvas-panel/40 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">Aanbevolen</span>
                  {strategyMode === "balanced" && <CheckCircle2 className="h-4 w-4 text-cyan" />}
                </div>
                <p className="mt-2 text-base font-bold text-white">Gebalanceerd</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Optimale balans tussen maandelijkse cashflow en gestage compound.
                </p>
                <p className="mt-3 text-sm font-mono font-semibold text-cyan">6% - 10% / mnd</p>
              </button>

              {/* Dynamic */}
              <button
                type="button"
                onClick={() => handleStrategyChange("dynamic")}
                className={`relative rounded-2xl p-4 text-left transition-all border ${
                  strategyMode === "dynamic"
                    ? "border-cyan bg-cyan/15 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "border-canvas-hairline bg-canvas-panel/40 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">Groeifocus</span>
                  {strategyMode === "dynamic" && <CheckCircle2 className="h-4 w-4 text-cyan" />}
                </div>
                <p className="mt-2 text-base font-bold text-white">Dynamisch</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Maximale yield aggregatie via meerdere router routes.
                </p>
                <p className="mt-3 text-sm font-mono font-semibold text-cyan">11% - 15% / mnd</p>
              </button>
            </div>

            {/* Strategy Allocation Bars */}
            <div className="mt-6 space-y-3 pt-5 border-t border-canvas-hairline">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-on-canvas-faint">
                Actieve Kapitaalverdeling
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Liquidity Routing & Arbitrage</span>
                    <span className="font-mono text-white">38%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo transition-all duration-500" style={{ width: "38%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Dynamic Staking Compound</span>
                    <span className="font-mono text-white">32%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-cyan transition-all duration-500" style={{ width: "32%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Cashflow Harvesting Reserve</span>
                    <span className="font-mono text-white">20%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-mint transition-all duration-500" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Volatility Shield Buffer</span>
                    <span className="font-mono text-white">10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-amber transition-all duration-500" style={{ width: "10%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Realtime Yield Curve Card */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="h-5 w-5 text-mint" />
                <h2 className="text-lg font-semibold text-white font-display">24-Uurs Yield Telemetrie</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-mint">
                <span className="h-2 w-2 rounded-full bg-mint" />
                Live Feed
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="iqYieldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#635bff" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#5f6a94" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#5f6a94" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b1020",
                      borderColor: "rgba(148, 163, 255, 0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val: number) => [`${val}%`, "Yield Rate"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="yieldRate"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Autonomous Controls & Telemetry Feed */}
        <div className="space-y-6">
          {/* Autonomous Toggles Card */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-canvas-hairline">
              <Cpu className="h-5 w-5 text-cyan" />
              <h2 className="text-lg font-semibold text-white font-display">Autonome Instellingen</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Auto-Reinvestment</p>
                  <p className="text-xs text-ink-on-canvas-muted">Automatisch herbeleggen in Flowlutas</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAutoReinvest(!autoReinvest);
                    toast.info(`Auto-Reinvestment ${!autoReinvest ? "ingeschakeld" : "uitgeschakeld"}`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoReinvest ? "bg-indigo" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoReinvest ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Volatility Shield</p>
                  <p className="text-xs text-ink-on-canvas-muted">Automatische bescherming bij pieken</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVolatilityShield(!volatilityShield);
                    toast.info(`Volatility Shield ${!volatilityShield ? "geactiveerd" : "gedeactiveerd"}`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    volatilityShield ? "bg-mint" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      volatilityShield ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Smart Telemetrie Notificaties</p>
                  <p className="text-xs text-ink-on-canvas-muted">Meldingen bij cashflow-activatie</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLiveDigest(!liveDigest);
                    toast.info(`Telemetrie Notificaties ${!liveDigest ? "aan" : "uit"}`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    liveDigest ? "bg-cyan" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      liveDigest ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Interactive Projected Return Box */}
            <div className="mt-5 rounded-2xl border border-indigo/25 bg-canvas-panel/80 p-4">
              <div className="flex items-center justify-between text-xs text-ink-on-canvas-faint">
                <span>Inleg Simulatie</span>
                <span className="font-mono text-white font-semibold">€{simulatedInflow}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={simulatedInflow}
                onChange={(e) => setSimulatedInflow(Number(e.target.value))}
                className="mt-2 w-full accent-cyan cursor-pointer"
              />
              <div className="mt-3 flex items-center justify-between border-t border-canvas-hairline/60 pt-2">
                <span className="text-xs text-ink-on-canvas-muted">Verwachte Maand Cashflow:</span>
                <span className="text-base font-bold font-mono text-cyan">€{getMonthlyProjection()}</span>
              </div>
            </div>
          </div>

          {/* Live Telemetry Streaming Feed */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2">
            <div className="flex items-center justify-between pb-3 border-b border-canvas-hairline">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-mint" />
                <h3 className="text-sm font-semibold text-white font-display">Live Bot Telemetrie</h3>
              </div>
              <Radio className="h-3.5 w-3.5 text-mint animate-pulse" />
            </div>

            <div className="mt-4 space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-canvas-hairline/60 bg-canvas-panel/50 p-3 text-xs transition hover:border-canvas-hairline"
                >
                  <div className="flex items-center justify-between text-[11px] text-ink-on-canvas-faint mb-1">
                    <span className="font-mono">{log.timestamp}</span>
                    {log.gain && <span className="font-bold font-mono text-mint">{log.gain}</span>}
                  </div>
                  <p className="text-ink-on-canvas-muted leading-relaxed">{log.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
