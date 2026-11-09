import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, ShieldCheck, Cpu, Database, Activity, ArrowUpRight, Zap, Play } from "lucide-react";
import { ECOSYSTEM_COMPANIES } from "@/data/ecosystemCompanies";
import { LumenCtaLink } from "@/components/three/LumenCta";

export const EcosystemSection: React.FC = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("vvc");
  const selectedCompany = ECOSYSTEM_COMPANIES.find((c) => c.id === selectedCompanyId) || ECOSYSTEM_COMPANIES[0];

  return (
    <section id="ecosysteem-architectuur" className="relative w-full py-20 md:py-28 border-b border-white/[0.08] bg-black transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        {/* Subtle, premium Apple header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.12] px-3.5 py-1 text-xs text-[#2997ff] font-medium mb-4 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            <span>Autonome Systeemarchitectuur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md font-display font-semibold tracking-[-0.035em] text-white">
            Eén intelligente motor. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b] bg-clip-text text-transparent">
              Ondersteund door een gediversifieerd netwerk.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#86868b] font-normal leading-relaxed">
            De IQ Bot fungeert als het centrale brein van InvestBotIQ. Hij synchroniseert autonoom cashflows, datastromen en liquiditeit over onze holdingstructuur — discreet, veilig en zonder menselijke vertraging.
          </p>
        </div>

        {/* Apple Pro Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Bento Card 1: Autonome IQ Bot Liquiditeits-Engine (7 Cols) */}
          <div className="lg:col-span-7 apple-glass-card p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#2997ff]">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">IQ Bot Autonome Engine</h3>
                    <p className="text-xs text-[#86868b]">Realtime yield & cashflow routing</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#30d158]/10 text-[#30d158] border border-[#30d158]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] animate-pulse" />
                  99.98% Live
                </span>
              </div>

              <p className="text-sm text-[#86868b] leading-relaxed max-w-xl">
                Continu analyserende parameters alloceren liquiditeit over vastgoed, AI compute en zakelijke kasstromen. Geen emoties, geen handmatige transacties — pure wiskundige executie.
              </p>

              {/* Realtime Metrics Chips */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-xs text-[#86868b]">Latency</div>
                  <div className="text-lg sm:text-xl font-semibold text-white font-mono mt-0.5">0.18ms</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-xs text-[#86868b]">Uptime</div>
                  <div className="text-lg sm:text-xl font-semibold text-white font-mono mt-0.5">99.98%</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-xs text-[#86868b]">Routing</div>
                  <div className="text-lg sm:text-xl font-semibold text-white font-mono mt-0.5">100% Autonoom</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-[#86868b]">Direct te activeren voor geaccrediteerde leden</span>
              <Link
                to="/alles-over-investbot/hoe-werkt-het"
                className="inline-flex items-center gap-1.5 text-xs text-[#2997ff] hover:text-white transition-colors font-medium active:scale-[0.97]"
              >
                <span>Hoe de IQ Bot werkt</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Bi-directionele CRMos Cloud Synchronisatie (5 Cols) */}
          <div className="lg:col-span-5 apple-glass-card p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.12] text-[#2997ff]">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">CRMos Cloud API</h3>
                    <p className="text-xs text-[#86868b]">Bi-directionele data exchange</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.06] text-white/80 border border-white/10">
                  v1 REST
                </span>
              </div>

              <p className="text-sm text-[#86868b] leading-relaxed mb-6">
                Volledige realtime synchronisatie van aanmeldingen, profielen en vacature-sollicitaties met CRMos via beveiligde token-authenticatie en automatische deduplicatie.
              </p>

              <div className="space-y-2 font-mono text-[11px] p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] text-[#86868b]">
                <div className="flex items-center justify-between">
                  <span className="text-[#2997ff]">POST /api/v1/contacts/upsert</span>
                  <span className="text-[#30d158]">200 OK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Bearer Token Auth</span>
                  <span className="text-white/60">Geverifieerd</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Bi-directionele Webhooks</span>
                  <span className="text-[#2997ff]">Actief</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-[#86868b]">Geautomatiseerde holding-infrastructuur</span>
              <span className="text-xs text-[#30d158] font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
                Verbonden
              </span>
            </div>
          </div>

          {/* Bento Card 3: Bescheiden Ecosysteem Navigator (12 Cols) */}
          <div className="lg:col-span-12 apple-glass-card p-6 sm:p-8 rounded-[2rem] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Geïntegreerde Ondernemingen (12)
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
                  Bescheiden overzicht van holdings en entiteiten waarin de IQ Bot en IQ Agent actief zijn.
                </p>
              </div>

              <Link
                to="/member/ai-running"
                className="apple-btn-secondary px-4 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5 w-fit active:scale-[0.97]"
              >
                <span>IQ Bot & IQ Agent Console openen</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#2997ff]" />
              </Link>
            </div>

            {/* Compacte, elegante VisionOS tegelstrip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ECOSYSTEM_COMPANIES.map((company) => {
                const isSelected = company.id === selectedCompanyId;
                return (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => setSelectedCompanyId(company.id)}
                    className={`group text-left p-3 rounded-2xl border transition-all duration-200 active:scale-[0.96] flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-white/[0.1] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.14]"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] p-1 overflow-hidden">
                      <img
                        src={company.logoSrc}
                        alt={`${company.name} logo`}
                        className="h-full w-full object-contain filter drop-shadow opacity-85 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-white truncate tracking-tight">{company.name}</div>
                      <div className="text-[10px] text-[#86868b] truncate">{company.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bescheiden preview strip voor het geselecteerde bedrijf */}
            <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-[#30d158]" />
                <span className="text-xs font-semibold text-white">{selectedCompany.name}</span>
                <span className="text-xs text-[#86868b] hidden sm:inline">·</span>
                <span className="text-xs text-[#86868b] line-clamp-1">{selectedCompany.description}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-[#2997ff]">{selectedCompany.tagline}</span>
                <Link
                  to="/member/ai-running"
                  className="inline-flex items-center gap-1 text-xs text-white hover:text-[#2997ff] transition-colors font-medium active:scale-[0.97]"
                >
                  <span>Protocol</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Institutionele Encryptie & Beveiliging (6 Cols) */}
          <div className="lg:col-span-6 apple-glass-card p-6 sm:p-7 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#30d158]/15 border border-[#30d158]/30 text-[#30d158]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Institutionele Beveiliging</h4>
                  <p className="text-xs text-[#86868b]">Zero-trust cloud architectuur</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Elk account, elke API-aanroep en elke cashflow-transactie is beveiligd met end-to-end AES-256 encryptie en multi-signature authenticatieprotocollen.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
              <span>Audit-gevalideerd</span>
              <span className="text-[#30d158] font-mono">SOC2 / ISO Compliant</span>
            </div>
          </div>

          {/* Bento Card 5: 24/7 Autonoom Yield Management (6 Cols) */}
          <div className="lg:col-span-6 apple-glass-card p-6 sm:p-7 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Continue Cashflow Expansie</h4>
                  <p className="text-xs text-[#86868b]">Autonome periodieke herallocatie</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                De IQ Bot slaapt nooit. Zodra cashflow binnenkomt in de Tier pools, wordt deze direct geëvalueerd en herverdeeld volgens vooraf vastgestelde rendementseisen.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
              <span>Geen handmatige interventie nodig</span>
              <span className="text-white font-mono">100% geautomatiseerd</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 rounded-[2rem] border border-white/[0.12] apple-glass p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#2997ff]">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Klaar om de IQ Bot te activeren?</h3>
              <p className="text-xs sm:text-sm text-[#86868b]">Start direct met jouw geautomatiseerde maandelijkse cashflow.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/register"
              className="apple-btn-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white text-center w-full sm:w-auto active:scale-[0.97]"
            >
              Direct Aanmelden
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
