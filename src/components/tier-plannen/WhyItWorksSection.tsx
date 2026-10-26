import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { Timer, Bot, ShieldCheck, TrendingUp } from "lucide-react";

const MECHANISMS = [
  {
    icon: Timer,
    title: "Time-Gap Liquiditeitsarbitrage",
    description: "Door slim gebruik te maken van geplande tijdsintervallen tussen allocatiemomenten, benut het protocol risicomijdende liquiditeitspremies binnen het interne netwerk.",
    colorClass: "text-amber",
  },
  {
    icon: Bot,
    title: "Autonome Uitvoering via IQ Bot",
    description: "De IQ Bot bewaakt en executeert het allocatieschema 24/7. Er is geen sprake van emotionele marktpaniek of handmatige menselijke fouten.",
    colorClass: "text-indigo",
  },
  {
    icon: ShieldCheck,
    title: "Gefaseerde Risico-isolatie",
    description: "Iedere Tier opereert binnen een strikt gedefinieerd risicocompartiment met automatische volatiliteitsbuffers ter bescherming van de hoofdsom.",
    colorClass: "text-cyan",
  },
  {
    icon: TrendingUp,
    title: "Voorspelbare Compounding",
    description: "Door systematische herallocatie per 3-maandelijkse cyclus groeit de kasstroom volgens transparante, vooraf inzichtelijke tabellen en parameters.",
    colorClass: "text-mint",
  },
];

export default function WhyItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
      <div className="mx-auto max-w-content">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow eyebrow--paper mb-4">Mechaniek</div>
          <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
            Waarom functioneert het Tier-model?
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite-muted">
            Vier fundamentele bouwstenen die de betrouwbaarheid en continue groei van het platform waarborgen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {MECHANISMS.map((m, i) => (
            <FadeIn key={m.title} delay={0.1 + i * 0.08} className="h-full">
              <div className="card-paper p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300 h-full flex flex-col">
                <div className="icon-tile icon-tile--paper mb-6">
                  <m.icon className={`h-5 w-5 ${m.colorClass}`} />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-graphite mb-2.5">
                  {m.title}
                </h3>
                <p className="text-base leading-7 text-graphite-muted">
                  {m.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="card-paper p-8 shadow-level-2">
            <h3 className="font-display text-xl font-semibold text-graphite mb-2 text-center">
              Groeitraject: Kaspositie, Cashflow en Tiers (TIER 2–6)
            </h3>
            <p className="text-sm text-graphite-muted text-center max-w-xl mx-auto mb-8">
              Visuele projectie van de gecumuleerde kaspositie en de stijgende periodieke cashflow per fase.
            </p>
            <div className="h-[480px] sm:h-[600px] w-full flex items-center justify-center bg-paper-elevated rounded-2xl overflow-hidden p-4">
              <img
                src="/brand/growth-chart.png"
                alt="Grafiek van Kaspositie, Cashflow, Flowlutas en TimeGap-leningen"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}