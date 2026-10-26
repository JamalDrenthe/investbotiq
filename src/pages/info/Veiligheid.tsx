import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import SecurityFeatures from "@/components/veiligheid/SecurityFeatures";
import NoExternalAccess from "@/components/veiligheid/NoExternalAccess";
import SecurityTimeline from "@/components/veiligheid/SecurityTimeline";
import FutureUpdates from "@/components/veiligheid/FutureUpdates";
import SecurityCTA from "@/components/veiligheid/SecurityCTA";

export default function Veiligheid() {
  return (
    <InfoPageLayout
      eyebrow="Beveiliging & Compliance"
      title="Veiligheid & Data-Integriteit"
      subtitle="Wij beschermen jouw vermogensopbouw, persoonsgegevens en cashflowtraject met enterprise-grade standaarden."
    >
      {/* Security Features Grid Section */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow eyebrow--paper mb-4">Architectuur</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Veiligheidsmaatregelen op protocolniveau
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite-muted">
              Een diepgaand overzicht van de beveiligingslagen die continue bescherming garanderen.
            </p>
          </div>
          <SecurityFeatures />
        </div>
      </section>

      {/* No external access section */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline bg-paper">
        <div className="mx-auto max-w-content">
          <div className="card-paper p-8 sm:p-12 shadow-level-2 max-w-4xl mx-auto">
            <NoExternalAccess />
          </div>
        </div>
      </section>

      {/* Security Measures Timeline */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
        <div className="mx-auto max-w-content">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow eyebrow--paper mb-4">Levenscyclus</div>
            <h2 className="font-display text-display-sm sm:text-display-md font-semibold tracking-[-0.03em] text-graphite">
              Beveiliging tijdens elke stap van je traject
            </h2>
          </div>
          <SecurityTimeline />
        </div>
      </section>

      {/* Future Updates */}
      <section className="py-16 md:py-20 px-6 lg:px-10 border-t border-paper-hairline bg-paper">
        <div className="mx-auto max-w-content text-center">
          <div className="eyebrow eyebrow--paper mb-4">Continue Optimalisatie</div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-graphite mb-6">
            Toekomstbestendige Beveiliging
          </h2>
          <FutureUpdates />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-6 lg:px-10 border-t border-paper-hairline">
        <div className="mx-auto max-w-content text-center">
          <SecurityCTA />
        </div>
      </section>
    </InfoPageLayout>
  );
}