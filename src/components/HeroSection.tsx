import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrbCanvas from "@/components/Shared/OrbCanvas";

function OrbVisual() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.62 }}
      animate={{ scale: [0.95, 1.12, 0.96, 1], opacity: [0.62, 1, 0.67, 1] }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.2, ease: "easeInOut" }}
      className="relative z-10 flex items-center justify-center"
      style={{ minHeight: 120 }}
    >
      <OrbCanvas />
    </motion.div>
  );
}

type Props = {
  onScrollToInfo: () => void;
};

const HeroSection: React.FC<Props> = ({ onScrollToInfo }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.95, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-7xl flex-col justify-center gap-10 px-5 pb-20 pt-36 md:flex-row md:items-center md:gap-4 md:px-8">
      <div className="flex flex-1 flex-col items-center justify-center md:items-start">
        <FadeIn delay={0.05}>
          <div className="eyebrow mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            IQ Bot · The Next Gen AI Agent
          </div>
          <h1 className="display-font max-w-2xl text-center text-5xl font-bold leading-[1.02] tracking-[-0.05em] text-[#11152c] md:text-left lg:text-7xl">
            Laat de <span className="text-indigo-500">IQ Bot</span> automatisch jouw cashflow opbouwen
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-9 mt-6 max-w-xl text-center text-lg leading-8 text-slate-600 md:text-left">
            Geen kennis vereist, geen zorgen. Gewoon laten groeien.
          </p>
        </FadeIn>
        <div className="mb-7 mt-2 flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
          <FadeIn delay={0.22}>
            <Button asChild className="h-14 w-72 max-w-full rounded-xl bg-[#635bff] px-6 text-base font-bold shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-1 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 md:w-48">
              <Link to="/auth">🔵 Inloggen</Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.32}>
            <Button variant="outline" className="h-14 w-72 max-w-full rounded-xl border-slate-200 bg-white/80 px-6 text-base font-bold text-slate-700 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 hover:bg-white hover:text-indigo-700 md:w-56" onClick={onScrollToInfo}>
              ⚪ Bekijk hoe het werkt
            </Button>
          </FadeIn>
          <FadeIn delay={0.42}>
            <Button variant="outline" className="h-14 w-72 max-w-full rounded-xl border-slate-200 bg-white/50 px-6 text-base font-bold text-indigo-600 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white md:w-44" onClick={() => setShowDemoModal(true)}>
              🎥 Bekijk demo
            </Button>
          </FadeIn>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center md:mt-10">
        <FadeIn delay={0.23}>
          <div className="relative flex h-[360px] w-full max-w-[470px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/55 shadow-[0_30px_100px_rgba(77,68,180,0.18)] backdrop-blur-xl">
            <div className="absolute inset-5 rounded-[2rem] border border-indigo-100/80 bg-gradient-to-br from-indigo-50/80 via-white/30 to-cyan-50/80" />
            <div className="absolute left-8 top-8 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-lg">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Cashflow</div>
              <div className="mt-1 text-xl font-bold text-slate-900">+ €400</div>
            </div>
            <div className="absolute bottom-8 right-8 rounded-2xl border border-white bg-[#11152c] px-4 py-3 text-white shadow-xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">IQ Bot</div>
              <div className="mt-1 text-sm font-semibold">Actief</div>
            </div>
            <OrbVisual />
          </div>
        </FadeIn>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Automatisch in beweging
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="w-[90vw] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bekijk hoe InvestbotIQ werkt</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full rounded-xl bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1uMoBy76oQs"
              title="InvestbotIQ Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: "0.75rem", width: "100%", height: "100%" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
