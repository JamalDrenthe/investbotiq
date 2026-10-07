import React from "react";
import { Bot, CircleAlert } from "lucide-react";

export const MemberIntelligenceTab: React.FC = () => (
  <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
      <Bot className="h-6 w-6" />
    </div>
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
      <CircleAlert className="h-3.5 w-3.5" />
      Niet gekoppeld
    </p>
    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
      Intelligence
    </h1>
    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
      Er is momenteel geen live AI-engine of telemetrybron gekoppeld aan Investbotiq. Deze pagina start daarom geen bots en toont geen gesimuleerde rendementen, activiteit of optimalisaties als echte accountgegevens.
    </p>
    <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
      Zodra er een vertrouwde backend en gegevensbron voor deze functies zijn ingericht, kan de pagina veilig met die service worden verbonden.
    </p>
  </section>
);
