import React, { useState } from "react";
import { 
  TrendingUp, 
  PiggyBank, 
  ArrowUp, 
  ArrowDown, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Target, 
  Sparkles,
  ChevronRight,
  Layers,
  FileSpreadsheet,
  BadgePercent,
  Check
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  Area,
  ComposedChart
} from "recharts";
import { toast } from "sonner";
import { MemberTab } from "@/components/member/MemberPortalLayout";

interface Props {
  onSwitchTab: (tab: MemberTab) => void;
}

const projectionData = [
  { year: "2024", opbouw: 15000, cashflow: 450, doelstelling: 15000 },
  { year: "2025", opbouw: 32000, cashflow: 980, doelstelling: 30000 },
  { year: "2026 (huidig)", opbouw: 48500, cashflow: 1620, doelstelling: 50000 },
  { year: "2027 (prognose)", opbouw: 85000, cashflow: 2500, doelstelling: 80000 },
  { year: "2028 (prognose)", opbouw: 140000, cashflow: 4200, doelstelling: 130000 },
  { year: "2029 (prognose)", opbouw: 215000, cashflow: 6500, doelstelling: 200000 },
  { year: "2030 (prognose)", opbouw: 320000, cashflow: 9500, doelstelling: 300000 },
];

const payoutHistory = [
  { id: "TX-9901", date: "28 Aug 2026", amount: "€1.620,00", type: "Cashflow Uitbetaling", status: "Uitbetaald", flowlutas: "6 eenheden", method: "SEPA Bankoverschrijving" },
  { id: "TX-9844", date: "28 Jul 2026", amount: "€1.620,00", type: "Cashflow Uitbetaling", status: "Uitbetaald", flowlutas: "6 eenheden", method: "SEPA Bankoverschrijving" },
  { id: "TX-9721", date: "28 Jun 2026", amount: "€1.440,00", type: "Cashflow Uitbetaling", status: "Uitbetaald", flowlutas: "5 eenheden", method: "SEPA Bankoverschrijving" },
  { id: "TX-9610", date: "28 Mei 2026", amount: "€1.200,00", type: "Cashflow Uitbetaling", status: "Uitbetaald", flowlutas: "4 eenheden", method: "SEPA Bankoverschrijving" },
  { id: "TX-9502", date: "28 Apr 2026", amount: "€1.050,00", type: "Cashflow Uitbetaling", status: "Uitbetaald", flowlutas: "3 eenheden", method: "SEPA Bankoverschrijving" },
];

const milestones = [
  { step: 1, title: "Onboarding & KYC Verificatie", status: "completed", date: "Januari 2026", description: "Profiel verificatie en bankkoppeling goedgekeurd." },
  { step: 2, title: "Eerste Flowluta Eenheid Geactiveerd", status: "completed", date: "Februari 2026", description: "Start van geautomatiseerde cashflow generatie." },
  { step: 3, title: "Tier 1 Behaald (€1.000+/mnd cashflow)", status: "completed", date: "April 2026", description: "Vaste maandelijkse liquiditeit bereikt." },
  { step: 4, title: "Tier 2 Actief (€1.620+/mnd cashflow)", status: "current", date: "Huidige Status", description: "6 Flowlutas actief met compounding effect." },
  { step: 5, title: "Tier 3 Doelstelling (€3.000+/mnd cashflow)", status: "upcoming", date: "Verwacht Q1 2027", description: "Maximale vermogensversnelling met 12 Flowluta slots." },
];

export const MemberProgressTab: React.FC<Props> = ({ onSwitchTab }) => {
  const [horizon, setHorizon] = useState<"maandelijks" | "jaarlijks">("maandelijks");

  const handleDownloadStatement = (txId: string) => {
    toast.success(`Specificatie ${txId} succesvol gedownload`);
  };

  const handleDownloadAnnualReport = () => {
    toast.success("Jaaropgave & Rendementsoverzicht 2026 gegenereerd");
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Financiële Voortgang & Groei
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Volg de exponentiële ontwikkeling van uw vermogen en stabiele cashflowstromen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setHorizon("maandelijks")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                horizon === "maandelijks"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Maandelijks
            </button>
            <button
              type="button"
              onClick={() => setHorizon("jaarlijks")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                horizon === "jaarlijks"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Jaarprognose
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadAnnualReport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Jaaroverzicht</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Opbouw */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Huidige Vermogensopbouw
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            €48.500,00
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Geschatte groei dit jaar: +€72.000</span>
          </div>
        </div>

        {/* Maandelijkse Cashflow */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Maandelijkse Cashflow
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            €1.620,00
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Verwachte stijging naar €1.980/mnd in Q4</span>
          </div>
        </div>

        {/* BEL Status */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Openstaande BEL Leningen
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            €0,00
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Volledig schuldenvrij & gewaarborgd</span>
          </div>
        </div>

      </div>

      {/* Projection Chart */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Lange Termijn Vermogensprojectie (2024 tot 2030)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Gebaseerd op het historische rendement en automatische kwartaalactivatie van nieuwe Flowlutas.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600" />
              <span className="text-slate-700 dark:text-slate-300">Totale Vermogensopbouw (€)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-700 dark:text-slate-300">Maandelijkse Cashflow (€)</span>
            </div>
          </div>
        </div>

        <div className="w-full h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                tickFormatter={(val) => `€${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#0f172a", 
                  borderColor: "#334155", 
                  borderRadius: "16px",
                  color: "#f8fafc",
                  fontSize: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
                }} 
                formatter={(val: number) => [`€${val.toLocaleString('nl-NL')}`, ""]}
              />
              <Area 
                type="monotone" 
                dataKey="opbouw" 
                name="Totale Opbouw" 
                fill="#9333ea" 
                fillOpacity={0.15} 
                stroke="#9333ea" 
                strokeWidth={3} 
              />
              <Line 
                type="monotone" 
                dataKey="cashflow" 
                name="Maandelijkse Cashflow" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 5, fill: "#10b981" }} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestone Roadmap */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Mijlpalen & Groeitraject
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Volg de voltooide stappen en uw volgende doelen binnen Investbotiq.
          </p>
        </div>

        <div className="space-y-4">
          {milestones.map((m) => {
            const isDone = m.status === "completed";
            const isCurrent = m.status === "current";

            return (
              <div
                key={m.step}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? "bg-indigo-50/80 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-800 shadow-md ring-1 ring-indigo-400/30"
                    : isDone
                    ? "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
                    : "bg-slate-50/30 dark:bg-slate-900/30 border-dashed border-slate-300 dark:border-slate-800 opacity-70"
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isDone
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : isCurrent
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-4 ring-indigo-500/20"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  }`}>
                    {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : m.step}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        {m.title}
                      </h4>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white animate-pulse">
                          Huidige Stap
                        </span>
                      )}
                      {isDone && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                          Voltooid
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400 self-end sm:self-auto shrink-0">
                  {m.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payouts History Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Recente Cashflow Uitbetalingen
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Volledig overzicht van maandelijkse stortingen op uw gekoppelde IBAN rekening.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full self-start sm:self-auto">
            100% Succesvolle Uitbetalingen
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Transactie ID</th>
                <th className="pb-3 font-semibold">Datum</th>
                <th className="pb-3 font-semibold">Bedrag</th>
                <th className="pb-3 font-semibold">Bron</th>
                <th className="pb-3 font-semibold">Methode</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Specificatie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {payoutHistory.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{tx.id}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{tx.date}</td>
                  <td className="py-3.5 font-extrabold text-slate-900 dark:text-white text-sm">{tx.amount}</td>
                  <td className="py-3.5 text-slate-500">{tx.flowlutas}</td>
                  <td className="py-3.5 text-slate-500">{tx.method}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadStatement(tx.id)}
                      className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors inline-flex"
                      title="Download PDF bewijs"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
