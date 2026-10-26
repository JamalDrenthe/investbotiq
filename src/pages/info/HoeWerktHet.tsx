import React from "react";
import { motion } from "framer-motion";
import { LumenCtaLink } from "@/components/three/LumenCta";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { CircleUser, Bot, TrendingUp, ShieldCheck, Cpu, ArrowRight, Layers, BarChart3 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: CircleUser,
    title: "Aanmelden & Accountverificatie",
    description: "Je start met een snelle registratie. Na verificatie van je gegevens krijg je direct toegang tot het Member Dashboard en kun je jouw accountvoorkeuren instellen.",
    badge: "Stap 1 · Intake",
  },
  {
    step: "02",
    icon: Bot,
    title: "Protocol- & Tier-Selectie",
    description: "Kies de gewenste instap-Tier en stel je risicomodus in (conservatief, gebalanceerd of dynamisch). De IQ Bot activeert jouw persoonlijke allocatiestructuur binnen het ecosysteem.",
    badge: "Stap 2 · Activatie",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Periodieke Compounding & Uitkering",
    description: "Het protocol genereert maandelijks cashflow. Elke cyclus van drie maanden vindt er een geplande herallocatie plaats, waardoor je cashflow stapsgewijs doorgroeit naar de volgende Tier.",
    badge: "Stap 3 · Groei",
  },
];

const BENEFITS = [
  {
    icon: Layers,
    title: "Duidelijke Instapstructuur",
    description: "Geen ontoegankelijke barrières of ondoorzichtige vereisten. Het systeem bouwt gefaseerd op via transparante Tiers met vaste kasstroomverwachtingen.",
  },
  {
    icon: Cpu,
    title: "Volledig Autonoom Protocol",
    description: "Geen handmatige transacties of emotionele marktbeslissingen. De IQ Bot voert de liquiditeitsstrategieën strikt en consistent uit op basis van geteste algoritmes.",
  },
  {
    icon: BarChart3,
    title: "Gevalideerde 3-Maandelijkse Cycli",
    description: "Het groeitraject is onderverdeeld in kwartaalcycli. Na elke cyclus wordt de gerealiseerde opbrengst geëvalueerd en automatisch opgeschaald naar het volgende niveau.",
  },
  {
    icon: ShieldCheck,
    title: "Ingebouwd Volatility Shield",
    description: "Mocht de bredere markt ongewone volatiliteit vertonen, dan schakelt het ingebouwde risicoschild automatisch over op kapitaalbehoud en veilige liquiditeitspools.",
  },
];

export default function HoeWerktHet() {
  return (
    <InfoPageLayout
      eyebrow="Groeitraject"
      title="Hoe werkt het Investbotiq Protocol?"
      subtitle="Een transparante, wiskundig onderbouwde methodiek voor periodieke cashflowopbouw."
    >
      {/* 3 Steps Section */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="max-w-2xl mb-16">
            <div className="eyebrow eyebrow--paper mb-4">Stappenplan</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              In 3 heldere stappen naar structurele cashflow
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite-muted">
              Het proces is ontworpen om maximale voorspelbaarheid en eenvoud te bieden voor iedere deelnemer.
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-paper p-8 sm:p-10 shadow-level-1 hover:shadow-level-2 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl sm:text-4xl font-bold font-mono text-indigo shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-graphite">
                        {item.title}
                      </h3>
                      <p className="text-base leading-7 text-graphite-muted max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-end md:self-center">
                    <span className="icon-tile icon-tile--paper rounded-2xl h-12 w-12 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-indigo" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline bg-paper">
        <div className="mx-auto max-w-content">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow eyebrow--paper mb-4">Groeicycli</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Het 6-Tier Traject
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite-muted">
              Elke Tier markeert een afgebakende cyclus van drie maanden waarin de kasstroom en compounding stapsgewijs toenemen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((tier, idx) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="card-paper p-5 text-center shadow-level-1 hover:border-indigo/40 transition"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo mb-2">Fase {tier}</div>
                <div className="font-display text-2xl font-bold text-graphite mb-1">Tier {tier}</div>
                <div className="text-xs text-graphite-muted">Maand {(tier - 1) * 3 + 1}–{tier * 3}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
        <div className="mx-auto max-w-content">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow eyebrow--paper mb-4">Voordelen</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Waarom investeerders kiezen voor de IQ Bot
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-paper p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300"
              >
                <div className="icon-tile icon-tile--paper mb-6">
                  <b.icon className="h-5 w-5 text-indigo" />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-graphite mb-2.5">
                  {b.title}
                </h3>
                <p className="text-base leading-7 text-graphite-muted">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
        <div className="mx-auto max-w-content">
          <div className="card-paper p-8 sm:p-14 shadow-level-2 text-center max-w-3xl mx-auto space-y-6">
            <div className="eyebrow eyebrow--paper">Direct Starten</div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-graphite">
              Klaar om je eigen cashflowtraject te activeren?
            </h2>
            <p className="text-base text-graphite-muted max-w-xl mx-auto">
              Meld je aan voor een intake of bekijk de specifieke specificaties en opbrengsten van alle Tier Plannen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <LumenCtaLink to="/tier-plannen" dot>
                Bekijk Tier Plannen
              </LumenCtaLink>
              <LumenCtaLink to="/register" variant="paper">
                Aanmelden voor Intake <ArrowRight className="h-4 w-4 ml-1" />
              </LumenCtaLink>
            </div>
          </div>
        </div>
      </section>
    </InfoPageLayout>
  );
}
