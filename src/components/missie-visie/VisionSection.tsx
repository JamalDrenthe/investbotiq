import React from "react";
import { motion } from "framer-motion";
import { Eye, ShieldCheck } from "lucide-react";

export default function VisionSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline bg-paper">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 flex justify-center order-2 md:order-1"
          >
            <div className="card-paper p-8 shadow-level-2 max-w-sm w-full text-center space-y-4">
              <span className="icon-tile icon-tile--paper mx-auto h-14 w-14 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-7 w-7 text-cyan" />
              </span>
              <h3 className="font-display text-xl font-semibold text-graphite">Duurzame Zekerheid</h3>
              <p className="text-sm leading-6 text-graphite-muted">
                Volledig beheerd binnen het Investbotiq ecosysteem, zonder afhankelijkheid van externe brokers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6 order-1 md:order-2"
          >
            <div className="eyebrow eyebrow--paper">Onze Visie</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Een financiële toekomst gebaseerd op autonomie en wiskunde
            </h2>
            <p className="text-lg leading-8 text-graphite-muted">
              Wij zien een toekomst waarin vermogensgroei niet langer afhankelijk is van speculatieve volatiliteit, maar berust op transparante algoritmes en gestructureerde cashflow cycli.
            </p>
            <p className="text-base leading-7 text-graphite-muted">
              Door technologie het zware werk te laten doen, kunnen platformdeelnemers rekenen op voorspelbare resultaten en volledige regie over hun financiële toekomst.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
