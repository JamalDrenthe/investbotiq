import React from "react";
import { motion } from "framer-motion";
export default function QuoteSection() {
  return <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center">
          <blockquote className="text-3xl md:text-5xl font-bold text-indigo-600 leading-tight mb-8">"Financiële vrijheid.
Voor iedereen. Altijd."</blockquote>
          <p className="text-lg text-gray-600">Samen coderen we de toekomst!</p>
        </motion.div>
      </div>
    </section>;
}