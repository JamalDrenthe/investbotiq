import React from "react";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
export default function MissionSection() {
  return <section className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Flag className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Onze Missie</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">Wij geloven dat iedereen het recht heeft op groei – zonder drempels, zonder afwijzingen, en zonder afhankelijk te zijn van banken of investeerders.</p>
            
            <p className="text-lg text-gray-700 leading-relaxed">Daarom bouwen wij een AI-ecosysteem dat toegang biedt tot cashflow en zekerheid, ongeacht je achtergrond, kennis of startkapitaal.</p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="flex-1 flex justify-center">
            <div className="w-72 h-72 bg-gradient-to-br from-indigo-300 via-purple-200 to-blue-300 rounded-2xl shadow-lg flex items-center justify-center p-8">
              <img alt="Investbotiq Mission" className="max-h-full" src="/brand/investbotiq-icon.png" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}