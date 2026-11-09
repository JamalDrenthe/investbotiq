import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ECOSYSTEM_COMPANIES } from "@/data/ecosystemCompanies";

export const EcosystemTrustBar: React.FC = () => {
  return (
    <section className="relative w-full border-y border-white/[0.08] apple-glass py-5 sm:py-6 overflow-hidden z-20 transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        {/* Subtle, modest header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#2997ff] shadow-[0_0_8px_rgba(41,151,255,0.8)]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Geverifieerd netwerk van 12 ecosysteem partners & ventures
            </span>
          </div>

          <a
            href="#ecosysteem-architectuur"
            className="inline-flex items-center gap-1.5 text-xs text-[#2997ff] hover:text-[#0071e3] transition-colors w-fit font-medium group active:scale-[0.98]"
          >
            <span>Bekijk architectuur</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Bescheiden, strakke logo strip met Apple Pro haptics */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-2 sm:gap-2.5 items-center">
          {ECOSYSTEM_COMPANIES.map((company) => (
            <a
              key={company.id}
              href="#ecosysteem-architectuur"
              title={`${company.name} — ${company.badge}`}
              className="group relative flex flex-col items-center justify-center py-2 px-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200 active:scale-[0.95]"
            >
              <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center p-0.5 overflow-hidden">
                <img
                  src={company.logoSrc}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain filter drop-shadow opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-250"
                  loading="lazy"
                />
              </div>
              <span className="mt-1 text-[10px] font-medium text-ink-muted group-hover:text-ink truncate max-w-full text-center tracking-tight">
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
