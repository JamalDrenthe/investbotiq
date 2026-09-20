
import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Kan ik elk moment eruit stappen?",
    answer: "Ja, maar alleen als het account tijdig wordt gesloten."
  },
  {
    question: "Wat gebeurt er met mijn gegevens?",
    answer: "Uw gegevens worden veilig opgeslagen en uitsluitend gebruikt voor uw Bv's."
  },
  {
    question: "Kan ik in de schulden komen?",
    answer: "Technisch gezien niet volgens het protocol, uitgezonderd bij vroegtijdig stoppen zonder verplichtingen af te ronden."
  },
  {
    question: "Hoelang moet ik meedoen om profijt te hebben?",
    answer: "Na maand 1 heeft u al profijt."
  },
  {
    question: "Hoe vaak moet ik er zelf mee bezig zijn?",
    answer: "In de eerste maand het meest, daarna slechts één keer per maand."
  },
  {
    question: "Is het gegarandeerd dat ik eraan verdien?",
    answer: "Als je het volledige protocol opvolgt en afmaakt: JA."
  },
  {
    question: "Komen er extra kosten bij kijken?",
    answer: "Nee, deelname aan Investbotiq brengt geen extra kosten met zich mee."
  },
  {
    question: "Wat gebeurt er met het BEL-lening geld, waar wordt dit in geïnvesteerd?",
    answer: "Al het geld blijft in het interne ecosysteem."
  },
  {
    question: "Wat onderscheidt Investbotiq van andere investeringen/leningen?",
    answer: "Investbotiq maakt gebruik van het time gap profit principe (tijd-kloof profijt)."
  },
  {
    question: "Moet ik zelf investeren?",
    answer: "Nee, alles gebeurt automatisch."
  },
  {
    question: "Kan ik zelf investeringen kiezen?",
    answer: "Nee, de IQ Bot volgt een vast plan."
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via je persoonlijke Member Dashboard."
  }
];

const FAQPage = () => {
  return (
    <InfoPageLayout
      eyebrow="FAQ"
      title="Veelgestelde Vragen"
      subtitle="Vind hieronder snel het antwoord op je vraag over Investbotiq."
    >
      <main className="mx-auto w-full max-w-content px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow eyebrow--paper">{FAQ_ITEMS.length} vragen</div>
            <p className="mt-4 text-base leading-7 text-graphite-muted">
              Klik op een vraag om het antwoord te openen. Staat je vraag er niet bij? Log in en stel hem via je persoonlijke Member Dashboard.
            </p>
          </aside>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-paper overflow-hidden border-b-0 px-2 transition-shadow data-[state=open]:shadow-level-3"
              >
                <AccordionTrigger className="px-4 py-5 text-left font-display text-base font-semibold tracking-tight text-graphite hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 text-base leading-7 text-graphite-muted">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </InfoPageLayout>
  );
};

export default FAQPage;
