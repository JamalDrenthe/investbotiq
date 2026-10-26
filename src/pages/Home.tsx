import React, { useRef } from "react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import EcosystemTrustBar from "@/components/home/EcosystemTrustBar";
import EcosystemSection from "@/components/home/EcosystemSection";

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="band-canvas min-h-screen w-full overflow-x-hidden">
      <PublicHeader />
      <main className="relative flex w-full flex-col">
        <HeroSection onScrollToInfo={handleScroll} />
        <EcosystemTrustBar />
        <InfoSection ref={infoRef} />
        <EcosystemSection />
      </main>
      <PublicFooter />
    </div>
  );
}
