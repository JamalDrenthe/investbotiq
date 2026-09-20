
import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
export default function TierExplanationSection() {
  return <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <FadeIn delay={0.2} className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Wat is het Tier Plan?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Een Tier Plan is een gefaseerde structuur waarin elke deelnemer groeit van kleine cashflowopbouw naar een stabiel, zelfstandig passief inkomen. Elke tier duurt gemiddeld 3 maanden.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">Elke gebruiker volgt een vooraf bepaald groeitraject, bestaande uit 6 actieve tiers. Elke tier draagt je naar een hogere maandelijkse cashflow.</p>
          </FadeIn>
          
          <FadeIn delay={0.4} className="flex-1 flex justify-center">
            <div className="w-full max-w-md p-4">
              <div className="flex flex-col gap-6">
                {[2, 3, 4, 5, 6].map((tier, index) => <div key={tier} className="flex items-center rounded-lg border border-indigo-200 p-4 shadow-sm bg-white" style={{
                marginLeft: `${index * 20}px`
              }}>
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600 shrink-0">
                      {tier}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Tier {tier}</p>
                      {tier === 6 ? <p className="text-green-600 text-sm">End Tier Cycle</p> : <p className="text-gray-600 text-sm">Maand {(tier - 2) * 3} - {(tier - 1) * 3}</p>}
                    </div>
                  </div>)}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>;
}
