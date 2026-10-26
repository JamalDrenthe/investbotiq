import React from "react";
import { motion } from "framer-motion";
import { Globe, Clock, Briefcase, Sparkles, ArrowDown, Send, ShieldCheck } from "lucide-react";
import { LumenCtaButton } from "@/components/three/LumenCta";

interface Props {
  onOpenApply: (vacancyId?: string) => void;
  onScrollToMatrix: () => void;
}

export const CareersHero: React.FC<Props> = ({ onOpenApply, onScrollToMatrix }) => {
  return (
    <section className="relative overflow-hidden py-8 md:py-12 border-b border-white/10">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        {/* Top telemetry badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300 border border-cyan-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            13 Sleutelposities Beschikbaar
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300 border border-white/10">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            100% Remote (Wereldwijd)
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300 border border-white/10">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            24–40 Uur / Week
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300 border border-white/10">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            ZZP / Freelance of Vast Contract
          </div>
        </div>

        {/* Group Headline */}
        <div className="max-w-3xl">
          <h2 className="text-sm uppercase font-mono tracking-widest text-zinc-400 mb-2">
            Internationale Tech-, AI- & Vastgoedgroep
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">
            Bouw mee aan de infrastructuur van <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-mint">autonome AI & cashflows</span>.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Ter voorbereiding op verdere internationale schaalvergroting, pre-IPO kapitaalrondes en hardware-uitbreiding openen wij 13 specialistische sleutelposities. Werk 100% remote, geniet van riante succesfees en profiteer van een geavanceerd ecosysteem met 12 partnerondernemingen.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <LumenCtaButton size="lg" onClick={() => onOpenApply()} dot>
            Direct Solliciteren
          </LumenCtaButton>
          <button
            type="button"
            onClick={onScrollToMatrix}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            <span>Bekijk Overzichtsmatrix (13 Functies)</span>
            <ArrowDown className="h-4 w-4 text-cyan-400" />
          </button>
        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">13</div>
            <div className="text-xs text-zinc-400 mt-1 font-mono">Functieprofielen</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-display font-bold text-mint">100%</div>
            <div className="text-xs text-zinc-400 mt-1 font-mono">Remote Vrijheid</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-display font-bold text-cyan-400">27 Dagen</div>
            <div className="text-xs text-zinc-400 mt-1 font-mono">Vakantie + Bijkopen</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-display font-bold text-indigo-400">Pre-IPO</div>
            <div className="text-xs text-zinc-400 mt-1 font-mono">Succesfees & Margedeling</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
