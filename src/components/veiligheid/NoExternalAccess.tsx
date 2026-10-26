import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function NoExternalAccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col md:flex-row items-center gap-8"
    >
      <div className="icon-tile icon-tile--paper h-16 w-16 rounded-2xl flex items-center justify-center shrink-0">
        <ShieldCheck className="h-8 w-8 text-indigo" />
      </div>

      <div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-graphite mb-3">
          Geen externe datakoppelingen of verkoop van gegevens
        </h2>
        <p className="text-base leading-7 text-graphite-muted">
          Jouw gegevens en vermogensmutaties blijven strikt binnen het beveiligde Investbotiq ecosysteem. Wij verstrekken geen persoons- of transactiegegevens aan externe commerciële partijen, brokers of databedrijven.
        </p>
      </div>
    </motion.div>
  );
}