import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, ShieldCheck, Cpu, Activity, Zap, LockKeyhole } from "lucide-react";

export const IQHighlightsSection: React.FC = () => {
  return (
    <section id="technologie" className="relative w-full py-20 md:py-28 border-b border-canvas-hairline bg-canvas transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        {/* Apple Pro Header — 100% InvestBotIQ focus */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-canvas-elevated border border-canvas-hairline px-3.5 py-1 text-xs text-[#2997ff] font-medium mb-4 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            <span>Autonome Systeemarchitectuur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md font-display font-semibold tracking-[-0.035em] text-ink">
            Geavanceerde technologie. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-ink via-ink to-ink-muted bg-clip-text text-transparent">
              Één intelligente cashflow motor.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-muted font-normal leading-relaxed">
            De IQ Bot fungeert als het centrale brein van InvestBotIQ. Hij synchroniseert autonoom rendement, liquiditeit en transactiestromen — veilig, schaalbaar en zonder menselijke emoties of vertraging.
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
                    <h3 className="text-lg font-semibold text-ink tracking-tight">IQ Bot Autonome Engine</h3>
                    <p className="text-xs text-ink-muted">Realtime yield & cashflow routing</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#30d158]/10 text-[#30d158] border border-[#30d158]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] animate-pulse" />
                  99.98% Live
                </span>
              </div>

              <p className="text-sm text-ink-muted leading-relaxed max-w-xl">
                Continu analyserende neurale algoritmes alloceren liquiditeit over vastgestelde Tier pools. Geen emoties, geen handmatige keuzes — pure wiskundige precisie en consistente cashflow-generatie.
              </p>

              {/* Realtime Metrics Chips */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-2xl bg-canvas-elevated/70 border border-canvas-hairline">
                  <div className="text-xs text-ink-muted">Latency</div>
                  <div className="text-lg sm:text-xl font-semibold text-ink font-mono mt-0.5">0.18ms</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-elevated/70 border border-canvas-hairline">
                  <div className="text-xs text-ink-muted">Uptime</div>
                  <div className="text-lg sm:text-xl font-semibold text-ink font-mono mt-0.5">99.98%</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-canvas-elevated/70 border border-canvas-hairline">
                  <div className="text-xs text-ink-muted">Routing</div>
                  <div className="text-lg sm:text-xl font-semibold text-ink font-mono mt-0.5">100% Autonoom</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-canvas-hairline flex items-center justify-between">
              <span className="text-xs text-ink-muted">Direct actief voor geregistreerde leden</span>
              <Link
                to="/alles-over-investbot/hoe-werkt-het"
                className="inline-flex items-center gap-1.5 text-xs text-[#2997ff] hover:text-ink transition-colors font-medium active:scale-[0.97]"
              >
                <span>Hoe de IQ Bot werkt</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Predictive Neurale Modellen (5 Cols) */}
          <div className="lg:col-span-5 apple-glass-card p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas-elevated border border-canvas-hairline text-[#2997ff]">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink tracking-tight">Predictive Analytics</h3>
                    <p className="text-xs text-ink-muted">Wiskundige risico-modellen</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-canvas-elevated text-ink-muted border border-canvas-hairline">
                  AI Neuraal
                </span>
              </div>

              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                De intelligentie scant continu marktcycli, inflatiecorrelaties en historische patronen om drawdown te minimaliseren en maandelijkse cashflows te borgen.
              </p>

              <div className="space-y-2 font-mono text-[11px] p-3.5 rounded-2xl bg-canvas-panel/80 border border-canvas-hairline text-ink-muted">
                <div className="flex items-center justify-between">
                  <span className="text-[#2997ff]">Risicospreiding</span>
                  <span className="text-[#30d158]">Optimaal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink">Drawdown Shield</span>
                  <span className="text-ink-muted">&lt; 0.05% Max</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink">Herallocatie Cyclus</span>
                  <span className="text-[#2997ff]">Continu</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-canvas-hairline flex items-center justify-between">
              <span className="text-xs text-ink-muted">Data-gedreven besluitvorming</span>
              <span className="text-xs text-[#30d158] font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
                Beschermd
              </span>
            </div>
          </div>

          {/* Bento Card 3: Institutionele Beveiliging (6 Cols) */}
          <div className="lg:col-span-6 apple-glass-card p-6 sm:p-7 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#30d158]/15 border border-[#30d158]/30 text-[#30d158]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-ink">Institutionele Beveiliging</h4>
                  <p className="text-xs text-ink-muted">Zero-trust cloud architectuur</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Elk account, elke API-aanroep en elke cashflow-transactie is beveiligd met end-to-end AES-256 encryptie en multi-signature authenticatieprotocollen.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-canvas-hairline flex items-center justify-between text-xs text-ink-muted">
              <span>Audit-gevalideerd</span>
              <span className="text-[#30d158] font-mono">SOC2 / ISO Compliant</span>
            </div>
          </div>

          {/* Bento Card 4: 24/7 Autonoom Yield Management (6 Cols) */}
          <div className="lg:col-span-6 apple-glass-card p-6 sm:p-7 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-ink">Continue Cashflow Expansie</h4>
                  <p className="text-xs text-ink-muted">Autonome periodieke herallocatie</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                De IQ Bot slaapt nooit. Zodra cashflow binnenkomt in de Tier pools, wordt deze direct geëvalueerd en herverdeeld volgens vooraf vastgestelde rendementseisen.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-canvas-hairline flex items-center justify-between text-xs text-ink-muted">
              <span>Geen handmatige interventie nodig</span>
              <span className="text-ink font-mono">100% geautomatiseerd</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 rounded-[2rem] border border-canvas-hairline apple-glass p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#2997ff]">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">Klaar om de IQ Bot te activeren?</h3>
              <p className="text-xs sm:text-sm text-ink-muted">Start direct met jouw geautomatiseerde maandelijkse cashflow.</p>
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

export default IQHighlightsSection;
