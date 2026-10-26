import React, { useState, useMemo } from "react";
import { Search, ArrowRight, Send, Filter, Check, Eye } from "lucide-react";
import { VACANCIES, Vacancy } from "@/data/careersData";

interface Props {
  onSelectVacancy: (vacancy: Vacancy) => void;
  onApplyVacancy: (vacancy: Vacancy) => void;
  selectedVacancyId?: string;
}

const CATEGORIES = [
  { id: "all", label: "Alle (13)" },
  { id: "finance", label: "Finance & Pre-IPO" },
  { id: "growth", label: "Growth & Partnerships" },
  { id: "sales", label: "B2B Sales & Closing" },
  { id: "tech", label: "Tech & AI Headhunting" },
  { id: "recruitment", label: "Recruitment & Talent" },
  { id: "strategy", label: "Strategie & M&A" },
  { id: "consulting", label: "Subsidie & Grants" },
];

export const CareersMatrix: React.FC<Props> = ({
  onSelectVacancy,
  onApplyVacancy,
  selectedVacancyId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVacancies = useMemo(() => {
    return VACANCIES.filter((v) => {
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.reward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.id.includes(searchQuery);

      const matchesCategory =
        activeCategory === "all" || v.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="vacatures-matrix" className="py-12 md:py-16 border-b border-white/10">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/20 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Systeemmatrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Overzichtsmatrix Vacatures
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              13 openstaande sleutelrollen binnen onze holding, AI-infrastructuren en ecosysteem ventures.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek op rol, domein of ID..."
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase font-mono text-zinc-400">
              <tr>
                <th scope="col" className="px-4 py-3.5 w-16">ID</th>
                <th scope="col" className="px-4 py-3.5">Functie</th>
                <th scope="col" className="px-4 py-3.5 hidden sm:table-cell">Domein</th>
                <th scope="col" className="px-4 py-3.5">Beloning</th>
                <th scope="col" className="px-4 py-3.5 text-right w-44">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredVacancies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-400 font-mono">
                    Geen functies gevonden voor "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredVacancies.map((vacancy) => {
                  const isSelected = selectedVacancyId === vacancy.id;
                  return (
                    <tr
                      key={vacancy.id}
                      className={`group transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/10 hover:bg-cyan-500/15"
                          : "hover:bg-white/[0.04]"
                      }`}
                      onClick={() => onSelectVacancy(vacancy)}
                    >
                      <td className="px-4 py-4 font-mono font-bold text-cyan-400 text-xs">
                        [{vacancy.id}]
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {vacancy.title}
                        </div>
                        <div className="sm:hidden text-xs text-zinc-400 mt-0.5">
                          {vacancy.domain}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell text-zinc-300">
                        <span className="inline-block rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-mono text-zinc-300">
                          {vacancy.domain}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-mint">
                        {vacancy.reward}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => onSelectVacancy(vacancy)}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition"
                            title="Bekijk functieprofiel"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span className="hidden md:inline">Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onApplyVacancy(vacancy)}
                            className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30 transition shadow-sm"
                          >
                            <Send className="h-3 w-3" />
                            <span>Solliciteer</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CareersMatrix;
