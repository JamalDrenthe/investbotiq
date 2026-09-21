
import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import IntroductionSection from "@/components/wat-is-investbot/IntroductionSection";
import FeaturesSection from "@/components/wat-is-investbot/FeaturesSection";
import QuoteSection from "@/components/wat-is-investbot/QuoteSection";
import CTASection from "@/components/tier-plannen/CTASection";

export default function WatIsInvestBotIQ() {
  return (
    <InfoPageLayout
      title="Wat is Intelligence?"
      subtitle="Slimme Intelligentie. Automatische cashflow. Geen zorgen."
    >
      <IntroductionSection />
      <FeaturesSection />
      <QuoteSection />
      <CTASection />
    </InfoPageLayout>
  );
}
