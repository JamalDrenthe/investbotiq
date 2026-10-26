import React, { useState, useEffect } from "react";
import {
  Bot,
  ShieldCheck,
  Activity,
  Zap,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Radio,
  Layers,
  Cpu,
  Lock,
  Network,
  CheckCircle2,
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
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: "log-1",
      timestamp: "Zojuist",
      event: "VVC Cashflow Agent: maandelijkse liquiditeitsdistributie geactiveerd",
      category: "rebalance",
      gain: "+€400,00",
    },
    {
      id: "log-2",
      timestamp: "4m geleden",
      event: "Quantum Initium: high-frequency time-gap correlatie gescand (0.02% drawdown)",
      category: "shield",
    },
    {
      id: "log-3",
      timestamp: "18m geleden",
      event: "Immigratiepunt IQ Agent: geautomatiseerde expat dossierverwerking gesynchroniseerd",
      category: "execution",
      gain: "+€32,50",
    },
    {
      id: "log-4",
      timestamp: "42m geleden",
      event: "WoningVry: vastgoed huurstroomallocatie Tier 1-6 actief",
      category: "compound",
      gain: "+€120,00",
    },
    {
      id: "log-5",
      timestamp: "1u geleden",
      event: "IQ Bot & IQ Agent parameters gesynchroniseerd over alle 12 ecosysteem-bedrijven",
      category: "execution",
    },
  ]);

  // Periodic heartbeat animation/log append
  useEffect(() => {
    const interval = setInterval(() => {
      const companies = ["Boostplug", "Spontiva", "CRMos", "Logs Rent", "Djobba", "Xabi World", "Trusting Work", "Zheavenzy"];
      const randomCompany = companies[Math.floor(Math.random() * companies.length)];
      const newGain = (Math.random() * 25 + 5).toFixed(2).replace(".", ",");
      const newLog: TelemetryLog = {
        id: `log-${Date.now()}`,
        timestamp: "Zojuist",
        event: `${randomCompany} IQ Agent: autonome telemetrie en liquiditeitsrouting gesynchroniseerd`,
        category: "execution",
        gain: `+€${newGain}`,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleBotActionTriggered = (action: BotActionConfig) => {
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}`,
      timestamp: "Zojuist",
      event: action.telemetryMsg,
      category:
        action.id === "quantum-initium" || action.id === "boostplug" || action.id === "crmos"
          ? "execution"
          : action.id === "vvc" || action.id === "woningvry" || action.id === "logs-rent"
          ? "compound"
          : action.id === "trusting-work" || action.id === "immigratiepunt"
          ? "shield"
          : "rebalance",
      gain:
        action.id === "vvc"
          ? "+€400,00"
          : action.id === "quantum-initium"
          ? "+€28,40"
          : action.id === "boostplug"
          ? "+€45,00"
          : action.id === "woningvry"
          ? "+€120,00"
          : "+€35,00",
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
                12 Ecosysteem Partners Gekoppeld
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-display">
                IQ Bot & IQ Agent
              </h1>
              <p className="mt-1 text-sm text-ink-on-canvas-muted max-w-2xl">
                Realtime overzicht van de autonome IQ Bot, IQ Agents en de 12 aangesloten ecosysteem-bedrijven van Investbotiq.
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

      {/* Interactive IQ Bot Console (3D Coded Bot Default & 6 Action Buttons for Video Dialogs) */}
      <IqBotInteractiveConsole onActionTriggered={handleBotActionTriggered} />

      {/* Autonomous System Architecture & Telemetry Grid (Read-Only Autonomous Indicators) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Autonomous Protocol Profile & Yield Curve */}
        <div className="lg:col-span-2 space-y-6">
          {/* Autonomous Protocol Profile Card */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2">
            <div className="flex items-center justify-between pb-4 border-b border-canvas-hairline">
              <div className="flex items-center gap-2.5">
                <Cpu className="h-5 w-5 text-indigo" />
                <div>
                  <h2 className="text-lg font-semibold text-white font-display">
                    Autonoom Systeem Protocol
                  </h2>
                  <p className="text-xs text-ink-on-canvas-muted">
                    Zelflerende neural routing · Geen handmatige interventie vereist
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                <Lock className="h-3 w-3" />
                100% Autonoom
              </span>
            </div>

            {/* Read-Only Status Indicators */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-canvas-hairline bg-canvas-panel/40 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-mint">
                  <span>RISICOMODEL</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">Dynamisch Afgeschermd</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Continue risico-evaluatie met automatische drawdown-demping.
                </p>
              </div>

              <div className="rounded-2xl border border-canvas-hairline bg-canvas-panel/40 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-cyan">
                  <span>ROUTING MODEL</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">Multi-Protocol Yield</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Liquiditeit wordt dynamisch verspreid over gedecentraliseerde pools.
                </p>
              </div>

              <div className="rounded-2xl border border-canvas-hairline bg-canvas-panel/40 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-400">
                  <span>COMPOUND CYCLUS</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <p className="mt-2 text-sm font-bold text-white">Continu Per Blok</p>
                <p className="mt-1 text-xs text-ink-on-canvas-muted">
                  Winsten worden direct herbelegd voor maximale exponentiële groei.
                </p>
              </div>
            </div>

            {/* Strategy Allocation Bars (Read-Only) */}
            <div className="mt-6 space-y-3 pt-5 border-t border-canvas-hairline">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-on-canvas-faint">
                Actieve Kapitaalverdeling (Autonoom Beheerd)
              </h3>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Liquidity Routing & Arbitrage</span>
                    <span className="font-mono text-white font-semibold">38%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo transition-all duration-500" style={{ width: "38%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Dynamic Staking Compound</span>
                    <span className="font-mono text-white font-semibold">32%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-cyan transition-all duration-500" style={{ width: "32%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Cashflow Harvesting Reserve</span>
                    <span className="font-mono text-white font-semibold">20%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-mint transition-all duration-500" style={{ width: "20%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-ink-on-canvas-muted mb-1">
                    <span>Volatility Shield Buffer</span>
                    <span className="font-mono text-white font-semibold">10%</span>
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
                <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
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
                    fill="url(#iqYieldGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Autonomous System Safeguards & Telemetry Stream */}
        <div className="space-y-6">
          {/* Autonomous Safeguards Card (Read-Only Statuses) */}
          <div className="rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 shadow-level-2 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-canvas-hairline">
              <ShieldCheck className="h-5 w-5 text-cyan" />
              <h2 className="text-lg font-semibold text-white font-display">Protocol Parameters</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-canvas-panel/50 border border-canvas-hairline">
                <div>
                  <p className="text-sm font-semibold text-white">Auto-Reinvestment</p>
                  <p className="text-xs text-ink-on-canvas-muted">Automatische compound routing</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  Actief
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-canvas-panel/50 border border-canvas-hairline">
                <div>
                  <p className="text-sm font-semibold text-white">Volatility Shield</p>
                  <p className="text-xs text-ink-on-canvas-muted">Max. 0.05% stop-buffer</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 border border-mint/30 px-2.5 py-1 text-[11px] font-mono text-mint">
                  <CheckCircle2 className="h-3 w-3" />
                  100% Actief
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-canvas-panel/50 border border-canvas-hairline">
                <div>
                  <p className="text-sm font-semibold text-white">Multi-Chain Routing</p>
                  <p className="text-xs text-ink-on-canvas-muted">4 protocollen gesynchroniseerd</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-[11px] font-mono text-cyan-400">
                  <Network className="h-3 w-3" />
                  Gekoppeld
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-canvas-panel/50 border border-canvas-hairline">
                <div>
                  <p className="text-sm font-semibold text-white">Webhook Interface</p>
                  <p className="text-xs text-ink-on-canvas-muted">Gereed voor webhook triggers</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 text-[11px] font-mono text-indigo-400">
                  <Zap className="h-3 w-3" />
                  Stand-by
                </span>
              </div>
            </div>

            {/* Autonomous Guarantee Notice */}
            <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <Lock className="h-3.5 w-3.5" />
                <span>Autonoom Protocol Borging</span>
              </div>
              <p className="mt-1 text-xs text-ink-on-canvas-muted leading-relaxed">
                De IQ Bot opereert 100% autonoom. Parameters worden niet handmatig aangepast door members om gegarandeerde risico- en liquiditeitsmarges te bewaken.
              </p>
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
