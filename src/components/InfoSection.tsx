import React from "react";
import WhatIsSection from "./info/WhatIsSection";
import WhySection from "./info/WhySection";
import HowSection from "./info/HowSection";
import AdvantagesSection from "./info/AdvantagesSection";
import FAQSection from "./info/FAQSection";

const InfoSection = React.forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} id="wat-is-investbotiq" className="relative w-full">
    <section className="band-paper">
      <WhatIsSection />
    </section>
    <section className="band-canvas">
      <WhySection />
      <HowSection />
    </section>
    <section className="band-paper">
      <AdvantagesSection />
      <FAQSection />
    </section>
  </div>
));

InfoSection.displayName = "InfoSection";

export default InfoSection;
