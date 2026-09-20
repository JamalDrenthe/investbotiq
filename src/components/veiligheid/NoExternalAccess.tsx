import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
export default function NoExternalAccess() {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.7
  }} className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        <Eye className="w-10 h-10" />
      </div>
      
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Jouw data is nooit te koop</h2>
        <p className="text-lg opacity-90">
          We delen niets met derde partijen. Alles blijft in het Investbotiq-ecosysteem. Geen externe brokers, geen API's naar andere platforms.
        </p>
      </div>
    </motion.div>;
}