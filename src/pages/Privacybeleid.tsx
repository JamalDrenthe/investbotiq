import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { ShieldCheck, Lock, Eye, Database, UserCheck, Bell, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { LumenCtaLink } from "@/components/three/LumenCta";

export default function Privacybeleid() {
  return (
    <InfoPageLayout
      eyebrow="Privacy"
      title="Privacybeleid"
      subtitle="Jouw privacy en data zijn heilig. Ontdek hoe wij jouw persoonsgegevens beschermen en verwerken."
    >
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        {/* Introductie card */}
        <div className="card-paper mb-12 p-8 shadow-level-1">
          <div className="flex items-start gap-4">
            <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-mint" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-graphite sm:text-2xl">
                AVG / GDPR Privacyverklaring Invest Bot IQ
              </h2>
              <p className="mt-2 text-sm text-graphite-muted">
                Laatst bijgewerkt: Oktober 2026 · Conform Europese Privacywetgeving
              </p>
              <p className="mt-4 leading-relaxed text-graphite">
                Bij <strong>Investbotiq</strong> respecteren we de privacy van alle gebruikers van onze site en zorgen
                wij ervoor dat de persoonlijke informatie die je ons verschaft vertrouwelijk en beveiligd wordt behandeld.
                Wij verkopen of verhuren jouw gegevens <strong>nooit</strong> aan derden.
              </p>
            </div>
          </div>
        </div>

        {/* Paragrafen */}
        <div className="space-y-10 text-graphite">
          {/* Paragraaf 1 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <Database className="h-5 w-5 text-indigo" /> 1. Welke gegevens verzamelen wij?
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                Wanneer je gebruikmaakt van Investbotiq, kunnen wij de volgende categorieën van gegevens verwerken:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Identificatie- en contactgegevens:</strong> Voornaam, achternaam, e-mailadres en optioneel
                  telefoonnummer bij registratie.
                </li>
                <li>
                  <strong>Authenticatiegegevens:</strong> Google OAuth identificeerder (UID), authenticatietokens en
                  sessie-informatie via Google Firebase Identity Platform.
                </li>
                <li>
                  <strong>Profiel- en intakegegevens:</strong> Vragen en antwoorden die je verstrekt tijdens het
                  intake- en aanmeldingsproces om je rol en doelen af te stemmen.
                </li>
                <li>
                  <strong>Status & Dashboard telemetry:</strong> Voortgang van jouw traject, geactiveerde taken,
                  notificatievoorkeuren en cashflow-historie binnen het platform.
                </li>
              </ul>
            </div>
          </section>

          {/* Paragraaf 2 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <Eye className="h-5 w-5 text-indigo" /> 2. Waarvoor gebruiken wij deze gegevens?
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>Wij verwerken persoonsgegevens uitsluitend voor de volgende doeleinden:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Het verlenen van toegang tot jouw persoonlijke en beveiligde Member Dashboard.</li>
                <li>Het correct laten functioneren en synchroniseren van de IQ Bot telemetry en meldingen.</li>
                <li>Het communiceren over belangrijke updates, taakdeadlines en systeemstatus.</li>
                <li>Het waarborgen van de veiligheid, het voorkomen van fraude en het naleven van wettelijke vereisten.</li>
              </ul>
            </div>
          </section>

          {/* Paragraaf 3 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <Lock className="h-5 w-5 text-indigo" /> 3. Beveiliging en Infrastructuur
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                Investbotiq hanteert strikte beveiligingsnormen conform enterprise standaarden:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>End-to-End Encryptie:</strong> Al het verkeer verloopt verplicht via HTTPS / TLS 1.3.
                </li>
                <li>
                  <strong>Google Firebase Cloud:</strong> Alle gegevens worden opgeslagen in zwaar beveiligde Google Cloud
                  datacenters met encryptie in rust (AES-256) en in overdracht.
                </li>
                <li>
                  <strong>Granulaire Security Rules:</strong> Toegang tot jouw gegevens is afgeschermd via strenge
                  databasebeveiligingsregels (Firestore Security Rules), waardoor andere leden jouw gegevens nooit kunnen inzien.
                </li>
              </ul>
            </div>
          </section>

          {/* Paragraaf 4 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <UserCheck className="h-5 w-5 text-indigo" /> 4. Jouw Rechten (AVG / GDPR)
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>Onder de Europese Algemene Verordening Gegevensbescherming heb je te allen tijde het recht om:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Inzage:</strong> Te zien welke persoonsgegevens wij van jou bewaren.</li>
                <li><strong>Correctie:</strong> Onjuiste gegevens te laten aanpassen of aanvullen.</li>
                <li><strong>Verwijdering:</strong> Jouw account en alle bijbehorende gegevens permanent te laten wissen ("recht op vergetelheid").</li>
                <li><strong>Dataportabiliteit:</strong> Jouw gegevens in een gestructureerd formaat te ontvangen.</li>
                <li><strong>Bezwaar & Klacht:</strong> Bezwaar te maken tegen bepaalde gegevensverwerkingen of een klacht in te dienen bij de Autoriteit Persoonsgegevens.</li>
              </ul>
            </div>
          </section>

          {/* Paragraaf 5 */}
          <section className="border-b border-paper-hairline pb-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <Bell className="h-5 w-5 text-indigo" /> 5. Cookies en Lokale Opslag
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                Investbotiq maakt uitsluitend gebruik van functionele opslag (zoals first-party session tokens en taalvoorkeuren)
                die strikt noodzakelijk zijn om je ingelogd te houden en de webapplicatie snel en storingsvrij te laten functioneren.
              </p>
              <p>
                Wij gebruiken <strong>geen</strong> tracking cookies van externe advertentienetwerken en volgen jouw gedrag
                buiten ons platform op geen enkele manier.
              </p>
            </div>
          </section>

          {/* Paragraaf 6 */}
          <section className="pb-4">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-graphite">
              <Mail className="h-5 w-5 text-indigo" /> 6. Contact & Functionaris Gegevensbescherming
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-graphite-muted">
              <p>
                Wil je gebruikmaken van je rechten of heb je vragen over ons privacybeleid? Neem dan direct contact op met onze
                gegevensbeheerder:
              </p>
              <div className="mt-4 rounded-xl border border-paper-hairline bg-paper p-5 text-sm text-graphite">
                <p className="font-medium text-graphite">Investbotiq Privacy & Compliance</p>
                <p className="mt-1 text-graphite-muted">E-mailadres: <a href="mailto:info@investbotiq.com" className="text-indigo underline">info@investbotiq.com</a></p>
                <p className="text-graphite-muted">Functionaris: Jamal Drenthe</p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA banner */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-canvas-hairline bg-canvas p-8 text-center text-ink sm:flex-row sm:text-left">
          <div>
            <h4 className="font-display text-xl font-semibold text-ink">Veilig en betrouwbaar starten?</h4>
            <p className="mt-1 text-sm text-ink-muted">Start vandaag nog jouw geautomatiseerde cashflowgroei.</p>
          </div>
          <div className="flex gap-3">
            <LumenCtaLink to="/algemene-voorwaarden" size="sm" variant="ghost">
              Algemene Voorwaarden
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
