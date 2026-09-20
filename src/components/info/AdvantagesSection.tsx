import React from "react";
import { Check } from "lucide-react";
import { FadeIn } from "./FadeInAnimation";

const ADVANTAGES = [
  "Geen minimale investering vereist",
  "Transparantie en maandelijkse rapportage",
  "Non-technical: merendeels passief",
  "Passief inkomen",
  "Maandelijkse groei",
];

export default function AdvantagesSection() {
  return (
    <div className="mx-auto w-full max-w-content px-6 py-24 md:py-32 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeIn delay={0.05} className="lg:col-span-4">
          <div className="eyebrow eyebrow--paper mb-6">Voordelen</div>
          <h3 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">Voordelen:</h3>
        </FadeIn>
        <div className="lg:col-span-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {ADVANTAGES.map((item, i) => (
              <FadeIn key={item} delay={0.1 + i * 0.05} className={i === ADVANTAGES.length - 1 ? "sm:col-span-2" : ""}>
                <li className="card-paper flex h-full items-center gap-4 p-5 transition-shadow duration-300 hover:shadow-level-2">
                  <span className="icon-tile icon-tile--paper h-9 w-9 shrink-0 rounded-full">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-lg font-medium text-graphite">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
