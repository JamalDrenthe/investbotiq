
import React from "react";
import { LumenCtaLink } from "@/components/three/LumenCta";

export default function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Wil je meer weten?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LumenCtaLink to="/tier-plannen" dot>Lees meer over onze Tier Strategie</LumenCtaLink>
          <LumenCtaLink to="/veiligheid" variant="paper">Bekijk onze Veiligheidsaanpak</LumenCtaLink>
        </div>
      </div>
    </section>
  );
}
