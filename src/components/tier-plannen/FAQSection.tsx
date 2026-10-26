import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FAQSection() {
  return (
    <section className="py-20 px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <div className="eyebrow eyebrow--paper mb-3">Veelgestelde Vragen</div>
          <h2 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">
            Vragen over het Tier Plan
          </h2>
          <p className="mt-3 text-base text-graphite-muted">
            Heldere antwoorden over de cycli, Flowlutas en de opbouw van je cashflow.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="item-1" className="card-paper overflow-hidden border-b-0 px-2 shadow-level-1">
            <AccordionTrigger className="px-4 py-5 text-left font-display text-base font-semibold text-graphite hover:no-underline md:text-lg">
              Wat gebeurt er als ik tussentijds wil stoppen?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 text-base leading-7 text-graphite-muted">
              Je kunt je deelname beëindigen aan het einde van een lopende 30-daagse protocolcyclus. De IQ Bot wikkelt alle allocaties gecontroleerd af en sluit openstaande posities ordentelijk af via het interne liquiditeitsprotocol. Je persoonlijke adviseur begeleidt dit proces stap voor stap.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="card-paper overflow-hidden border-b-0 px-2 shadow-level-1">
            <AccordionTrigger className="px-4 py-5 text-left font-display text-base font-semibold text-graphite hover:no-underline md:text-lg">
              Wat is een Flowluta precies?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 text-base leading-7 text-graphite-muted">
              Een Flowluta is een modulaire cashflow-unit binnen het Investbotiq protocol. Elke geactiveerde Flowluta vertegenwoordigt een autonome liquiditeitsallocatie die circa €400 per maand aan stabiele kasstroom genereert. Naarmate je door de Tiers vordert, activeert de IQ Bot extra units om je maandelijkse inkomen op te schalen naar maximaal €2.000 per maand.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="card-paper overflow-hidden border-b-0 px-2 shadow-level-1">
            <AccordionTrigger className="px-4 py-5 text-left font-display text-base font-semibold text-graphite hover:no-underline md:text-lg">
              Wanneer is het systeem volledig schuldvrij?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 text-base leading-7 text-graphite-muted">
              In Tier 6 (na circa 12 tot 15 maanden) zijn alle initiële allocaties en verplichtingen volledig afgelost. Vanaf dat moment is je kapitaalstructuur 100% autonoom en schuldvrij, terwijl de stabiele maandelijkse cashflow van €2.000 blijft doorlopen.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:underline"
          >
            Bekijk alle veelgestelde vragen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}