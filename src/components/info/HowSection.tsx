import React from "react";
import { FadeIn } from "./FadeInAnimation";
import { ThreeScene } from "@/components/three/ThreeScene";

const STEPS = ["Aanmelden", "Activeer de Bot", "Groei elke maand automatisch"];

export default function HowSection() {
  return (
    <div className="relative isolate overflow-hidden hairline-top">
      <div className="relative mx-auto grid w-full max-w-content gap-12 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="lg:col-span-5">
          <FadeIn delay={0.05}>
            <div className="eyebrow mb-6">Hoe</div>
            <h3 id="hoe-werkt-het" className="font-display text-display-md font-semibold tracking-[-0.03em] text-ink">
              Hoe werkt het?
            </h3>
          </FadeIn>
          <ol className="mt-12 flex flex-col">
            {STEPS.map((step, i) => (
              <FadeIn key={step} delay={0.12 + i * 0.08}>
                <li className="group flex items-start gap-5 border-t border-canvas-hairline py-6 last:border-b">
                  <span className="tnum font-display text-sm font-semibold text-cyan">0{i + 1}</span>
                  <span className="font-display text-2xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-gradient-light">
                    {step}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
        <FadeIn delay={0.2} className="lg:col-span-7">
          <div className="card-glass card-glass--floating relative h-[320px] overflow-hidden sm:h-[400px] lg:h-[460px]">
            {/* threeui PredictiveArcCanvas — dot arc that reads as compounding growth */}
            <ThreeScene
              kind="predictive-arc"
              mode="dark"
              speed={0.8}
              spacing={5}
              dotSize={5}
              archHeight={0.72}
              thickness={1.1}
              brightness={1.1}
              hue={-10}
              saturation={1.1}
              className="!absolute !inset-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-canvas-elevated via-canvas-elevated/60 to-transparent p-6">
              <div>
                <div className="eyebrow">Cashflow</div>
                <div className="tnum mt-2 font-display text-3xl font-semibold text-ink">Groei elke maand automatisch</div>
              </div>
              <span className="chip chip--mint">Actief</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
