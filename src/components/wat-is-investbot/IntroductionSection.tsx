
import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
export default function IntroductionSection() {
  return <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Jouw persoonlijke CashFlow Intelligence</h2>
            <p className="text-lg text-gray-700 mb-6">CashFlow Intelligence is jouw persoonlijke Invest Agent. Wij zijn er om je de toegang te geven tot deze krachtige tool!
Ontvang maandelijkse cashflow via ons unieke Tier-systeem.
Vandaag nog weg met al die moeilijke investeringskeuzes! CashFlow Intelligence regelt het voor je.</p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="flex-1 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400 via-purple-300 to-blue-300 shadow-lg flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-white/25 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                <Bot className="h-20 w-20 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
