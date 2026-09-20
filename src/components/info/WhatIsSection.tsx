import React from "react";
import { FadeIn } from "./FadeInAnimation";

export default function WhatIsSection() {
  return (
    <div className="mx-auto grid w-full max-w-content gap-10 px-6 py-24 md:grid-cols-12 md:py-32 lg:px-10">
      <FadeIn delay={0.05} className="md:col-span-5">
        <div className="eyebrow eyebrow--paper mb-6">Investbotiq</div>
        <h2 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">
          Wat is Investbotiq?
        </h2>
      </FadeIn>
      <FadeIn delay={0.15} className="md:col-span-6 md:col-start-7">
        <p className="text-xl leading-9 text-graphite-muted">
          Investbotiq is een platform dat automatisch cashflow voor jou genereert met behulp van de IQ Bot. Geen lastige
          investeringskeuzes, geen technische kennis vereist!
        </p>
      </FadeIn>
    </div>
  );
}
