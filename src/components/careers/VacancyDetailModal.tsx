import React from "react";
import {
  X,
  Send,
  Globe,
  Briefcase,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Vacancy } from "@/data/careersData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vacancy: Vacancy | null;
  onApply: (vacancy: Vacancy) => void;
}

export const VacancyDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  vacancy,
  onApply,
}) => {
  if (!vacancy) return null;

  const handleApplyClick = () => {
    onClose();
    onApply(vacancy);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton={true}
        className="w-[94vw] sm:w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0 overflow-hidden apple-glass border border-canvas-hairline text-ink shadow-2xl rounded-[2rem] z-[100] max-h-[90vh] flex flex-col"
      >
        {/* macOS / Apple Titlebar */}
        <div className="px-5 py-3.5 border-b border-canvas-hairline flex items-center justify-between bg-canvas-elevated/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
            <span className="ml-3 text-xs font-mono text-ink-muted">
              Vacature [{vacancy.id}/13] · Functiedossier
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-canvas-hairline p-1.5 text-ink-muted hover:text-ink hover:bg-canvas-panel transition active:scale-[0.96]"
            title="Sluiten"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Vacancy Header Badges & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#2997ff]/15 text-[#2997ff] border border-[#2997ff]/30">
                [{vacancy.id}/13]
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-canvas-elevated text-ink-muted border border-canvas-hairline">
                {vacancy.domain}
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/30 font-medium">
                {vacancy.reward}
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-canvas-elevated text-ink-muted border border-canvas-hairline hidden sm:inline">
                100% Remote · ZZP of Vast
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
              {vacancy.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 font-mono">
              Internationale Tech-, AI- & Vastgoedgroep (holding)
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-canvas-panel/60 border border-canvas-hairline text-xs text-ink-muted font-mono">
            <div className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 text-[#30d158] shrink-0" />
              <span>{vacancy.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Briefcase className="h-4 w-4 text-[#2997ff] shrink-0" />
              <span>{vacancy.experience}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#fbbf24] shrink-0" />
              <span>{vacancy.hours}</span>
            </div>
          </div>

          {/* Over de rol */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#2997ff] flex items-center gap-1.5 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
              Over de Rol & Context
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed font-light bg-canvas-elevated/50 p-4 rounded-2xl border border-canvas-hairline">
              {vacancy.roleOverview}
            </p>
          </div>

          {/* Taken & Profiel Dual Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Taken */}
            <div className="p-5 rounded-2xl bg-canvas-panel/60 border border-canvas-hairline space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-wider text-ink flex items-center gap-2 font-bold">
                <CheckCircle2 className="h-4 w-4 text-[#2997ff]" />
                Taken & Verantwoordelijkheden
              </h4>
              <ul className="space-y-2.5 text-xs text-ink-muted">
                {vacancy.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#2997ff] mt-0.5">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profiel & Vereisten */}
            <div className="p-5 rounded-2xl bg-canvas-panel/60 border border-canvas-hairline space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-wider text-ink flex items-center gap-2 font-bold">
                <ShieldCheck className="h-4 w-4 text-[#0071e3]" />
                Profiel & Vereisten
              </h4>
              <ul className="space-y-2.5 text-xs text-ink-muted">
                {vacancy.profile.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#2997ff] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Beloning & Prestatievergoeding */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0071e3]/15 via-[#2997ff]/10 to-[#30d158]/10 border border-canvas-hairline space-y-2.5">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#30d158] flex items-center gap-2 font-bold">
              <Sparkles className="h-4 w-4 text-[#30d158]" />
              Beloning & Vergoedingsstructuur
            </h4>
            <ul className="space-y-2 text-xs text-ink">
              {vacancy.compensation.map((comp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#30d158] font-bold">✓</span>
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Uniforme Arbeidsvoorwaarden Pill */}
          <div className="p-4 rounded-2xl bg-canvas-elevated/40 border border-canvas-hairline flex items-center justify-between text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#2997ff]" />
              <span>Inclusief 8 uniforme arbeidsvoorwaarden (27 vakantiedagen, laptop, ergonomisch budget, workations)</span>
            </div>
            <span className="font-mono text-[11px] text-[#30d158] hidden sm:inline">100% Remote</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-canvas-hairline flex items-center justify-between gap-3 bg-canvas-elevated/40 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="apple-btn-secondary px-5 py-2.5 rounded-full text-xs font-semibold active:scale-[0.97]"
          >
            Sluiten
          </button>

          <button
            type="button"
            onClick={handleApplyClick}
            className="apple-btn-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 active:scale-[0.97]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Direct Solliciteren op [{vacancy.id}]</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VacancyDetailModal;
