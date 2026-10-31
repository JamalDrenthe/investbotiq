import React from "react";
import { Send, Video, KeyRound, Rocket } from "lucide-react";
import { SOLLICITATIE_STAPPEN } from "@/data/careersData";

const stepIcons = [Send, Video, KeyRound, Rocket];

export const ApplicationProcedure: React.FC = () => {
  return (
    <section className="py-12 md:py-16 border-b border-canvas-hairline transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3.5 py-1 text-xs font-mono text-cyan border border-cyan/25 mb-3">
            Transparant Proces
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
            Hoe verloopt het sollicitatieproces?
          </h2>
          <p className="text-sm text-ink-muted mt-2">
            Een snel, efficiënt en professioneel 4-stappen proces zonder onnodige bureaucratie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOLLICITATIE_STAPPEN.map((step, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between p-6 rounded-2xl border border-canvas-hairline bg-canvas-panel/60 hover:bg-canvas-panel hover:border-cyan/40 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-cyan">
                      {step.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas-elevated border border-canvas-hairline text-cyan">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-ink font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-canvas-hairline/60 flex items-center gap-1.5 text-[11px] font-mono text-ink-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span>Stap {idx + 1} van 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcedure;
