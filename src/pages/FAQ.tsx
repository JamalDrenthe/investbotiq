
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
    question: "Kan ik op elk moment uitstappen?",
    answer:
      "Ja. Je kunt je deelname beëindigen aan het einde van een lopende 30-daagse protocolcyclus. Hierdoor kunnen openstaande kapitaalallocaties gecontroleerd en zonder liquiditeitsverstoring worden afgewikkeld. Binnen je Member Dashboard kun je de uittreedprocedure eenvoudig initiëren met begeleiding van het supportteam."
  },
  {
    question: "Wat gebeurt er met mijn persoons- en bedrijfsgegevens?",
    answer:
      "Al je gegevens worden conform strikte AVG/GDPR-richtlijnen versleuteld opgeslagen in Google Cloud Firestore met Zero-Trust beveiligingsregels en rolgebaseerde autorisatie (RBAC). Je gegevens worden uitsluitend gebruikt voor identiteitsverificatie, contractuele afhandeling en het functioneren van je dashboard. Wij delen of verkopen nooit data aan externe partijen."
  },
  {
    question: "Kan ik met dit protocol in de schulden komen?",
    answer:
      "Nee. Het protocol hanteert een strikt afgeschermd risicomodel met automatische buffers en een geautomatiseerd Volatility Shield. Kapitaalallocaties zijn contractueel en protocolmatig geïsoleerd, waardoor er binnen de vastgestelde cycli geen persoonlijke aansprakelijkheid of restschuld ontstaat."
  },
  {
    question: "Hoe snel zie ik de eerste resultaten en cashflow?",
    answer:
      "Al na de afronding van de eerste 30-daagse cyclus (Maand 1) wordt de initiële cashflow berekend en bijgeschreven in je persoonlijke overzicht. De volledige samengestelde kracht van het Tier Plan ontvouwt zich over een gestructureerde periode van 12 tot 24 maanden."
  },
  {
    question: "Hoeveel tijd kost het beheer mij per maand?",
    answer:
      "In de eerste maand besteed je eenmalig circa 30 tot 45 minuten aan onboarding, documentcontrole en het instellen van je voorkeuren. Daarna draait het systeem 100% autonoom. Je hoeft slechts eenmaal per maand je dashboard te openen om de rapportage in te zien en eventuele herallocaties te accorderen."
  },
  {
    question: "Is er sprake van een gegarandeerde opbrengst?",
    answer:
      "Wanneer je het gestructureerde protocol over de volledige looptijd volgt en de cyclusvoorwaarden respecteert, is het wiskundige model sluitend en consistent. Conform verantwoorde fintech-normen benadrukken we dat marktomstandigheden en liquiditeitsdynamiek meewegen, welke continu door de risicomodellen van de IQ Bot worden bewaakt en bijgestuurd."
  },
  {
    question: "Zijn er verborgen of additionele kosten?",
    answer:
      "Nee. Deelname aan Investbotiq kent geen verborgen beheerkosten, maandelijkse abonnementsgelden of onverwachte opslagen. Alle voorwaarden, verdeelsleutels en eventuele prestatievergoedingen zijn vooraf transparant en bindend vastgelegd in je Tier-overeenkomst."
  },
  {
    question: "Wat gebeurt er met het kapitaal en waarin wordt geïnvesteerd?",
    answer:
      "Het geactiveerde kapitaal blijft binnen het beveiligde Investbotiq-ecosysteem. De IQ Bot alloceert het kapitaal dynamisch over gevestigde liquiditeitsknooppunten, marktneutrale arbitrageprotocollen en time-gap transacties om stabiele, recurrente kasstromen te realiseren zonder blootstelling aan speculatieve volatiliteit."
  },
  {
    question: "Wat onderscheidt Investbotiq van traditionele beleggingen of leningen?",
    answer:
      "Traditionele beleggingen vereisen actieve marktkennis, timing en dragen forse volatiliteitsrisico's. Investbotiq hanteert het 'time-gap' principe: het benutten van wiskundige spreiding in verwerkingstijden tussen verschillende liquiditeitsbronnen en aflossingscycli. Dit creëert een voorspelbare, institutioneel gestructureerde cashflow met zero-execution overhead voor de gebruiker."
  },
  {
    question: "Moet ik zelf transacties uitvoeren of markten timen?",
    answer:
      "Nee. De IQ Bot voert alle analyses, liquiditeitsallocaties en risicomonitoring autonoom uit. Je hoeft geen orderboeken te bestuderen, timingbeslissingen te nemen of handmatige overboekingen te verrichten."
  },
  {
    question: "Kan ik zelf bepalen hoe conservatief of dynamisch er wordt geopereerd?",
    answer:
      "Ja. Binnen je Member Dashboard kun je je risicoprofiel finetunen (conservatief, gebalanceerd of dynamisch) en instellen of opbrengsten automatisch worden geherinvesteerd (auto-compound) of maandelijks worden uitgekeerd."
  },
  {
    question: "Hoe en waar volg ik mijn cashflow-ontwikkeling?",
    answer:
      "In je persoonlijke Member Dashboard heb je 24/7 realtime inzicht in alle actieve Tiers, Flowlutas, maandelijkse rapporten en audittrails. Daarnaast ontvang je aan het begin van elke maand een overzichtelijke PDF-specificatie."
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
