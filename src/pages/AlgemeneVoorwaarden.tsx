import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Scale, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { LumenCtaLink } from "@/components/three/LumenCta";

export default function AlgemeneVoorwaarden() {
  return (
    <InfoPageLayout
      eyebrow="Juridisch"
      title="Algemene Voorwaarden"
      subtitle="Lees hier de voorwaarden en afspraken rondom het gebruik van het Invest Bot IQ platform."
    >
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        {/* Introductie card */}
        <div className="card-paper mb-12 p-8 shadow-level-1">
          <div className="flex items-start gap-4">
            <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
              <FileText className="h-6 w-6 text-indigo" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-graphite sm:text-2xl">
                Invest Bot IQ Gebruikersovereenkomst
              </h2>
              <p className="mt-2 text-sm text-graphite-muted">
                Laatst bijgewerkt: Oktober 2026 · Versie 2.1
              </p>
              <p className="mt-4 leading-relaxed text-graphite">
                Welkom bij <strong>Investbotiq</strong>. Door toegang te zoeken tot ons platform, het aanmaken van een
                account of gebruik te maken van de <strong>IQ Bot</strong> en gerelateerde diensten, verklaar je akkoord
                te gaan met de onderstaande Algemene Voorwaarden.
              </p>
            </div>
          </div>
        </div>

        {/* Artikelen */}
        <div className="space-y-10 text-graphite">
          {/* Artikel 1 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 1. Definities
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                <strong>1.1 Investbotiq / Platform:</strong> Het softwareplatform, inclusief alle dashboards, API’s,
                geautomatiseerde systemen en de website opererend via investbotiq.com.
              </p>
              <p>
                <strong>1.2 IQ Bot:</strong> Het autonome intelligente softwaresysteem dat analyses, research, en
                cashflow-optimalisaties uitvoert voor aangesloten deelnemers.
              </p>
              <p>
                <strong>1.3 Deelnemer / Gebruiker:</strong> De natuurlijke persoon of rechtspersoon die zich heeft
                aangemeld bij Investbotiq en beschikt over een geverifieerd account.
              </p>
              <p>
                <strong>1.4 Protocol:</strong> De gestructureerde methodologie en tijdscycli (waaronder het Time Gap
                principe) volgens welke het platform opereert.
              </p>
            </div>
          </section>

          {/* Artikel 2 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 2. Toegankelijkheid & Registratie
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                2.1 Om gebruik te kunnen maken van het platform dien je minimaal 18 jaar oud te zijn en handelingsbekwaam.
              </p>
              <p>
                2.2 Je bent verantwoordelijk voor het verstrekken van accurate, actuele en volledige gegevens tijdens de
                aanmeldingsprocedure.
              </p>
              <p>
                2.3 Toegang tot je account geschiedt via beveiligde authenticatie (waaronder Google Sign-In). Je bent te
                allen tijde persoonlijk verantwoordelijk voor het geheimhouden van je inloggegevens.
              </p>
            </div>
          </section>

          {/* Artikel 3 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 3. Werking van de IQ Bot & Automatische Processen
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                3.1 De IQ Bot opereert als een autonoom hulpmiddel om cashflowprocessen binnen het interne ecosysteem te
                coördineren en monitoren.
              </p>
              <p>
                3.2 Deelnemers hebben via het <em>Member Dashboard</em> real-time inzicht in de status, analyses, taken
                en cashflow-voortgang.
              </p>
              <p>
                3.3 Het platform garandeert een zorgvuldige uitvoering conform het vastgestelde protocol. Resultaten en
                cycli zijn afhankelijk van de actieve deelname en de naleving van de bijbehorende protocolstappen.
              </p>
            </div>
          </section>

          {/* Artikel 4 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 4. Geen Beleggingsadvies & Risicoverduidelijking
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                4.1 Investbotiq biedt technologische automatisering en een gestructureerd lidmaatschapsecosysteem. De
                inhoud van het platform geldt uitdrukkelijk niet als persoonlijk financieel, juridisch of fiscaal
                advies.
              </p>
              <p>
                4.2 Iedere deelnemer is zelf verantwoordelijk voor zijn of haar financiële beslissingen en dient zich te
                vergewissen van de voorwaarden en richtlijnen van het protocol.
              </p>
            </div>
          </section>

          {/* Artikel 5 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 5. Privacy & Gegevensverwerking
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                5.1 Wij behandelen alle persoonlijke gegevens met de hoogste graad van vertrouwelijkheid conform de
                Algemene Verordening Gegevensbescherming (AVG / GDPR).
              </p>
              <p>
                5.2 Voor gedetailleerde informatie over hoe wij data verzamelen, beveiligen en gebruiken verwijzen wij
                naar ons{" "}
                <Link to="/privacybeleid" className="font-medium text-indigo underline hover:text-indigo-dark">
                  Privacybeleid
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Artikel 6 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 6. Intellectueel Eigendom
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                6.1 Alle intellectuele eigendomsrechten met betrekking tot het platform, de merknamen, algoritmes,
                visualisaties en softwarecode van Invest Bot IQ berusten exclusief bij Investbotiq.
              </p>
              <p>
                6.2 Het is niet toegestaan om zonder voorafgaande schriftelijke toestemming onderdelen van het platform
                te kopiëren, distribueren of reverse-engineeren.
              </p>
            </div>
          </section>

          {/* Artikel 7 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 7. Beëindiging & Opzegging
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                7.1 Een deelnemer kan zijn of haar deelname te allen tijde beëindigen conform de richtlijnen in het
                Member Dashboard of door schriftelijk contact op te nemen met support.
              </p>
              <p>
                7.2 Investbotiq behoudt zich het recht voor om accounts op te schorten of te beëindigen indien er sprake
                is van oneigenlijk gebruik, fraude of schending van deze voorwaarden.
              </p>
            </div>
          </section>

          {/* Artikel 8 */}
          <section className="pb-4">
            <h3 className="font-display text-xl font-semibold text-graphite">
              Artikel 8. Toepasselijk Recht & Contact
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                8.1 Op deze voorwaarden en elke overeenkomst tussen Investbotiq en de deelnemer is uitsluitend het
                Nederlands recht van toepassing.
              </p>
              <p>
                8.2 Voor vragen over deze voorwaarden kun je contact met ons opnemen via:
              </p>
              <div className="mt-4 rounded-xl border border-paper-hairline bg-paper p-5 text-sm text-graphite">
                <p className="font-medium text-graphite">Investbotiq Support & Juridische Zaken</p>
                <p className="mt-1 text-graphite-muted">E-mail: <a href="mailto:info@jamaldrenthe.com" className="text-indigo underline">info@jamaldrenthe.com</a></p>
                <p className="text-graphite-muted">Website: <a href="https://investbotiq.com" className="text-indigo underline">https://investbotiq.com</a></p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA banner */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-canvas-hairline bg-canvas p-8 text-center text-ink sm:flex-row sm:text-left">
          <div>
            <h4 className="font-display text-xl font-semibold text-ink">Nog vragen over de voorwaarden?</h4>
            <p className="mt-1 text-sm text-ink-muted">Ons supportteam staat klaar om al je vragen te beantwoorden.</p>
          </div>
          <div className="flex gap-3">
            <LumenCtaLink to="/contact" size="sm" variant="ghost">
              Neem contact op
            </LumenCtaLink>
            <LumenCtaLink to="/register" size="sm" dot>
              Aanmelden
            </LumenCtaLink>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
