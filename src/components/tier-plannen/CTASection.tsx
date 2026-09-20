import React from "react";
import { LumenCtaLink } from "@/components/three/LumenCta";

export default function CTASection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-graphite md:text-4xl">
          Klaar voor jouw cashflowgroei?
        </h2>
        <LumenCtaLink to="/auth" dot>
          Start nu met Investbotiq
        </LumenCtaLink>
      </div>
    </section>
  );
}
