import React from "react";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 border-t border-paper-hairline">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="eyebrow eyebrow--paper">Kernovertuiging</div>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.3] tracking-[-0.03em] text-graphite">
            “Financiële vrijheid vereist een geautomatiseerd, emotieloos fundament. Wij bouwen technologie die kapitaal voor mensen laat werken, in plaats van andersom.”
          </blockquote>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-faint">
            Investbotiq Manifest
          </p>
        </motion.div>
      </div>
    </section>
  );
}