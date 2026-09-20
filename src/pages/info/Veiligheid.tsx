import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import SecurityFeatures from "@/components/veiligheid/SecurityFeatures";
import NoExternalAccess from "@/components/veiligheid/NoExternalAccess";
import SecurityTimeline from "@/components/veiligheid/SecurityTimeline";
import FutureUpdates from "@/components/veiligheid/FutureUpdates";
import SecurityCTA from "@/components/veiligheid/SecurityCTA";
export default function Veiligheid() {
  return <InfoPageLayout
      eyebrow="Veiligheid"
      title="Veiligheid"
      subtitle="Wij beschermen jouw cashflow, data en traject met state-of-the-art technologie."
    >
      {/* Security Features Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Slimme beveiliging</h2>
          <SecurityFeatures />
        </div>
      </section>
      
      {/* No external access section */}
      <section className="py-16 px-4 bg-[#1A1F2C] text-white">
        <div className="container mx-auto max-w-4xl">
          <NoExternalAccess />
        </div>
      </section>
      
      {/* Security Measures Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Beveiligingsmaatregelen – Visueel overzicht
          </h2>
          <SecurityTimeline />
        </div>
      </section>
      
      {/* Future Updates */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Toekomstige updates
          </h2>
          <FutureUpdates />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <SecurityCTA />
        </div>
      </section>
    </InfoPageLayout>;
}