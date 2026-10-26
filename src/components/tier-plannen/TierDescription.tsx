
import React from "react";
import { FadeIn } from "../info/FadeInAnimation";

export default function TierDescription() {
  return (
    <FadeIn delay={0.2} className="text-center mb-10">
      <div className="eyebrow eyebrow--paper mb-3">Cycli & Rendement</div>
      <h2 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">
        Allocatieoverzicht per Tier
      </h2>
      <p className="mt-3 text-base text-graphite-muted max-w-xl mx-auto">
        Bekijk per Tier de specifieke cyclusduur, actieve Flowlutas en de opgebouwde maandelijkse kasstroom.
      </p>
    </FadeIn>
  );
}
