import React from "react";
import { motion } from "framer-motion";
import { Coins, Cpu, LineChart, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Algoritmische Cashflowallocatie",
    description: "Het protocol genereert een periodieke cashflow op basis van vastgestelde parameters. Kapitaal wordt gealloceerd volgens bewezen kwantitatieve modellen.",
    icon: Coins,
    colorClass: "text-indigo",
  },
  {
    title: "Zero-Execution Overhead",
    description: "Geen handmatig orderbeheer, grafieken bestuderen of actieve markttiming. De IQ Bot handelt 100% autonoom volgens het geselecteerde risicoprofiel.",
    icon: Cpu,
    colorClass: "text-cyan",
  },
  {
    title: "Gefaseerde Cyclusparameters",
    description: "Iedere stap in het 6-Tier groeitraject is vooraf inzichtelijk. Je weet exact wanneer de herallocatie plaatsvindt en wat de verwachte maandkasstroom is.",
    icon: LineChart,
    colorClass: "text-mint",
  },
  {
    title: "Afgeschermde Beveiligingslaag",
    description: "Je vermogen en data blijven te allen tijde binnen het gecodeerde ecosysteem. Geen externe brokers, geen doorverkoop van gegevens en geen onbevoegde toegang.",
    icon: ShieldCheck,
    colorClass: "text-amber",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
      <div className="mx-auto max-w-content">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow eyebrow--paper mb-4">Pijlers</div>
          <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
            Fundamenten van het IQ Bot Protocol
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite-muted">
            Een overzicht van de architectuur en de mechanismen die zorgen voor consistente opbrengsten en risicobeheersing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-paper p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300"
            >
              <div className="icon-tile icon-tile--paper mb-6">
                <feature.icon className={`h-5 w-5 ${feature.colorClass}`} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-graphite mb-2.5">
                {feature.title}
              </h3>
              <p className="text-base leading-7 text-graphite-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}