
import React, { useState } from "react";
import TierDescription from "./TierDescription";
import TierSelector from "./TierSelector";
import TierTable from "./TierTable";
import TierMobileCards from "./TierMobileCards";
import { FadeIn } from "../info/FadeInAnimation";

export default function TierTableSection() {
  const [selectedTier, setSelectedTier] = useState<string>("inbotiq2");

  return (
    <section className="py-20 px-6 lg:px-10">
      <div className="mx-auto max-w-content">
        <TierDescription />
        <TierSelector 
          selectedTier={selectedTier} 
          onTierChange={setSelectedTier} 
        />
        
        {selectedTier === "inbotiq2" && (
          <FadeIn delay={0.1}>
            <TierTable />
            <TierMobileCards />
          </FadeIn>
        )}

        {selectedTier === "inbotiq1" && (
          <FadeIn delay={0.1}>
            <div className="card-paper p-8 text-center shadow-level-1 max-w-xl mx-auto">
              <h3 className="font-display text-lg font-semibold text-graphite mb-2">
                InBotIQ1 Tier 1 – In Ontwikkeling
              </h3>
              <p className="text-sm leading-relaxed text-graphite-muted">
                We leggen momenteel de laatste hand aan het InBotIQ1 entry-level protocol.
                Zodra de auditcyclus is afgerond, wordt deze Tier automatisch ontgrendeld in het Member Dashboard.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
