import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeInAnimation";

const ADVANTAGES = [
  "Toegankelijke instap zonder onevenredige kapitaaleisen",
  "Transparante maandelijkse rapportage en auditlogs",
  "Volledig geautomatiseerd via het autonome IQ Bot protocol",
  "Gefaseerde cashflowgroei volgens vaste Tier-cycli",
  "Geen externe tussenpartijen of verborgen transactiekosten",
];

export default function AdvantagesSection() {
  return (
    <div className="mx-auto w-full max-w-content px-6 py-24 md:py-32 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeIn delay={0.05} className="lg:col-span-4">
          <div className="eyebrow eyebrow--paper mb-6">Voordelen</div>
          <h3 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">
            De kracht van Investbotiq
          </h3>
          <p className="mt-4 text-base leading-relaxed text-graphite-muted">
            Investbotiq bouwt stap voor stap aan een stabiele, voorspelbare kasstroom binnen een streng beveiligd financieel ecosysteem.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              to="/tier-plannen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:underline"
            >
              Bekijk hoe de Tiers werken <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/veiligheid"
              className="inline-flex items-center gap-2 text-sm font-medium text-graphite-muted hover:text-graphite hover:underline"
            >
              Lees meer over veiligheid →
            </Link>
          </div>
        </FadeIn>
        <div className="lg:col-span-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {ADVANTAGES.map((item, i) => (
              <FadeIn key={item} delay={0.1 + i * 0.05} className={i === ADVANTAGES.length - 1 ? "sm:col-span-2" : ""}>
                <li className="card-paper flex h-full items-center gap-4 p-5 transition-shadow duration-300 hover:shadow-level-2">
                  <span className="icon-tile icon-tile--paper h-9 w-9 shrink-0 rounded-full">
                    <Check className="h-4 w-4 text-mint" />
                  </span>
                  <span className="text-base font-medium text-graphite">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
