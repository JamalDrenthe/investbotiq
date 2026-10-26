import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { ECOSYSTEM_COMPANIES } from "@/data/ecosystemCompanies";

export const EcosystemTrustBar: React.FC = () => {
  return (
    <section className="relative w-full border-y border-white/10 bg-black/40 backdrop-blur-md py-8 overflow-hidden z-20">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Verbonden met 12 Ecosysteem Partners & Ventures
            </span>
          </div>

          <a
            href="#ecosysteem-partners"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors w-fit"
          >
            <span>Bekijk alle 12 bedrijven</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Logo Grid / Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          {ECOSYSTEM_COMPANIES.map((company) => (
            <a
              key={company.id}
              href="#ecosysteem-partners"
              title={`${company.name} — ${company.badge}`}
              className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center p-1 overflow-hidden">
                <img
                  src={company.logoSrc}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain filter drop-shadow opacity-85 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <span className="mt-1.5 text-[10px] font-mono font-medium text-zinc-400 group-hover:text-white truncate max-w-full text-center">
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
