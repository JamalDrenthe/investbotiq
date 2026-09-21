
import { motion } from "framer-motion";
import { ThreeScene } from "@/components/three/ThreeScene";
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
            <div className="relative h-64 w-64 overflow-hidden rounded-full bg-canvas shadow-glow sm:h-80 sm:w-80">
              <ThreeScene kind="iq-bot" scale={0.9} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
