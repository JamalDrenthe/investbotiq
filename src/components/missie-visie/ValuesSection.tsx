import React from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Cpu } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Toegankelijke Vermogensgroei",
    description: "Wij verlagen de traditionele drempels tot gestructureerde cashflow. Geen vereiste van decennia aan beleggingservaring of onevenredig hoge instapbedragen.",
    colorClass: "text-indigo",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Transparantie",
    description: "Ieder lid heeft via het persoonlijke dashboard direct inzicht in de kwartaalcycli, opbrengsten, historische cashflowmutaties en protocolparameters.",
    colorClass: "text-mint",
  },
  {
    icon: Cpu,
    title: "Wiskundige Autonomie",
    description: "Wij benutten geavanceerde algoritmiek om menselijke bias en emotionele paniek uit te sluiten, waardoor kapitaal beschermd en voorspelbaar groeit.",
    colorClass: "text-cyan",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
      <div className="mx-auto max-w-content">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow eyebrow--paper mb-4">Waarden</div>
          <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
            Onze Kernwaarden
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite-muted">
            De leidende principes achter het platform en onze filosofie over vermogensbeheer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-paper p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300"
            >
              <div className="icon-tile icon-tile--paper mb-6">
                <val.icon className={`h-5 w-5 ${val.colorClass}`} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-graphite mb-2.5">
                {val.title}
              </h3>
              <p className="text-base leading-7 text-graphite-muted">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}