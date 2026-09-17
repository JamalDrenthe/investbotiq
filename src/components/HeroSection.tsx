import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrbCanvas from "@/components/Shared/OrbCanvas";
function OrbVisual() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.62 }}
      animate={{ scale: [0.95, 1.12, 0.96, 1], opacity: [0.62, 1, 0.67, 1] }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.2, ease: "easeInOut" }}
      className="relative z-10 flex items-center justify-center"
      style={{ minHeight: 120 }}
    >
      <OrbCanvas />
    </motion.div>
  );
}
type Props = {
  onScrollToInfo: () => void;
};
const HeroSection: React.FC<Props> = ({
  onScrollToInfo
}) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  function FadeIn({
    children,
    delay = 0,
    className = ""
  }) {
    return <motion.div initial={{
      opacity: 0,
      y: 42
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      amount: 0.7
    }} transition={{
      duration: 0.95,
      delay
    }} className={className}>
        {children}
      </motion.div>;
  }
  return <section className="relative z-10 w-full flex flex-col md:flex-row min-h-[81vh] md:min-h-[70vh] lg:min-h-[72vh] pt-24 md:pt-32 bg-transparent">
      <div className="flex-1 flex flex-col items-center md:items-start justify-center px-5 sm:px-10 lg:pl-20">
        <FadeIn delay={0.05}>
          <h1 className="text-4xl xs:text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-snug md:leading-tight drop-shadow-sm text-center md:text-left text-balance max-w-2xl">
            Laat de <span className="text-indigo-500">IQ Bot</span> automatisch jouw cashflow opbouwen
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-9 text-lg xs:text-xl md:text-xl text-gray-700 max-w-xl text-center md:text-left">
            Geen kennis vereist, geen zorgen. Gewoon laten groeien.
          </p>
        </FadeIn>
        <div className="flex flex-col md:flex-row items-center gap-5 mt-2 mb-7 w-full md:w-auto">
          <FadeIn delay={0.22}>
            <Button asChild className="w-72 max-w-full md:w-56 text-lg py-6 px-6 font-semibold shadow-lg bg-indigo-500 hover:bg-indigo-600/90 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 rounded-xl">
              <Link to="/auth">🔵 Inloggen</Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.32}>
            <Button variant="outline" className="w-72 max-w-full md:w-56 text-lg py-6 px-6 font-semibold border bg-white text-indigo-700 shadow-lg border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 rounded-xl" onClick={onScrollToInfo}>
              ⚪ Bekijk hoe het werkt
            </Button>
          </FadeIn>
          <FadeIn delay={0.42}>
            <Button variant="outline" className="w-72 max-w-full md:w-56 text-lg py-6 px-6 font-semibold border bg-white/80 backdrop-blur-sm text-indigo-600 shadow-lg border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 rounded-xl" onClick={() => setShowDemoModal(true)}>
              🎥 Bekijk demo
            </Button>
          </FadeIn>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center relative mt-10 md:mt-0">
        <FadeIn delay={0.23}>
          <OrbVisual />
        </FadeIn>
        <FadeIn delay={0.34}>
          <div className="mt-8 md:mt-14 text-indigo-800 font-semibold text-lg sm:text-xl text-center max-w-xs mx-auto">IQ Bot 
The Next Gen 
AI Agent</div>
        </FadeIn>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Bekijk hoe InvestbotIQ werkt</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1uMoBy76oQs"
              title="InvestbotIQ Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: '0.75rem', width: '100%', height: '100%' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default HeroSection;