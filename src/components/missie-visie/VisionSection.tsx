
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Globe } from "lucide-react";

export default function VisionSection() {
  return (
    <section className="py-16 px-4 bg-white/80 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Onze Visie</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Een wereld waarin miljoenen mensen via onze bots automatisch vermogen opbouwen en financiële vrijheid bereiken – veilig, transparant en schaalbaar.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              We zien een toekomst waarin AI de deur opent naar financiële zelfstandigheid voor iedereen, ongeacht startpositie of voorkennis.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-300 shadow-lg flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-white/25 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                <Globe className="h-20 w-20 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
