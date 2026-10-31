import React from "react";
import {
  Wallet,
  Calendar,
  Globe,
  Laptop,
  Armchair,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import { ARBEIDSVOORWAARDEN } from "@/data/careersData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  Calendar,
  Globe,
  Laptop,
  Armchair,
  GraduationCap,
  Sparkles,
  Award,
};

export const CareersConditions: React.FC = () => {
  return (
    <section className="py-12 md:py-16 border-b border-canvas-hairline transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo/10 px-3.5 py-1 text-xs font-mono text-indigo border border-indigo/20 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo" />
              Uniforme Standaard
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
              Arbeidsvoorwaarden
            </h2>
            <p className="text-sm text-ink-muted mt-2 max-w-xl">
              Deze voorwaarden gelden uniform voor alle 13 functies, ongeacht of je start op basis van ZZP/freelance of een vast contract.
            </p>
          </div>
          <div className="text-xs font-mono text-ink-muted bg-canvas-panel border border-canvas-hairline px-4 py-2.5 rounded-xl w-fit">
            HBO/WO niveau · 100% Remote · Thuiswerkbudget
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARBEIDSVOORWAARDEN.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-canvas-hairline bg-canvas-panel/60 hover:bg-canvas-panel hover:border-cyan/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas-elevated border border-canvas-hairline text-cyan group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-ink-faint">#{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-base font-semibold text-ink mt-4 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareersConditions;
