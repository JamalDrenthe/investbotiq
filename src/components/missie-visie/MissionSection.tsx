import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >
            <div className="eyebrow eyebrow--paper">Onze Missie</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Bouwen aan een onafhankelijk, geautomatiseerd cashflowsysteem
            </h2>
            <p className="text-lg leading-8 text-graphite-muted">
              Traditioneel vermogensbeheer is vaak onnodig complex, kostbaar en ontoegankelijk gemaakt door bureaucratische tussenpersonen. Wij zijn ervan overtuigd dat moderne technologie iedereen de tools moet bieden om gestructureerd en veilig vermogen op te bouwen.
            </p>
            <p className="text-base leading-7 text-graphite-muted">
              Daarom ontwikkelt Investbotiq een afgeschermd protocol waarin wiskundige regels en de IQ Bot zorgen voor voorspelbare, maandelijkse kasstromen – transparant, controleerbaar en schaalbaar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="card-paper p-8 shadow-level-2 max-w-sm w-full text-center space-y-4">
              <span className="icon-tile icon-tile--paper mx-auto h-14 w-14 rounded-2xl flex items-center justify-center">
                <Compass className="h-7 w-7 text-indigo" />
              </span>
              <h3 className="font-display text-xl font-semibold text-graphite">Doelgericht Protocol</h3>
              <p className="text-sm leading-6 text-graphite-muted">
                Gericht op stabiele kwartaalrendementen en consistente herallocatie via gevalideerde Tiers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}