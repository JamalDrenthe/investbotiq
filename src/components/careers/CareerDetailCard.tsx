import React from "react";
import {
  Globe,
  Clock,
  Briefcase,
  CheckCircle2,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { Vacancy } from "@/data/careersData";

interface Props {
  vacancy: Vacancy;
  onApply: (vacancy: Vacancy) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const CareerDetailCard: React.FC<Props> = ({
  vacancy,
  onApply,
  isExpanded = true,
  onToggleExpand,
}) => {
  return (
    <div
      id={`vacature-${vacancy.id}`}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 transition-all duration-300 hover:border-white/20"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              [{vacancy.id}/13]
            </span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
              {vacancy.domain}
            </span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {vacancy.reward}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            {vacancy.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onApply(vacancy)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-4 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition shadow-sm w-fit"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Solliciteer Nu</span>
        </button>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 font-mono">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="truncate">{vacancy.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-indigo-400 shrink-0" />
          <span className="truncate">{vacancy.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="truncate">{vacancy.hours}</span>
        </div>
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <div>
          <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            Over de rol
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            {vacancy.roleOverview}
          </p>
        </div>

        {/* Taken & Profiel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Taken */}
          <div className="p-4.5 rounded-xl bg-white/[0.015] border border-white/5 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              Taken & Verantwoordelijkheden
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {vacancy.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profiel */}
          <div className="p-4.5 rounded-xl bg-white/[0.015] border border-white/5 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
              Profiel & Vereisten
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {vacancy.profile.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Beloning Box */}
        <div className="p-4.5 rounded-xl bg-gradient-to-r from-cyan-950/20 via-indigo-950/20 to-emerald-950/20 border border-white/10 space-y-2">
          <h4 className="text-xs uppercase font-mono tracking-wider text-mint flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-mint" />
            Beloning & Prestatievergoeding
          </h4>
          <ul className="space-y-1.5 text-xs text-zinc-200">
            {vacancy.compensation.map((comp, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-mint mt-0.5">✓</span>
                <span>{comp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailCard;
