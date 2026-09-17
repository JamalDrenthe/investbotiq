
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PublicHeader from "@/components/PublicHeader";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax effect voor subtiel bewegen van achtergrond
  const yBG = useTransform(scrollY, [0, 400], [0, -70]);

  // Smooth scroll naar info-section
  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div style={{ backgroundPositionY: yBG }} className="min-h-screen w-full overflow-x-hidden bg-[#f7f8fc]">
      <PublicHeader />
      <main className="flex flex-col w-full relative z-10">
        <HeroSection onScrollToInfo={handleScroll} />
        {/* Info block: nu lager, met voldoende witruimte */}
        <div className="flex justify-center px-2 xs:px-4">
          <InfoSection ref={infoRef} />
        </div>
      </main>
      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 bg-[#11152c] py-12 text-center font-medium text-white">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="underline hover:text-pink-200 transition">Algemene Voorwaarden</a>
          <a href="#" className="underline hover:text-pink-200 transition">Privacybeleid</a>
          <a href="#" className="underline hover:text-pink-200 transition">Contact</a>
        </div>
        <div className="mt-4 text-xs text-indigo-200">© {new Date().getFullYear()} Invest Bot IQ</div>
      </footer>
    </motion.div>
  );
}
