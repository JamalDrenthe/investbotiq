import React from "react";
import { Bot, Brain, Eye, Layers, TrendingUp } from "lucide-react";
import { FadeIn } from "./FadeInAnimation";
import { ThreeScene } from "@/components/three/ThreeScene";

const REASONS = [
  { icon: TrendingUp, text: "Automatische groei" },
  { icon: Brain, text: "Geen technische kennis nodig" },
  { icon: Eye, text: "Transparante maandelijkse opbouw" },
  { icon: Layers, text: "Gestructureerde opbouw" },
  { icon: Bot, text: "Geen externe tussenpartijen: alles in eigen beheer via de IQ Bot" },
];

export default function WhySection() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* threeui DotMatrixBackground — shader dot field with pointer parallax */}
      <ThreeScene
        kind="dot-matrix"
        className="!absolute !inset-0"
        speed={0.7}
        gridScale={54}
        mouseAmount={0.06}
        pulseSpeed={0.35}
        radius={0.14}
        opacity={0.45}
        hue={-20}
      />
      <div aria-hidden="true" className="scene-veil scene-veil--why" />
      <div className="relative mx-auto w-full max-w-content px-6 py-24 md:py-32 lg:px-10">
        <FadeIn delay={0.05} className="max-w-2xl">
          <div className="eyebrow mb-6">Waarom</div>
          <h3 id="waarom-investbotiq" className="font-display text-display-md font-semibold tracking-[-0.03em] text-ink">
            Waarom Investbotiq?
          </h3>
        </FadeIn>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <FadeIn
              key={reason.text}
              delay={0.1 + i * 0.06}
              className={i === REASONS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="card-glass group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="icon-tile">
                  <reason.icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-lg font-medium leading-7 text-ink">{reason.text}</p>
                <div className="mt-6 h-px w-10 bg-gradient-to-r from-indigo to-cyan opacity-70 transition-all duration-300 group-hover:w-20" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
