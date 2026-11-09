import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play, Sparkles, CheckCircle2, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ThreeScene } from "@/components/three/ThreeScene";
import { usePreferences } from "@/lib/preferences";
import { Link } from "react-router-dom";

type Props = {
  onScrollToInfo: () => void;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const HeroSection: React.FC<Props> = ({ onScrollToInfo }) => {
  const { t } = usePreferences();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [amountVisible, setAmountVisible] = useState(true);

  return (
    <section className="band-canvas relative isolate min-h-[100svh] w-full overflow-hidden bg-black">
      {/* threeui EnergyOrb — living 3D ambient light source */}
      <ThreeScene
        kind="energy-orb"
        hue={-18}
        saturation={1.05}
        glow={1.35}
        smokeScale={1.1}
        smokeStrength={1.1}
        speed={0.85}
        starDensity={1.2}
        starSize={0.9}
        brightness={1.05}
        scale={1}
        className="!absolute !inset-0"
      />
      {/* Apple Studio Ambient vignette */}
      <div aria-hidden="true" className="scene-veil scene-veil--hero" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-content grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-12 lg:px-10 lg:pb-28 lg:pt-36">
        <div className="lg:col-span-7">
          <motion.div {...fadeUp(0.05)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-1 text-xs text-[#2997ff] font-medium backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#2997ff] animate-pulse" />
            <span>IQ Bot · Next Gen AI Agent</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="font-display text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-display-lg lg:text-display-xl"
          >
            {t("Laat de")}{" "}
            <span className="bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b] bg-clip-text text-transparent">
              IQ Bot
            </span>{" "}
            {t("automatisch jouw cashflow opbouwen")}
          </motion.h1>

          <motion.p {...fadeUp(0.22)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#86868b] font-normal">
            {t("Geen kennis vereist, geen zorgen. Gewoon laten groeien.")}
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="apple-btn-primary px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 active:scale-[0.97]"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{t("Bekijk demo")}</span>
            </button>

            <button
              type="button"
              onClick={onScrollToInfo}
              className="apple-btn-secondary px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 active:scale-[0.97]"
            >
              <ArrowDown className="h-4 w-4 text-[#86868b]" />
              <span>{t("Hoe het werkt")}</span>
            </button>
          </motion.div>
        </div>

        {/* Floating Apple Glass Cashflow Tile with Tactile Haptics */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="apple-glass-card relative ml-auto w-full max-w-sm rounded-[2rem] p-6 sm:p-7 shadow-2xl active:scale-[0.99] transition-transform duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#86868b]">Cashflow Pool</span>
                <button
                  type="button"
                  onClick={() => setAmountVisible(!amountVisible)}
                  className="p-1 rounded-full text-[#86868b] hover:text-white transition-colors"
                  title={amountVisible ? "Verberg bedrag" : "Toon bedrag"}
                >
                  {amountVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#30d158]/10 text-[#30d158] border border-[#30d158]/25 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] animate-pulse" />
                {t("Actief")}
              </span>
            </div>

            <div className="tnum mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-white">
              {amountVisible ? "+ €400" : "€ ••••••"}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-[#86868b]">{t("Maandelijkse cashflow ontvangen")}</div>

            <div className="mt-6 h-px w-full bg-white/[0.08]" />

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#30d158] shadow-[0_0_10px_rgba(48,209,88,0.9)]" />
                <span className="text-xs sm:text-sm font-medium text-white">
                  IQ Bot <span className="text-[#86868b]">· Autonoom</span>
                </span>
              </div>
              <Link
                to="/member/ai-running"
                className="text-xs text-[#2997ff] hover:text-white transition-colors font-medium inline-flex items-center gap-0.5"
              >
                <span>Status</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Apple Hardware Display Video Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="w-[94vw] max-w-4xl p-0 overflow-hidden border border-white/[0.14] apple-glass text-white shadow-2xl rounded-[2rem] z-[100]">
          {/* macOS Titlebar Header */}
          <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
              <span className="ml-3 text-xs font-medium text-[#86868b]">IQ Bot Intelligence Preview — Autonomous Pipeline</span>
            </div>
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className="text-xs text-[#86868b] hover:text-white px-2 py-0.5 rounded-lg border border-white/[0.08] transition active:scale-[0.96]"
            >
              Sluiten
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="apple-hardware-frame relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <video
                src="/videos/iq.mp4"
                controls
                autoPlay
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[#86868b] max-w-md">
                Bekijk hoe de IQ Bot autonoom liquiditeit analyseert en maandelijkse cashflows structureert over de holding.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/register"
                  onClick={() => setShowDemoModal(false)}
                  className="apple-btn-primary px-4 py-2 rounded-full text-xs font-semibold active:scale-[0.97]"
                >
                  {t("Nu aanmelden")}
                </Link>
                <Link
                  to="/alles-over-investbot/hoe-werkt-het"
                  onClick={() => setShowDemoModal(false)}
                  className="apple-btn-secondary px-4 py-2 rounded-full text-xs font-medium active:scale-[0.97]"
                >
                  {t("Meer info")}
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
