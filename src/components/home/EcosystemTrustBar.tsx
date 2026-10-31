import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { ECOSYSTEM_COMPANIES } from "@/data/ecosystemCompanies";

export const EcosystemTrustBar: React.FC = () => {
  return (
    <section className="relative w-full border-y border-canvas-hairline bg-canvas-elevated/70 backdrop-blur-xl py-8 overflow-hidden z-20 transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
              Verbonden met 12 Ecosysteem Partners & Ventures
            </span>
          </div>

          <a
            href="#ecosysteem-partners"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan hover:opacity-80 transition-opacity w-fit"
          >
            <span>Bekijk alle 12 bedrijven</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Logo Grid / Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2.5 sm:gap-3.5 items-center">
          {ECOSYSTEM_COMPANIES.map((company) => (
            <a
              key={company.id}
              href="#ecosysteem-partners"
              title={`${company.name} — ${company.badge}`}
              className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl border border-canvas-hairline bg-canvas-panel/50 hover:bg-canvas-panel hover:border-cyan/40 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center p-1 overflow-hidden">
                <img
                  src={company.logoSrc}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain filter drop-shadow opacity-85 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <span className="mt-1.5 text-[10px] font-mono font-medium text-ink-muted group-hover:text-ink truncate max-w-full text-center">
                {company.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemTrustBar;
