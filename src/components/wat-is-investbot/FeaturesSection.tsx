import React from "react";
import { motion } from "framer-motion";
import { Box, Check, Coins, Lock, Shield, Users } from "lucide-react";
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
const features = [{
  title: "Automatisch inkomen opbouwen",
  description: "De IQ Bot bouwt automatisch een maandelijkse cashflow op zonder dat je er omkijken naar hebt.",
  icon: Coins,
  bgColor: "bg-indigo-100",
  iconColor: "text-indigo-600"
}, {
  title: "Geen technische kennis vereist",
  description: "Geen financiële of technische voorkennis nodig. De IQ Bot neemt alle complexiteit voor je weg.",
  icon: Users,
  bgColor: "bg-blue-100",
  iconColor: "text-blue-600"
}, {
  title: "Transparant en voorspelbaar",
  description: "Volledig inzicht in het groeitraject van je cashflow. Je weet vooraf precies wat je kunt verwachten.",
  icon: Check,
  bgColor: "bg-green-100",
  iconColor: "text-green-600"
}, {
  title: "Alles via één account geregeld",
  description: "Eén dashboard voor al je activiteiten. Overzichtelijk en eenvoudig te beheren.",
  icon: Box,
  bgColor: "bg-purple-100",
  iconColor: "text-purple-600"
}];
export default function FeaturesSection() {
  return <section className="py-12 px-4 bg-white/80">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Kernwaarden</h2>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map(feature => <motion.div key={feature.title} variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}