import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, CalendarDays, PiggyBank, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "@/components/AuthProvider";
import { MemberTab } from "@/components/member/MemberPortalLayout";
import { firebaseStore } from "@/integrations/firebase/client";
import type { Database } from "@/types/data-model";

interface Props {
  onSwitchTab: (tab: MemberTab) => void;
}

type Cashflow = Database["public"]["Tables"]["cashflows"]["Row"];
type Period = "6m" | "1j" | "all";

const formatCurrency = (amount: number) => `€${amount.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`;

export const MemberProgressTab: React.FC<Props> = ({ onSwitchTab }) => {
  const [period, setPeriod] = useState<Period>("1j");
  const { user } = useAuth();
  const { data: cashflows = [], isLoading, error } = useQuery({
    queryKey: ["memberProgressCashflows", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      if (!user) return [] as Cashflow[];
      const result = await firebaseStore.collection("cashflows").select("*").eq("user_id", user.id);
      if (result.error) throw result.error;
      return result.data as Cashflow[];
    },
  });

  const sortedCashflows = [...cashflows].sort((left, right) => right.maand.localeCompare(left.maand));
  const latestCashflow = sortedCashflows[0];
  const periodMonths = period === "6m" ? 6 : 12;
  const cutoff = period === "all" ? null : new Date(new Date().getFullYear(), new Date().getMonth() - periodMonths + 1, 1);
  const chartData = [...sortedCashflows]
    .filter((record) => !cutoff || `${record.maand}-01` >= `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, "0")}-01`)
    .reverse()
    .map((record) => ({
      month: new Date(`${record.maand}-01T00:00:00`).toLocaleDateString("nl-NL", { month: "short", year: "2-digit" }),
      amount: record.cashflow_bedrag,
    }));

  return (
    <div className="space-y-8 fade-in">
      <header className="flex flex-col gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Cashflowgeschiedenis
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Dit overzicht toont de maandbedragen die aan uw account zijn gekoppeld. Een geregistreerd bedrag bevestigt op zichzelf geen uitgevoerde betaling.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        <SummaryCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Meest recente maandcashflow"
          value={isLoading ? "Laden…" : latestCashflow ? formatCurrency(latestCashflow.cashflow_bedrag) : "—"}
          detail={latestCashflow ? `Periode ${latestCashflow.maand}` : "Geen bedrag geregistreerd"}
        />
        <SummaryCard
          icon={<Activity className="h-5 w-5" />}
          label="Geregistreerde maanden"
          value={isLoading ? "…" : String(cashflows.length)}
          detail="Gebaseerd op uw cashflowrecords"
        />
        <SummaryCard
          icon={<PiggyBank className="h-5 w-5" />}
          label="Vermogensopbouw"
          value="—"
          detail="Niet beschikbaar in de gekoppelde gegevens"
        />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Maandelijkse cashflow</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Historische records uit uw account</p>
          </div>
          <div className="inline-flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs dark:border-slate-700 dark:bg-slate-800">
            {(["6m", "1j", "all"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPeriod(value)}
                className={`rounded-lg px-3 py-1.5 font-bold ${period === value ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300"}`}
              >
                {value === "all" ? "Alles" : value}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72 sm:h-80">
          {chartData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="memberCashflowProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#64748b" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(value: number) => `€${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: 12, color: "#f8fafc" }}
                  formatter={(value: number) => [formatCurrency(value), "Cashflowrecord"]}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fill="url(#memberCashflowProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
              {error ? "Cashflowgegevens konden niet worden geladen." : isLoading ? "Cashflowgegevens laden…" : "Er zijn nog geen cashflowrecords beschikbaar."}
            </div>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Cashflowrecords</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Er worden geen betalingsbewijzen of jaaropgaven gegenereerd.</p>
        </div>
        {sortedCashflows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60">
                <tr>
                  <th className="px-5 py-3 font-bold">Periode</th>
                  <th className="px-5 py-3 font-bold">Geregistreerd bedrag</th>
                  <th className="px-5 py-3 font-bold">Laatst bijgewerkt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sortedCashflows.map((record) => (
                  <tr key={record.id}>
                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">{record.maand}</td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{formatCurrency(record.cashflow_bedrag)}</td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Date(record.updated_at).toLocaleDateString("nl-NL")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-sm text-slate-500">
            {error ? "Cashflowrecords konden niet worden geladen." : "Er zijn nog geen cashflowrecords aan dit account gekoppeld."}
          </p>
        )}
      </section>

      <button type="button" onClick={() => onSwitchTab("dashboard")} className="text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400">
        Terug naar dashboard
      </button>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-3 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
      {icon}
      <span className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
    </div>
    <div className="text-2xl font-black text-slate-900 dark:text-white">{value}</div>
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
  </div>
);
