import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { Timer, Bot, CircleCheck, TrendingUp } from "lucide-react";
export default function WhyItWorksSection() {
  return <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Waarom werkt dit?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FadeIn delay={0.3} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Timer className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Time Gap Profit</h3>
            <p className="text-gray-700 text-left">Door slim gebruik te maken van tijdskloofprofijt kan het systeem optimaal kapitaal benutten tussen verschillende transactie-structuren.</p>
          </FadeIn>
          
          <FadeIn delay={0.4} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automatisering via IQ Bot</h3>
            <p className="text-gray-700 text-left">De IQ Bot voert het schema foutloos uit en neemt alle optimalisatiebeslissingen zonder enige vorm van menselijke tussenkomst.</p>
          </FadeIn>
          
          <FadeIn delay={0.5} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <CircleCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Tijskloof Structuur</h3>
            <p className="text-gray-700 text-left">Het systeem maakt gebruik van een AI geoptimaliseerde tijdskloof structuren.</p>
          </FadeIn>
          
          <FadeIn delay={0.6} className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Gecontroleerde cashflowgroei</h3>
            <p className="text-gray-700 text-left">Je weet vooraf exact wat je kunt verwachten, er zijn dus geen verrassingen.
De groei is voorspelbaar, meetbaar, zichtbaar en controleerbaar.</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.7}>
          <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-6 text-center">
              Kaspositie, Cashflow, Flowlutas en TimeGap-leningen per maand (TIER 2-6)
            </h3>
            <div className="h-[600px] w-full">
              <img src="/brand/growth-chart.png" alt="Grafiek van Kaspositie, Cashflow, Flowlutas en TimeGap-leningen" className="w-full h-full object-contain" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>;
}