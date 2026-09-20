import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThreeScene } from "@/components/three/ThreeScene";
import { LumenCtaButton, LumenCtaLink } from "@/components/three/LumenCta";

type Props = {
  onScrollToInfo: () => void;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const HeroSection: React.FC<Props> = ({ onScrollToInfo }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="band-canvas relative isolate min-h-[100svh] w-full overflow-hidden">
      {/* threeui EnergyOrb — the IQ Bot as a living light source */}
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
      {/* Vignette so copy stays legible over the brightest part of the orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,7,15,0.92) 0%, rgba(5,7,15,0.75) 38%, rgba(5,7,15,0.15) 70%, rgba(5,7,15,0.4) 100%), linear-gradient(180deg, rgba(5,7,15,0.4) 0%, rgba(5,7,15,0) 30%, rgba(5,7,15,0.9) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-content grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-12 lg:px-10 lg:pb-28 lg:pt-36">
        <div className="lg:col-span-7">
          <motion.div {...fadeUp(0.05)} className="eyebrow mb-7">
            IQ Bot · The Next Gen AI Agent
          </motion.div>
          <motion.h1
            {...fadeUp(0.12)}
            className="font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-display-lg lg:text-display-xl"
          >
            Laat de <span className="text-gradient-light">IQ Bot</span> automatisch jouw cashflow opbouwen
          </motion.h1>
          <motion.p {...fadeUp(0.22)} className="mt-7 max-w-[34rem] text-lg leading-8 text-ink-muted">
            Geen kennis vereist, geen zorgen. Gewoon laten groeien.
          </motion.p>
          <motion.div {...fadeUp(0.32)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LumenCtaLink to="/auth" dot>
              Inloggen
            </LumenCtaLink>
            <LumenCtaButton variant="ghost" onClick={onScrollToInfo}>
              <ArrowDown className="h-4 w-4" />
              Bekijk hoe het werkt
            </LumenCtaButton>
            <LumenCtaButton variant="ghost" onClick={() => setShowDemoModal(true)}>
              <Play className="h-4 w-4" />
              Bekijk demo
            </LumenCtaButton>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="card-glass card-glass--floating relative ml-auto w-full max-w-sm rounded-ds-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="eyebrow">Cashflow</div>
              <span className="chip chip--mint">Actief</span>
            </div>
            <div className="tnum mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-ink">+ €400</div>
            <div className="mt-2 text-sm text-ink-muted">Cashflow ontvangen</div>
            <div className="mt-6 h-px w-full bg-canvas-hairline" />
            <div className="mt-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <span className="text-sm font-medium text-ink">
                IQ Bot <span className="text-ink-faint">· The Next Gen AI Agent</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="w-[92vw] max-w-4xl border-canvas-hairline bg-canvas-elevated text-ink">
          <DialogHeader>
            <DialogTitle className="font-display">Bekijk hoe InvestbotIQ werkt</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-ds-lg border border-canvas-hairline bg-canvas">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1uMoBy76oQs"
              title="InvestbotIQ Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
