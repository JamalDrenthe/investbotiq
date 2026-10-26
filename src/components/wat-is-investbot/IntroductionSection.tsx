import React from "react";
import { motion } from "framer-motion";
import { ThreeScene } from "@/components/three/ThreeScene";
import { Bot, ShieldCheck, Zap } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="eyebrow eyebrow--paper">Autonoom Protocol</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Geautomatiseerde cashflowopbouw zonder marktruis
            </h2>
            <p className="text-lg leading-8 text-graphite-muted">
              De IQ Bot fungeert als een autonome protocol-agent die kapitaal binnen gestructureerde Tiers beheert en optimaliseert. In plaats van speculatieve voorspellingen of emotionele marktbeslissingen hanteert het algoritme strikte regels voor liquiditeitsallocatie en risicobescherming.
            </p>
            <p className="text-base leading-7 text-graphite-muted">
              Hierdoor ontstaat een voorspelbare, periodieke cashflow die per cyclus meegroeit, terwijl je kapitaal beschermd blijft binnen een afgeschermd intern ecosysteem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-paper-hairline">
              <div className="flex items-start gap-3">
                <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-indigo" />
                </span>
                <div>
                  <h4 className="font-display font-semibold text-graphite text-sm">Ingebouwde Risicofilters</h4>
                  <p className="text-xs text-graphite-muted mt-0.5">Continue volatiliteitsbewaking en automatische stop-buffers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
                  <Zap className="h-5 w-5 text-cyan" />
                </span>
                <div>
                  <h4 className="font-display font-semibold text-graphite text-sm">Gefaseerde Compounding</h4>
                  <p className="text-xs text-graphite-muted mt-0.5">Elke 3 maanden automatische herinvestering en tier-verhoging.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative h-72 w-72 sm:h-88 sm:w-88 overflow-hidden rounded-3xl bg-canvas border border-canvas-hairline shadow-level-3">
              <ThreeScene kind="iq-bot" scale={0.9} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-canvas via-canvas/80 to-transparent flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan font-mono">Status: Autonoom</span>
                  <p className="text-xs text-white font-medium">IQ Bot Neural Core</p>
                </div>
                <span className="chip chip--mint text-[10px]">Actief</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
