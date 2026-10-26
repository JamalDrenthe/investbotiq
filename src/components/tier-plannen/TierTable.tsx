import React from "react";
import { FadeIn } from "../info/FadeInAnimation";

export default function TierTable() {
  return (
    <FadeIn delay={0.5} className="hidden md:block overflow-hidden card-paper shadow-level-1 mb-10">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-paper-hairline bg-paper/60 text-xs uppercase tracking-[0.12em] text-graphite-muted">
            <th className="py-4 px-6 font-semibold">Tier</th>
            <th className="py-4 px-6 font-semibold">Cyclusperiode</th>
            <th className="py-4 px-6 font-semibold">Actieve Flowlutas</th>
            <th className="py-4 px-6 font-semibold">Maandelijkse Cashflow</th>
            <th className="py-4 px-6 font-semibold">Fasestatus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-hairline text-sm text-graphite">
          <tr className="transition-colors hover:bg-paper/40">
            <td className="py-4 px-6 font-display font-semibold text-graphite">Tier 2</td>
            <td className="py-4 px-6 text-graphite-muted">Maand 1 – 3</td>
            <td className="py-4 px-6 font-mono font-medium">1</td>
            <td className="py-4 px-6 font-mono font-semibold text-graphite">€400</td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-medium text-mint">
                Actief
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-paper/40">
            <td className="py-4 px-6 font-display font-semibold text-graphite">Tier 3</td>
            <td className="py-4 px-6 text-graphite-muted">Maand 4 – 6</td>
            <td className="py-4 px-6 font-mono font-medium">2</td>
            <td className="py-4 px-6 font-mono font-semibold text-graphite">€800</td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-medium text-mint">
                Actief
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-paper/40">
            <td className="py-4 px-6 font-display font-semibold text-graphite">Tier 4</td>
            <td className="py-4 px-6 text-graphite-muted">Maand 7 – 9</td>
            <td className="py-4 px-6 font-mono font-medium">3</td>
            <td className="py-4 px-6 font-mono font-semibold text-graphite">€1.200</td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-medium text-mint">
                Actief
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-paper/40">
            <td className="py-4 px-6 font-display font-semibold text-graphite">Tier 5</td>
            <td className="py-4 px-6 text-graphite-muted">Maand 10 – 12</td>
            <td className="py-4 px-6 font-mono font-medium">5</td>
            <td className="py-4 px-6 font-mono font-semibold text-graphite">€2.000</td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-medium text-mint">
                Actief
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-paper/40">
            <td className="py-4 px-6 font-display font-semibold text-graphite">Tier 6</td>
            <td className="py-4 px-6 text-graphite-muted">Maand 13 – 15</td>
            <td className="py-4 px-6 font-mono font-medium">5</td>
            <td className="py-4 px-6 font-mono font-semibold text-graphite">€2.000</td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center rounded-full bg-indigo/15 px-2.5 py-0.5 text-xs font-medium text-indigo">
                Eindcyclus · Schuldvrij
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </FadeIn>
  );
}