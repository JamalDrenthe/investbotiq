import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Search,
  BarChart3,
  Network,
  Crown,
  Brain,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  Activity,
  Bot,
} from "lucide-react";
import { toast } from "sonner";

export type BotActionId =
  | "onboarding"
  | "research"
  | "analyse"
  | "ecosysteem"
  | "tgc"
  | "iq";

export interface BotActionConfig {
  id: BotActionId;
  label: string;
  badge: string;
  videoSrc: string;
  description: string;
  telemetryMsg: string;
  color: string;
  glowColor: string;
  borderColor: string;
  accentBg: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const BOT_ACTIONS: BotActionConfig[] = [
  {
    id: "onboarding",
    label: "Onboarding",
    badge: "Initialisatie",
    videoSrc: "/videos/onboarding.mp4",
    description: "IQ Bot welkomst- en configuratieprotocol voor nieuwe cashflow streams.",
    telemetryMsg: "IQ Bot Onboarding protocol geïnitieerd en parameters geladen",
    color: "text-indigo-400",
    glowColor: "rgba(99, 91, 255, 0.4)",
    borderColor: "border-indigo-500/50",
    accentBg: "bg-indigo-500/15",
    icon: Sparkles,
  },
  {
    id: "research",
    label: "Research",
    badge: "Marktscan",
    videoSrc: "/videos/research.mp4",
    description: "Autonome verkenning van gedecentraliseerde markten en yield trends.",
    telemetryMsg: "Diepgaande markt research voltooid: 18 liquidity pools gescand",
    color: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.4)",
    borderColor: "border-cyan-500/50",
    accentBg: "bg-cyan-500/15",
    icon: Search,
  },
  {
    id: "analyse",
    label: "Analyse",
    badge: "Evaluatie",
    videoSrc: "/videos/analyse.mp4",
    description: "Berekening van optimale cashflow ratio's en risico-rendement modellen.",
    telemetryMsg: "Cashflow & risico-analyse herberekend: +0.65% optimalisatie",
    color: "text-mint",
    glowColor: "rgba(52, 211, 153, 0.4)",
    borderColor: "border-mint/50",
    accentBg: "bg-mint/15",
    icon: BarChart3,
  },
  {
    id: "ecosysteem",
    label: "Ecosysteem",
    badge: "Multi-Chain",
    videoSrc: "/videos/ecosysteem.mp4",
    description: "Synchronisatie tussen actieve Tiers, liquidity routing en netwerk bridges.",
    telemetryMsg: "Ecosysteem routing gesynchroniseerd over 4 protocollen",
    color: "text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.4)",
    borderColor: "border-amber-500/50",
    accentBg: "bg-amber-500/15",
    icon: Network,
  },
  {
    id: "tgc",
    label: "TGC",
    badge: "Growth Club",
    videoSrc: "/videos/tgc.mp4",
    description: "The Growth Club allocaties, compounding governance en exclusieve voordelen.",
    telemetryMsg: "TGC Growth Club multipliers geactiveerd en gekoppeld",
    color: "text-purple-400",
    glowColor: "rgba(192, 132, 252, 0.4)",
    borderColor: "border-purple-500/50",
    accentBg: "bg-purple-500/15",
    icon: Crown,
  },
  {
    id: "iq",
    label: "IQ Core",
    badge: "Neural Model",
    videoSrc: "/videos/iq.mp4",
    description: "Het centrale neurale model van Investbotiq op maximale rekenkracht.",
    telemetryMsg: "IQ Bot Neural Core parameters gesynchroniseerd (99.4% confidentie)",
    color: "text-cyan",
    glowColor: "rgba(34, 211, 238, 0.5)",
    borderColor: "border-cyan/60",
    accentBg: "bg-cyan/15",
    icon: Brain,
  },
];

interface IqBotInteractiveConsoleProps {
  onActionTriggered?: (action: BotActionConfig) => void;
  className?: string;
}

export const IqBotInteractiveConsole: React.FC<IqBotInteractiveConsoleProps> = ({
  onActionTriggered,
  className = "",
}) => {
  // Default active action is 'iq' (the main bot neural loop)
  const [activeActionId, setActiveActionId] = useState<BotActionId>("iq");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [loopDuration, setLoopDuration] = useState<number>(6); // seconds for active action loop
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isActionActive, setIsActionActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentAction =
    BOT_ACTIONS.find((a) => a.id === activeActionId) || BOT_ACTIONS[5];

  // Handler for action button click
  const handleSelectAction = (action: BotActionConfig) => {
    setActiveActionId(action.id);
    setIsActionActive(true);
    setRemainingTime(loopDuration);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Play action video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }

    // Notify toast & telemetry callback
    toast.info(`IQ Bot actie geactiveerd: ${action.label}`);
    if (onActionTriggered) {
      onActionTriggered(action);
    }

    // Countdown interval
    let countdown = loopDuration;
    intervalRef.current = setInterval(() => {
      countdown -= 1;
      setRemainingTime(Math.max(0, countdown));
    }, 1000);

    // After loop duration, settle back to idle or stay in loop mode
    timerRef.current = setTimeout(() => {
      setIsActionActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Automatically return to 'iq' core loop if it was a specialized sub-action
      if (action.id !== "iq") {
        setActiveActionId("iq");
        toast.success(`IQ Bot keert terug naar IQ Core ruststand`);
      }
    }, loopDuration * 1000);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Update video src when activeAction changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeActionId]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const resetToIdle = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActionActive(false);
    setRemainingTime(0);
    setActiveActionId("iq");
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    toast.info("IQ Bot gereset naar IQ Core stand");
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 sm:p-8 shadow-level-2 backdrop-blur-xl transition-all duration-500 ${className}`}
      style={{
        boxShadow: `0 0 50px -10px ${currentAction.glowColor}`,
      }}
    >
      {/* Background ambient radial gradients */}
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentAction.glowColor }}
      />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-canvas-hairline">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300 ${currentAction.borderColor} ${currentAction.accentBg}`}
          >
            <Bot className={`h-6 w-6 ${currentAction.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                IQ Bot Interactieve Console
              </h2>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint"></span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-on-canvas-muted mt-0.5">
              Klik op een actieknop om de bijbehorende neurale animatie en telemetrie te activeren.
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isActionActive && (
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-mono font-medium text-cyan animate-pulse">
              <Activity className="h-3.5 w-3.5" />
              <span>Actie actief: {remainingTime}s</span>
            </div>
          )}

          <button
            type="button"
            onClick={resetToIdle}
            title="Reset naar IQ Core"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-canvas-hairline bg-white/5 text-ink-on-canvas-muted transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title="Volledig scherm"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-canvas-hairline bg-white/5 text-ink-on-canvas-muted transition hover:bg-white/10 hover:text-white"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Console Layout: Video Stage & Action Control Deck */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Video Player Display (7 cols on large screen) */}
        <div
          ref={videoContainerRef}
          className="relative lg:col-span-7 overflow-hidden rounded-2xl border border-canvas-hairline bg-black/60 shadow-inner group aspect-video flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={currentAction.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-2xl transition-all duration-300"
          />

          {/* Holographic scanning overlay lines */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent opacity-40 mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />

          {/* Top-left action badge over video */}
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-md border border-white/10 text-xs">
            <currentAction.icon className={`h-3.5 w-3.5 ${currentAction.color}`} />
            <span className="font-semibold text-white">{currentAction.label}</span>
            <span className="text-[10px] text-ink-on-canvas-muted font-mono">
              ({currentAction.badge})
            </span>
          </div>

          {/* Bottom-right playback state */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10 transition hover:bg-black/80"
              title={isPlaying ? "Pauzeren" : "Afspelen"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>

          {/* Active progress bar if countdown is running */}
          {isActionActive && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-cyan transition-all duration-1000 ease-linear"
                style={{
                  width: `${(remainingTime / loopDuration) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons Deck (5 cols on large screen) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-on-canvas-faint font-mono">
              Selecteer Bot Modus & Actie
            </span>
            <span className="text-xs text-ink-on-canvas-muted">
              Loop duur: <span className="text-cyan font-mono font-semibold">{loopDuration}s</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {BOT_ACTIONS.map((action) => {
              const isSelected = activeActionId === action.id;
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleSelectAction(action)}
                  style={isSelected ? { boxShadow: `0 0 20px ${action.glowColor}` } : undefined}
                  className={`group relative flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? `${action.borderColor} ${action.accentBg} scale-[1.02]`
                      : "border-canvas-hairline bg-canvas-panel/50 hover:bg-canvas-panel hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                        isSelected
                          ? `${action.accentBg} ${action.color}`
                          : "bg-white/5 text-ink-on-canvas-muted group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className={`h-4 w-4 ${action.color}`} />
                    ) : (
                      <span className="text-[10px] font-mono text-ink-on-canvas-faint uppercase">
                        {action.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5">
                    <p
                      className={`text-sm font-bold tracking-tight transition ${
                        isSelected ? "text-white" : "text-ink-on-canvas-muted group-hover:text-white"
                      }`}
                    >
                      {action.label}
                    </p>
                    <p className="text-[11px] text-ink-on-canvas-faint line-clamp-1 mt-0.5">
                      {action.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Action Details Card */}
          <div className="mt-3 rounded-2xl border border-canvas-hairline/80 bg-canvas-panel/60 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <span className={`inline-block h-2 w-2 rounded-full ${currentAction.color}`} />
              <span>{currentAction.label} Protocol</span>
            </div>
            <p className="mt-1 text-xs text-ink-on-canvas-muted leading-relaxed">
              {currentAction.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IqBotInteractiveConsole;
