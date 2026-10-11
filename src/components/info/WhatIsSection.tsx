import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            to="/alles-over-investbot/wat-is-het"
            className="inline-flex items-center gap-2 text-base font-semibold text-indigo hover:underline"
          >
            Lees meer over de IQ Bot <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/tier-plannen"
            className="inline-flex items-center gap-1.5 text-base font-medium text-graphite-muted hover:text-graphite hover:underline"
          >
            Bekijk Tier Plannen →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
