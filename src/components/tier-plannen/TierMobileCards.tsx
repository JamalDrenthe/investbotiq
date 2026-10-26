
import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { CalendarDays, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const tierData = [
  {
    tier: "Tier 2",
    status: "Actief",
    period: "Maand 1 – Maand 3",
    flowlutas: 1,
    cashflow: "€400/mnd",
    cashPosition: "€1.200 buffer"
  },
  {
    tier: "Tier 3",
    status: "Gepland",
    period: "Maand 4 – Maand 6",
    flowlutas: 2,
    cashflow: "€800/mnd",
    cashPosition: "€2.400 buffer"
  },
  {
    tier: "Tier 4",
    status: "Gepland",
    period: "Maand 7 – Maand 9",
    flowlutas: 3,
    cashflow: "€1.200/mnd",
    cashPosition: "€3.600 buffer"
  },
  {
    tier: "Tier 5",
    status: "Gepland",
    period: "Maand 10 – Maand 12",
    flowlutas: 5,
    cashflow: "€2.000/mnd",
    cashPosition: "€6.000 buffer"
  },
  {
    tier: "Tier 6",
    status: "Eindcyclus",
    period: "Maand 13 – Maand 15",
    flowlutas: 5,
    cashflow: "€2.000/mnd",
    cashPosition: "100% Schuldvrij"
  }
];

export default function TierMobileCards() {
  return (
    <div className="md:hidden space-y-4">
      {tierData.map((item, index) => (
        <FadeIn key={item.tier} delay={0.2 + index * 0.08} className="card-paper p-5 shadow-level-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="icon-tile icon-tile--paper h-8 w-8 text-xs font-bold text-indigo">
                {item.tier.replace("Tier ", "")}
              </span>
              <h3 className="font-display font-semibold text-graphite text-base">{item.tier}</h3>
            </div>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                item.status === "Actief"
                  ? "bg-mint/15 text-mint"
                  : item.status === "Eindcyclus"
                  ? "bg-indigo/15 text-indigo"
                  : "bg-paper text-graphite-muted border border-paper-hairline"
              )}
            >
              {item.status}
            </span>
          </div>

          <div className="space-y-3 pt-1 text-sm">
            <div className="flex items-center text-graphite-muted gap-2">
              <CalendarDays className="h-4 w-4 text-graphite-faint shrink-0" />
              <span>{item.period}</span>
            </div>

            <div className="flex items-center text-graphite-muted gap-2">
              <Layers className="h-4 w-4 text-graphite-faint shrink-0" />
              <span>{item.flowlutas} {item.flowlutas === 1 ? "Flowluta" : "Flowlutas"} actief</span>
            </div>

            <div className="pt-2 border-t border-paper-hairline flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-graphite-muted">Cashflow</span>
              <span className="font-mono text-base font-semibold text-graphite">{item.cashflow}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-graphite-muted">
              <span>Status liquiditeit:</span>
              <span className="font-medium text-graphite">{item.cashPosition}</span>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
