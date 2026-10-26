
import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function TierExplanationSection() {
  return (
    <section className="py-20 px-6 lg:px-10">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <FadeIn delay={0.2} className="lg:col-span-6">
            <div className="eyebrow eyebrow--paper mb-4">Gefaseerde Vermogensstructuur</div>
            <h2 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite mb-6">
              Wat is het Tier Plan?
            </h2>
            
            <p className="text-base md:text-lg text-graphite-muted mb-6 leading-relaxed">
              Het Tier Plan is een mathematisch gevalideerd groeimodel waarin je cashflow stapsgewijs toeneemt van een initiële verkenning naar een stabiele, voorspelbare kasstroom. Elke fase beslaat een cyclus van circa 3 maanden.
            </p>
            
            <p className="text-base md:text-lg text-graphite-muted leading-relaxed mb-6">
              Binnen het InBotIQ2 traject doorloop je gefaseerd 5 actieve niveaus (Tier 2 t/m 6). Per Tier worden additionele Flowlutas geactiveerd, waardoor het maandelijkse rendement trapsgewijs toeneemt zonder handmatige interventie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-graphite">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                Vaste 3-maandelijkse cycli
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-graphite">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                Volledig schuldvrije eindfase
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4} className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col gap-3">
                {[
                  { tier: 2, months: "Maand 1 – 3", cashflow: "€400/mnd", status: "Initiële Allocatie" },
                  { tier: 3, months: "Maand 4 – 6", cashflow: "€800/mnd", status: "Opschaling" },
                  { tier: 4, months: "Maand 7 – 9", cashflow: "€1.200/mnd", status: "Consolidatie" },
                  { tier: 5, months: "Maand 10 – 12", cashflow: "€2.000/mnd", status: "Volledige Capaciteit" },
                  { tier: 6, months: "Maand 13 – 15", cashflow: "€2.000/mnd", status: "Eindcyclus · Schuldvrij" }
                ].map((item, index) => (
                  <div
                    key={item.tier}
                    className="card-paper flex items-center justify-between p-4 shadow-level-1 transition-all hover:shadow-level-2"
                    style={{
                      marginLeft: `${index * 12}px`
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="icon-tile icon-tile--paper h-10 w-10 shrink-0 font-display text-base font-bold text-indigo">
                        {item.tier}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-display font-semibold text-graphite text-sm md:text-base">Tier {item.tier}</p>
                          <span className="text-[11px] font-medium text-graphite-faint">({item.months})</span>
                        </div>
                        <p className="text-xs text-graphite-muted">{item.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-semibold text-graphite">{item.cashflow}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

