import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Users,
  Globe,
  Boxes,
  Cpu,
  Rocket,
  Database,
  Gem,
  Truck,
  Briefcase,
  ShieldCheck,
  Building2,
  Bot,
  Activity,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
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
  | "vvc"
  | "immigratiepunt"
  | "spontiva"
  | "xabi-world"
  | "quantum-initium"
  | "boostplug"
  | "crmos"
  | "zheavenzy"
  | "logs-rent"
  | "djobba"
  | "trusting-work"
  | "woningvry"
  | string;

export interface BotActionConfig {
  id: BotActionId;
  label: string;
  badge: string;
  logoSrc: string;
  videoSrc: string;
  description: string;
  telemetryMsg: string;
  color: string;
  glowColor: string;
  borderColor: string;
  accentBg: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const COMPANY_ACTIONS: BotActionConfig[] = [
  {
    id: "vvc",
    label: "VVC",
    badge: "Cashflow Club",
    logoSrc: "/logos/ecosystem/vvc.svg",
    videoSrc: "/videos/iq-bot/vvc.mp4",
    description: "Verdienende Vrienden Club · Autonome member cashflows en dividend allocaties.",
    telemetryMsg: "VVC Cashflow Agent gesynchroniseerd: maandelijkse member allocaties actief",
    color: "text-indigo-400",
    glowColor: "rgba(99, 91, 255, 0.4)",
    borderColor: "border-indigo-500/50",
    accentBg: "bg-indigo-500/15",
    icon: Users,
  },
  {
    id: "immigratiepunt",
    label: "Immigratiepunt",
    badge: "Relocation Tech",
    logoSrc: "/logos/ecosystem/immigratiepunt.svg",
    videoSrc: "/videos/iq-bot/immigratiepunt.mp4",
    description: "Immigratiepunt · AI-gestuurde dossierverwerking en internationale visumprotocollen.",
    telemetryMsg: "Immigratiepunt IQ Agent actief: realtime expat en relocatiedossiers verwerkt",
    color: "text-mint",
    glowColor: "rgba(52, 211, 153, 0.4)",
    borderColor: "border-mint/50",
    accentBg: "bg-mint/15",
    icon: Globe,
  },
  {
    id: "spontiva",
    label: "Spontiva",
    badge: "Events & Media",
    logoSrc: "/logos/ecosystem/spontiva.svg",
    videoSrc: "/videos/iq-bot/spontiva.mp4",
    description: "Spontiva · Dynamische evenementenallocatie, belevingen en ticketing matching engine.",
    telemetryMsg: "Spontiva IQ Agent actief: live event liquiditeit en dynamic ticketing gesynchroniseerd",
    color: "text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.4)",
    borderColor: "border-rose-500/50",
    accentBg: "bg-rose-500/15",
    icon: Sparkles,
  },
  {
    id: "xabi-world",
    label: "Xabi World",
    badge: "Metaverse Assets",
    logoSrc: "/logos/ecosystem/xabiworld.svg",
    videoSrc: "/videos/iq-bot/xabi-world.mp4",
    description: "Xabi World · Decentrale virtuele werelden, gaming assets en interactieve ecosystemen.",
    telemetryMsg: "Xabi World engine gekoppeld: virtuele asset liquiditeit en cross-metaverse routing",
    color: "text-purple-400",
    glowColor: "rgba(192, 132, 252, 0.4)",
    borderColor: "border-purple-500/50",
    accentBg: "bg-purple-500/15",
    icon: Boxes,
  },
  {
    id: "quantum-initium",
    label: "Quantum Initium",
    badge: "Quant Intelligence",
    logoSrc: "/logos/ecosystem/quantuminitium.svg",
    videoSrc: "/videos/iq-bot/quantum-initium.mp4",
    description: "Quantum Initium · Wiskundige time-gap arbitrage en high-frequency yield parameters.",
    telemetryMsg: "Quantum Initium algoritmes uitgevoerd: latency correlatie 0.18ms, 99.8% precisie",
    color: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.4)",
    borderColor: "border-cyan-500/50",
    accentBg: "bg-cyan-500/15",
    icon: Cpu,
  },
  {
    id: "boostplug",
    label: "Boostplug",
    badge: "Growth Engine",
    logoSrc: "/logos/ecosystem/boostplug.svg",
    videoSrc: "/videos/iq-bot/boostplug.mp4",
    description: "Boostplug · Geautomatiseerde marketing acceleratie, traffic flows en conversie boosting.",
    telemetryMsg: "Boostplug campaign routers geactiveerd: traffic flows en conversie +14.2%",
    color: "text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.4)",
    borderColor: "border-amber-500/50",
    accentBg: "bg-amber-500/15",
    icon: Rocket,
  },
  {
    id: "crmos",
    label: "CRMos",
    badge: "Operating System",
    logoSrc: "/logos/ecosystem/crmos.svg",
    videoSrc: "/videos/iq-bot/crmos.mp4",
    description: "CRMos · Intelligente CRM workflows, pipeline automatisering en lead synchronisatie.",
    telemetryMsg: "CRMos pipeline sync voltooid: 124 enterprise events autonoom verwerkt",
    color: "text-sky-400",
    glowColor: "rgba(56, 189, 248, 0.4)",
    borderColor: "border-sky-500/50",
    accentBg: "bg-sky-500/15",
    icon: Database,
  },
  {
    id: "zheavenzy",
    label: "Zheavenzy",
    badge: "Prestige Luxury",
    logoSrc: "/logos/ecosystem/zheavenzy.svg",
    videoSrc: "/videos/iq-bot/zheavenzy.mp4",
    description: "Zheavenzy · Exclusieve lifestyle curation, high-ticket portfolio's en prestige activa.",
    telemetryMsg: "Zheavenzy prestige portfolio geverifieerd: premium tier activa beveiligd",
    color: "text-yellow-400",
    glowColor: "rgba(250, 204, 21, 0.4)",
    borderColor: "border-yellow-500/50",
    accentBg: "bg-yellow-500/15",
    icon: Gem,
  },
  {
    id: "logs-rent",
    label: "Logs Rent",
    badge: "Fleet & Mobility",
    logoSrc: "/logos/ecosystem/logs.svg",
    videoSrc: "/videos/iq-bot/logs-rent.mp4",
    description: "Logs Rent · Geautomatiseerde verhuurlogistiek, fleet telemetrie en periodieke huurstromen.",
    telemetryMsg: "Logs Rent fleet telemetrie online: 58 verhuurcontracten en bezetting geüpdatet",
    color: "text-teal-400",
    glowColor: "rgba(45, 212, 191, 0.4)",
    borderColor: "border-teal-500/50",
    accentBg: "bg-teal-500/15",
    icon: Truck,
  },
  {
    id: "djobba",
    label: "Djobba",
    badge: "Talent AI",
    logoSrc: "/logos/ecosystem/djobba.svg",
    videoSrc: "/videos/iq-bot/djobba.mp4",
    description: "Djobba · AI-gestuurde matching van specialistische freelancers, taken en projectopdrachten.",
    telemetryMsg: "Djobba matchmaking cluster actief: 42 freelance opdrachten succesvol gematcht",
    color: "text-orange-400",
    glowColor: "rgba(251, 146, 60, 0.4)",
    borderColor: "border-orange-500/50",
    accentBg: "bg-orange-500/15",
    icon: Briefcase,
  },
  {
    id: "trusting-work",
    label: "Trusting Work",
    badge: "Trust & Escrow",
    logoSrc: "/logos/ecosystem/trustingwork.svg",
    videoSrc: "/videos/iq-bot/trusting-work.mp4",
    description: "Trusting Work · Betrouwbare contractafhandeling, salaris-escrow en compliance verificatie.",
    telemetryMsg: "Trusting Work smart escrow gevalideerd: 100% compliance en uitbetaling geborgd",
    color: "text-indigo-300",
    glowColor: "rgba(129, 140, 248, 0.4)",
    borderColor: "border-indigo-400/50",
    accentBg: "bg-indigo-400/15",
    icon: ShieldCheck,
  },
  {
    id: "woningvry",
    label: "WoningVry",
    badge: "PropTech Yield",
    logoSrc: "/logos/ecosystem/woningvry.svg",
    videoSrc: "/videos/iq-bot/woningvry.mp4",
    description: "WoningVry · Hypotheekvrije vastgoedfinanciering en periodieke verhuur-rendementen.",
    telemetryMsg: "WoningVry vastgoed yield berekend: huurstroomallocatie Tier 1-6 actief",
    color: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderColor: "border-emerald-500/50",
    accentBg: "bg-emerald-500/15",
    icon: Building2,
  },
];

// Backwards-compatible alias
export const BOT_ACTIONS = COMPANY_ACTIONS;

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
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Webhook integration hook for future external webhook dispatch
  const triggerActionWebhook = async (action: BotActionConfig) => {
    console.log(`[IQ Bot Webhook] Triggering action for webhook: ${action.id}`, {
      timestamp: new Date().toISOString(),
      action: action.id,
      label: action.label,
    });

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

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setHasVideoError(false);
      setSimulatedProgress(0);
    }
  };

  const handleSelectAction = (action: BotActionConfig) => {
    setSelectedAction(action);
    setIsLoading(true);
    setIsPlaying(false);
    setHasVideoError(false);
    setSimulatedProgress(0);
    setIsModalOpen(true);
    triggerActionWebhook(action);

    if (onActionTriggered) {
      onActionTriggered(action);
    }

    toast.info(`IQ Agent protocol gestart: ${action.label}`);
  };

  const handleStartPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVideoEnded = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
    if (selectedAction) {
      toast.success(`${selectedAction.label} protocol succesvol voltooid`);
    }
  };

  // Video fallback simulation timer (in case video is still being uploaded)
  useEffect(() => {
    if (isModalOpen && hasVideoError) {
      setSimulatedProgress(0);
      const interval = setInterval(() => {
        setSimulatedProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsModalOpen(false);
              if (selectedAction) {
                toast.success(`${selectedAction.label} protocol succesvol uitgevoerd`);
              }
            }, 600);
            return 100;
          }
          return p + 25;
        });
      }, 750);
      return () => clearInterval(interval);
    }
  }, [isModalOpen, hasVideoError, selectedAction]);

  useEffect(() => {
    if (isModalOpen && selectedAction && videoRef.current) {
      setIsLoading(true);
      setIsPlaying(false);
      setHasVideoError(false);
      const vid = videoRef.current;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [isModalOpen, selectedAction]);

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
                IQ Bot & IQ Agent Console
              </h2>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint"></span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-on-canvas-muted mt-0.5">
              Activeer de interactieve IQ Agents van alle 12 aangesloten ecosysteem-bedrijven.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1 text-xs font-mono font-medium text-mint">
            <Activity className="h-3.5 w-3.5" />
            <span>12 Ecosysteem Partners Actief</span>
          </div>
        </div>
      </div>

      {/* Top 3D Interactive Stage */}
      <div className="relative z-10 mt-6 h-[280px] sm:h-[320px] w-full overflow-hidden rounded-3xl border border-canvas-hairline bg-canvas-panel/50 shadow-inner flex items-center justify-center group">
        <div className="absolute inset-0 flex items-center justify-center">
          <ThreeScene kind="iq-bot" scale={0.85} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10 text-xs">
          <Bot className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-white">IQ Bot & IQ Agent Core</span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Autonoom Neuraal Model
          </span>
        </div>

        <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-4">
          <span className="inline-block text-[11px] text-zinc-300 bg-black/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/10">
            Interactieve 3D weergave · Beweeg uw cursor om de bot te besturen · Klik hieronder op een bedrijf
          </span>
        </div>
      </div>

      {/* 12 Company Buttons Section */}
      <div className="relative z-10 mt-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-canvas-hairline/60">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wider text-white font-display">
              Ecosysteem Bedrijven (12 Knoppen)
            </span>
            <span className="rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono px-2 py-0.5">
              12 Bedrijven
            </span>
          </div>
          <span className="text-xs text-ink-on-canvas-muted">
            Klik op een knop om de video & protocol animatie van dat bedrijf te starten
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {COMPANY_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => handleSelectAction(action)}
                className="group relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all duration-300 border-canvas-hairline bg-canvas-panel/60 hover:bg-canvas-panel hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${action.borderColor} group-hover:scale-110 transition-transform overflow-hidden p-1.5 shadow-sm group-hover:border-white/30`}
                    >
                      <img
                        src={action.logoSrc}
                        alt={`${action.label} logo`}
                        className="h-full w-full object-contain filter drop-shadow transition-transform"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          const fallback = e.currentTarget.parentElement?.querySelector(".action-fallback-icon") as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="action-fallback-icon hidden items-center justify-center">
                        <Icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {action.badge}
                    </span>
                  </div>

                  <div className="mt-3.5">
                    <h3 className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{action.label}</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-zinc-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                        <Play className="h-3 w-3 ml-0.5" />
                      </span>
                    </h3>
                    <p className="text-[11px] text-ink-on-canvas-muted line-clamp-2 mt-1 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-canvas-hairline/60 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-mono">Status:</span>
                  <span className="text-mint font-medium flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                    Actief
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog for Video / Interactive Animation */}
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
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-1.5 overflow-hidden ${
                  selectedAction?.color ?? "text-white"
                }`}
              >
                {selectedAction && (
                  <>
                    <img
                      src={selectedAction.logoSrc}
                      alt={`${selectedAction.label} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".modal-fallback-icon") as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="modal-fallback-icon hidden items-center justify-center">
                      <selectedAction.icon className="h-5 w-5" />
                    </div>
                  </>
                )}
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-bold font-display text-white">
                  {selectedAction?.label} · IQ Agent
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                  {selectedAction?.description}
                </DialogDescription>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition"
              title="Sluiten"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>

          {/* Video or High-Tech Simulated Visualizer Container */}
          <div className="relative aspect-video w-full max-h-[70vh] sm:max-h-[500px] bg-black flex items-center justify-center overflow-hidden select-none">
            {selectedAction && !hasVideoError && (
              <video
                ref={videoRef}
                key={selectedAction.videoSrc}
                src={selectedAction.videoSrc}
                autoPlay
                playsInline
                muted
                loop={false}
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                onLoadStart={() => setIsLoading(true)}
                onWaiting={() => setIsLoading(true)}
                onLoadedData={handleLoadedData}
                onPlaying={() => {
                  setIsLoading(false);
                  setIsPlaying(true);
                }}
                onTimeUpdate={() => {
                  if (videoRef.current && videoRef.current.currentTime > 0) {
                    setIsLoading(false);
                    setIsPlaying(true);
                  }
                }}
                onPause={() => {
                  if (videoRef.current && !videoRef.current.ended) {
                    setIsPlaying(false);
                  }
                }}
                onEnded={handleVideoEnded}
                onError={() => {
                  // If user hasn't uploaded video file yet, seamlessly switch to high-tech simulator screen!
                  setIsLoading(false);
                  setHasVideoError(true);
                }}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            )}

            {/* Seamless High-Tech 3D/Sonar Simulator (Active if video file is not present on disk yet) */}
            {hasVideoError && selectedAction && (
              <div className="relative inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#090d1f] via-[#050711] to-black">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <ThreeScene kind="iq-bot" scale={0.7} />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-4">
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-glow p-2 overflow-hidden ${selectedAction.color}`}
                  >
                    <img
                      src={selectedAction.logoSrc}
                      alt={`${selectedAction.label} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".sim-fallback-icon") as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="sim-fallback-icon hidden items-center justify-center">
                      <selectedAction.icon className="h-8 w-8" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
                      IQ Agent Protocol Loop
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">
                      {selectedAction.label}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {selectedAction.telemetryMsg}
                    </p>
                  </div>

                  {/* High-tech animated progress bar */}
                  <div className="w-full space-y-2 pt-2">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span>Protocol simulatie & streaming</span>
                      <span className="text-cyan-400">{simulatedProgress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-mint transition-all duration-500 rounded-full"
                        style={{ width: `${simulatedProgress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-zinc-500">
                    Plaats {selectedAction.videoSrc} in de public map om uw eigen MP4 video te draaien.
                  </p>
                </div>
              </div>
            )}

            {/* Tap-to-play overlay */}
            {!hasVideoError && (
              <div
                className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto cursor-pointer flex items-center justify-center"
                onContextMenu={(e) => e.preventDefault()}
                onClick={handleStartPlay}
              >
                {!isPlaying && !isLoading && (
                  <div className="flex flex-col items-center justify-center gap-2.5 p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-cyan-400/30 shadow-2xl pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      <Play className="h-6 w-6 ml-0.5 fill-current" />
                    </div>
                    <span className="text-xs font-mono font-medium text-white">
                      Tik om protocol te starten
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* High-tech Loading State while video buffers */}
            {isLoading && !hasVideoError && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070a14]/90 backdrop-blur-sm pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                  <div className="absolute h-6 w-6 rounded-full bg-cyan-400/20 animate-pulse" />
                </div>
                <p className="mt-3 text-xs font-mono text-zinc-300">
                  {selectedAction?.label} Protocol inladen...
                </p>
              </div>
            )}
          </div>

          {/* Autonomous Status Footer */}
          <div className="px-4 py-2.5 sm:py-3 border-t border-white/10 bg-[#05070f] flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-zinc-300 text-xs">
                {selectedAction?.label} IQ Agent in uitvoering
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-xs font-semibold text-zinc-400 hover:text-white underline font-mono"
            >
              Sluiten
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IqBotInteractiveConsole;
