import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeInAnimation";

const FAQ = [
  {
    question: "Moet ik zelf handelen of actief beslissingen nemen?",
    answer: "Nee. Het protocol opereert 100% autonoom. Zodra je een Tier activeert, wijst de IQ Bot het kapitaal toe volgens strikte liquiditeits- en risicomodellen, zonder dat je zelf marktbewegingen hoeft te analyseren of orders hoeft in te voeren.",
  },
  {
    question: "Kan ik zelf het risicoprofiel en de instellingen bepalen?",
    answer: "Ja. Binnen het Member Dashboard kun je kiezen uit drie gevalideerde risicoprofielen (conservatief, gebalanceerd of dynamisch) en functies zoals automatische herinvestering (auto-compound) en het Volatility Shield beheren.",
  },
  {
    question: "Hoe en wanneer wordt de cashflow inzichtelijk gemaakt?",
    answer: "De cashflow wordt maandelijks bijgewerkt en transparant getoond in je persoonlijke Member Dashboard. Hier zie je realtime grafieken, actieve Flowlutas, historische rapportages en auditlogs van elke transactie.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto w-full max-w-content px-6 pb-28 pt-4 md:pb-36 lg:px-10" id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeIn delay={0.05} className="lg:col-span-4">
          <div className="eyebrow eyebrow--paper mb-6">Veelgestelde Vragen</div>
          <h3 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">FAQ</h3>
          <p className="mt-4 text-base leading-relaxed text-graphite-muted">
            Beknopte antwoorden op de meest gestelde vragen over het functioneren van de IQ Bot.
          </p>
        </FadeIn>
        <div className="lg:col-span-8">
          <div className="card-paper divide-y divide-paper-hairline overflow-hidden shadow-level-1">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <FadeIn key={f.question} delay={0.1 + 0.05 * i}>
                  <button
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-paper"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-medium tracking-[-0.01em] text-graphite">{f.question}</span>
                    <span
                      className={`icon-tile icon-tile--paper h-9 w-9 shrink-0 rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-base leading-7 text-graphite-muted">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={0.3} className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-base font-semibold text-indigo hover:underline"
            >
              Bekijk alle veelgestelde vragen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-graphite-muted hover:text-graphite hover:underline"
            >
              Heb je een andere vraag? Neem contact op →
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
