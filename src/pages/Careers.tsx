import React, { useState } from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersConditions } from "@/components/careers/CareersConditions";
import { CareersMatrix } from "@/components/careers/CareersMatrix";
import { CareerDetailCard } from "@/components/careers/CareerDetailCard";
import { ApplicationProcedure } from "@/components/careers/ApplicationProcedure";
import { ApplicationModal } from "@/components/careers/ApplicationModal";
import { VACANCIES, Vacancy } from "@/data/careersData";
import { Send, Mail, Sparkles, Building2 } from "lucide-react";
import { LumenCtaButton } from "@/components/three/LumenCta";

export default function Careers() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>("01");

  const handleOpenApply = (vacancyId?: string) => {
    if (vacancyId) {
      setSelectedVacancyId(vacancyId);
    }
    setIsApplyOpen(true);
  };

  const handleSelectVacancy = (vacancy: Vacancy) => {
    setSelectedVacancyId(vacancy.id);
    const element = document.getElementById(`vacature-${vacancy.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToMatrix = () => {
    const element = document.getElementById("vacatures-matrix");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <InfoPageLayout
      title="Vacatures & Carrière"
      subtitle="Internationale Tech-, AI- & Vastgoedgroep (naam op aanvraag) · 100% Remote · 13 Sleutelposities."
      eyebrow="Ecosysteem Werving 2026"
    >
      <div className="relative">
        {/* Hero Section */}
        <CareersHero
          onOpenApply={handleOpenApply}
          onScrollToMatrix={handleScrollToMatrix}
        />

        {/* 8 Uniform Conditions */}
        <CareersConditions />

        {/* Overzichtsmatrix */}
        <CareersMatrix
          onSelectVacancy={handleSelectVacancy}
          onApplyVacancy={(vacancy) => handleOpenApply(vacancy.id)}
          selectedVacancyId={selectedVacancyId}
        />

        {/* All 13 Detailed Job Cards Section */}
        <section className="py-12 md:py-16 border-b border-canvas-hairline transition-colors">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3.5 py-1 text-xs font-mono text-cyan border border-cyan/25 mb-3">
                  Volledige Functieprofielen
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
                  13 Gedetailleerde Vacatures
                </h2>
                <p className="text-sm text-ink-muted mt-1 max-w-xl">
                  Lees het complete profiel, de taken, vereisten en specifieke beloningsstructuur per rol.
                </p>
              </div>

              <div className="text-xs font-mono text-ink-muted">
                13 van 13 profielen geladen
              </div>
            </div>

            <div className="space-y-8">
              {VACANCIES.map((vacancy) => (
                <CareerDetailCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onApply={(v) => handleOpenApply(v.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sollicitatieprocedure 4-stappen */}
        <ApplicationProcedure />

        {/* Bottom Call-to-action Banner */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-canvas-hairline bg-gradient-to-r from-indigo-500/15 via-cyan-500/10 to-canvas-elevated text-center shadow-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan/15 border border-cyan/30 px-3.5 py-1 text-xs font-mono text-cyan mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Klaar voor de volgende stap?
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-ink max-w-2xl mx-auto tracking-tight">
                Stap in als sleutelfiguur binnen ons internationale AI- & technologie-ecosysteem.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted max-w-xl mx-auto mt-4 font-light">
                100% remote vrijheid, riante succesfees en directe betrokkenheid bij pre-IPO trajecten en kapitaalmarkttransacties.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <LumenCtaButton size="lg" onClick={() => handleOpenApply()} dot>
                  Solliciteer Direct
                </LumenCtaButton>
                <a
                  href="mailto:info@investbotiq.com?subject=Carri%C3%A8re%20Aanvraag%20Internationale%20Techgroep"
                  className="inline-flex items-center gap-2 rounded-full border border-canvas-hairline bg-canvas-elevated px-6 py-3 text-sm font-medium text-ink hover:bg-canvas-panel transition shadow-sm"
                >
                  <Mail className="h-4 w-4 text-cyan" />
                  <span>Mail je CV naar info@investbotiq.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Application Modal */}
        <ApplicationModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          initialVacancyId={selectedVacancyId}
        />
      </div>
    </InfoPageLayout>
  );
}
