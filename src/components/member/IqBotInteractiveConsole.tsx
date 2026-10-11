import React, { useState, useRef } from "react";
import {
  Sparkles,
  Search,
  BarChart3,
  Network,
  Crown,
  Brain,
  Bot,
  Activity,
  X,
  Play,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { ThreeScene } from "@/components/three/ThreeScene";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [selectedAction, setSelectedAction] = useState<BotActionConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Webhook integration hook for future external webhook dispatch
  const triggerActionWebhook = async (action: BotActionConfig) => {
    console.log(`[IQ Bot Webhook] Triggering action for webhook: ${action.id}`, {
      timestamp: new Date().toISOString(),
      action: action.id,
      label: action.label,
    });

    // Voorbereid voor live webhook verbinding
    const webhookUrl = (import.meta as any).env?.VITE_IQ_BOT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "iq_bot_action_triggered",
            actionId: action.id,
            actionLabel: action.label,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("[IQ Bot Webhook] Webhook request error:", err);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSelectAction = (action: BotActionConfig) => {
    setSelectedAction(action);
    setIsModalOpen(true);
    triggerActionWebhook(action);

    if (onActionTriggered) {
      onActionTriggered(action);
    }

    toast.info(`IQ Bot protocol gestart: ${action.label}`);
  };

  // Ensure playback starts immediately on load without user intervention or controls
  const handleLoadedData = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(console.error);
          }
        });
      }
    }
  };

  // Automatically close video modal when video playback completes
  const handleVideoEnded = () => {
    setIsModalOpen(false);
    if (selectedAction) {
      toast.success(`${selectedAction.label} protocol succesvol voltooid`);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-canvas-hairline bg-canvas-elevated p-6 sm:p-8 shadow-level-2 backdrop-blur-xl ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-canvas-hairline">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-500/15 text-indigo-400">
            <Bot className="h-6 w-6" />
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
              Standaard actieknoppen van de IQ Bot. Klik op een actie om het bijbehorende protocol af te spelen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1 text-xs font-mono font-medium text-mint">
            <Activity className="h-3.5 w-3.5" />
            <span>3D Neuraal Model Actief</span>
          </div>
        </div>
      </div>

      {/* Main Console Layout: Standard 3D Bot Stage & 6 Action Buttons */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Standard Coded 3D Animation Stage (7 cols on large screen) */}
        <div className="relative lg:col-span-7 h-[360px] sm:h-[420px] w-full overflow-hidden rounded-3xl border border-canvas-hairline bg-canvas-panel/50 shadow-inner flex items-center justify-center group">
          {/* Default Interactive 3D IQ Bot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ThreeScene kind="iq-bot" scale={0.9} />
          </div>

          {/* Vignette & Holographic overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />

          {/* Status overlay badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10 text-xs">
            <Bot className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-white">IQ Bot Core</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Autonoom Live
            </span>
          </div>

          {/* Interactive instruction pill */}
          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-4">
            <span className="inline-block text-[11px] text-zinc-300 bg-black/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/10">
              Interactieve 3D animatie · Beweeg uw cursor om de bot te besturen
            </span>
          </div>
        </div>

        {/* 6 Standard Action Buttons Deck (5 cols on large screen) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-on-canvas-faint font-mono">
              IQ Bot Actieknoppen
            </span>
            <span className="text-xs text-ink-on-canvas-muted">
              6 Standaard Knoppen
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {BOT_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleSelectAction(action)}
                  className={`group relative flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 border-canvas-hairline bg-canvas-panel/50 hover:bg-canvas-panel hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${action.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-mono text-ink-on-canvas-faint uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {action.badge}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{action.label}</span>
                      <Play className="h-3 w-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </p>
                    <p className="text-[11px] text-ink-on-canvas-faint line-clamp-1 mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Read-only protocol info footer */}
          <div className="mt-3 rounded-2xl border border-canvas-hairline/80 bg-canvas-panel/60 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
              <span>Autonoom Systeem</span>
            </div>
            <p className="mt-1 text-xs text-ink-on-canvas-muted leading-relaxed">
              Elke actieknop activeert het bijbehorende protocol in een venster en sluit automatisch na afloop.
            </p>
          </div>
        </div>
      </div>

      {/* Small Window (Modal Dialog) for Video Playback - Autoclose on End, No Manual Controls */}
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          hideCloseButton={true}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="w-[94vw] sm:w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden bg-[#070a14] border border-white/20 text-white shadow-2xl rounded-3xl z-[100]"
        >
          <DialogHeader className="p-3.5 sm:p-4.5 pb-2.5 sm:pb-3 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${
                  selectedAction?.color ?? "text-white"
                }`}
              >
                {selectedAction && <selectedAction.icon className="h-5 w-5" />}
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-bold font-display text-white">
                  {selectedAction?.label} Protocol
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                  {selectedAction?.description}
                </DialogDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-2.5 py-1 text-[10px] font-mono font-medium text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                Autonoom
              </span>
            </div>
          </DialogHeader>

          {/* Video Container - 1:1 Aspect ratio, full visibility, no progress bar, no player controls */}
          <div className="relative aspect-square w-full max-h-[70vh] sm:max-h-[640px] bg-black flex items-center justify-center overflow-hidden select-none">
            {selectedAction && (
              <video
                ref={videoRef}
                key={selectedAction.videoSrc}
                src={selectedAction.videoSrc}
                autoPlay
                playsInline
                loop={false}
                disablePictureInPicture
                disableRemotePlayback
                onLoadedData={handleLoadedData}
                onEnded={handleVideoEnded}
                onError={() => {
                  toast.error("Protocol video kon niet worden geladen");
                  setTimeout(() => setIsModalOpen(false), 2000);
                }}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            )}

            {/* Gesture-block overlay to prevent native pause, rewind, or timeline scrubbing */}
            <div
              className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto"
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
          </div>

          {/* Autonomous Status Footer - Completely read-only, no progress bar, no buttons */}
          <div className="px-4 py-2.5 sm:py-3 border-t border-white/10 bg-[#05070f] flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-zinc-300 text-xs">
                Autonoom Protocol in uitvoering
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              Sluit automatisch na afloop
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IqBotInteractiveConsole;
