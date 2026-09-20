import React from "react";
import { motion } from "framer-motion";
import { LumenCtaLink } from "@/components/three/LumenCta";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { CalendarDays, CircleCheck, CircleUser, Bot, TrendingUp, Briefcase, Lightbulb, LineChart } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
export default function HoeWerktHet() {
  return <InfoPageLayout
      eyebrow="Hoe werkt het"
      title="Hoe werkt Investbot IQ?"
      subtitle="Eenvoudig, transparant en volledig geautomatiseerd."
    >
      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            In 3 eenvoudige stappen
          </h2>
          
          <div className="flex flex-col gap-16">
            {/* Step 1 */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shrink-0">
                1
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <CircleUser className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-xl md:text-2xl font-semibold">Aanmelden</h3>
                </div>
                <p className="text-lg text-gray-700">Je registreert eenvoudig met je e-mail en basisgegevens. Volg de aanmeld procedure vanaf daar!</p>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 shrink-0">
                2
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-semibold">Activeer de Bot</h3>
                </div>
                <p className="text-lg text-gray-700">De IQ Bot neemt het vanaf hier over en zet alle nodige stappen in gang.</p>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600 shrink-0">
                3
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl md:text-2xl font-semibold">Groei automatisch per maand</h3>
                </div>
                <p className="text-lg text-gray-700">Elke 3 maanden wordt je cashflow geüpdatet. Je ziet de groei rechtstreeks in je dashboard.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 px-4 bg-white/80">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Je groeitraject
          </h2>
          
          <div className="relative flex justify-center mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -translate-y-1/2"></div>
            <div className="flex justify-between relative z-10 w-full max-w-4xl px-4">
              {['Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6'].map((tier, index) => <motion.div key={tier} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.1 * index
            }} className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500 z-10"></div>
                  <div className="text-sm sm:text-base font-medium mt-2">{tier}</div>
                </motion.div>)}
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-16">Elke tier brengt je drie maanden verder in je reis naar financiële groei</p>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Voordelen
          </h2>
          
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{
          once: true
        }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/10 text-indigo"><Briefcase className="h-5 w-5" /></span>
              <h3 className="text-xl font-semibold mb-3">Geen minimale investering vereist</h3>
              <p className="text-gray-600">Begin gratis. Het systeem bouwt geleidelijk op.</p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/10 text-indigo"><Lightbulb className="h-5 w-5" /></span>
              <h3 className="text-xl font-semibold mb-3">Automatische opbouw via de IQ Bot</h3>
              <p className="text-gray-600">Geen handmatige stappen of ingewikkelde beslissingen. De IQ Bot regelt alles voor je.</p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/10 text-indigo"><LineChart className="h-5 w-5" /></span>
              <h3 className="text-xl font-semibold mb-3">Maandelijkse cashflow die groeit</h3>
              <p className="text-gray-600">Zie je cashflow elke drie maanden groeien.</p>
            </motion.div>
            
            {/* Benefit 4 */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/10 text-indigo"><Bot className="h-5 w-5" /></span>
              <h3 className="text-xl font-semibold mb-3">Persoonlijk IQ Bot Algoritme</h3>
              <p className="text-gray-600">Direct en efficiënt.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Klaar om je eigen groeitraject te starten?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LumenCtaLink to="/tier-plannen" dot>Bekijk jouw route</LumenCtaLink>
            <LumenCtaLink to="/member/dashboard" variant="paper">Ga naar Member Dashboard</LumenCtaLink>
          </div>
        </div>
      </section>
      
    </InfoPageLayout>;
}
