import React from "react";
import { Send, Video, KeyRound, Rocket } from "lucide-react";
import { SOLLICITATIE_STAPPEN } from "@/data/careersData";

const stepIcons = [Send, Video, KeyRound, Rocket];

export const ApplicationProcedure: React.FC = () => {
  return (
    <section className="py-12 md:py-16 border-b border-white/10">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/20 mb-3">
            Transparant Proces
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Hoe verloopt het sollicitatieproces?
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Een snel, efficiënt en professioneel 4-stappen proces zonder onnodige bureaucratie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOLLICITATIE_STAPPEN.map((step, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-cyan-400/80">
                      {step.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
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
