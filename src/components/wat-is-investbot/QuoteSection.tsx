import React from "react";
import { motion } from "framer-motion";
export default function QuoteSection() {
  return <section className="py-16 px-4">
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
          <blockquote className="text-2xl md:text-4xl font-bold text-indigo-900 italic leading-relaxed">"Geen hoofdpijn.
De IQ BOT regelt het!"</blockquote>
        </motion.div>
      </div>
    </section>;
}