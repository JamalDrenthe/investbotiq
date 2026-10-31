import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { ECOSYSTEM_COMPANIES, EcosystemCompany } from "@/data/ecosystemCompanies";
import { LumenCtaLink } from "@/components/three/LumenCta";

export const EcosystemSection: React.FC = () => {
  return (
    <section id="ecosysteem-partners" className="relative w-full py-20 md:py-28 border-b border-canvas-hairline bg-canvas transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3.5 py-1 text-xs font-mono text-cyan border border-cyan/20 mb-3.5">
              <Sparkles className="h-3.5 w-3.5" />
              12 Ecosysteem Bedrijven & IQ Agent Koppelingen
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-display-md font-display font-semibold tracking-[-0.03em] text-ink">
              Gedreven door een netwerk van 12 gespecialiseerde ondernemingen
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted font-light leading-relaxed">
              De IQ Bot opereert niet solitair. Hij fungeert als centrale intelligente motor die autonoom data, liquiditeit en cashflows synchroniseert uit ons complete netwerk van vastgoed, AI, software, relocatie en pre-IPO kapitaalstructuren.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              to="/alles-over-investbot/wat-is-het"
              className="inline-flex items-center gap-2 rounded-full border border-canvas-hairline bg-canvas-elevated px-5 py-2.5 text-xs font-mono text-ink-muted hover:text-ink hover:bg-canvas-panel transition shadow-sm"
            >
              <span>Wat is IQ Bot & Agent?</span>
              <ArrowRight className="h-3.5 w-3.5 text-cyan" />
            </Link>
          </div>
        </div>

        {/* 12 Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {ECOSYSTEM_COMPANIES.map((company) => (
            <div
              key={company.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-canvas-hairline bg-canvas-panel/60 hover:bg-canvas-panel hover:border-cyan/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Logo and Badge Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-canvas-elevated border border-canvas-hairline p-1.5 shadow-sm group-hover:scale-110 transition-transform ${company.borderColor}`}
                  >
                    <img
                      src={company.logoSrc}
                      alt={`${company.name} logo`}
                      className="h-full w-full object-contain filter drop-shadow"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-[10px] font-mono text-ink-muted uppercase px-2.5 py-1 rounded-md bg-canvas-elevated border border-canvas-hairline">
                    {company.badge}
                  </span>
                </div>

                {/* Company Title & Info */}
                <div>
                  <h3 className="text-lg font-bold font-display text-ink group-hover:text-cyan transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs text-cyan font-mono mt-0.5">
                    {company.tagline}
                  </p>
                  <p className="text-xs text-ink-muted mt-2.5 line-clamp-3 leading-relaxed font-light">
                    {company.description}
                  </p>
                </div>
              </div>

              {/* Status and Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-canvas-hairline/60 flex items-center justify-between text-xs">
                <span className="text-ink-faint font-mono text-[11px] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                  <span className="text-mint font-medium">IQ Agent Live</span>
                </span>

                <Link
                  to="/member/ai-running"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-ink-muted hover:text-ink transition group-hover:text-cyan"
                >
                  <span>Protocol</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl border border-canvas-hairline bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-canvas-elevated p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan/15 border border-cyan/30 text-cyan">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-display text-ink">
                Wil je de IQ Bot acties per bedrijf in realtime zien draaien?
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                Op de IQ Bot & IQ Agent pagina kun je voor elk van de 12 bedrijven interactieve video's en protocol animaties starten.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <LumenCtaLink to="/member/ai-running" size="sm" dot className="w-full sm:w-auto text-center">
              Open IQ Bot Console
            </LumenCtaLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
