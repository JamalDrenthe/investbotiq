
import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TierSelectorProps {
  selectedTier: string;
  onTierChange: (value: string) => void;
}

export default function TierSelector({ selectedTier, onTierChange }: TierSelectorProps) {
  return (
    <FadeIn delay={0.3}>
      <div className="mb-10 max-w-xs mx-auto">
        <Select value={selectedTier} onValueChange={onTierChange}>
          <SelectTrigger className="w-full card-paper border-paper-hairline text-graphite shadow-level-1 focus:ring-1 focus:ring-indigo transition-colors">
            <SelectValue placeholder="Selecteer een Tier Plan" />
          </SelectTrigger>
          <SelectContent 
            className="bg-paper-card border border-paper-hairline shadow-level-3 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-sm text-graphite"
            position="popper"
            side="bottom"
            align="center"
            sideOffset={4}
          >
            <SelectItem value="inbotiq2" className="hover:bg-paper cursor-pointer font-medium">
              InBotIQ2 (Tier 2 – 6)
            </SelectItem>
            <SelectItem value="inbotiq1" className="text-graphite-faint hover:bg-paper/50 cursor-not-allowed" disabled>
              InBotIQ1 Tier 1 (In ontwikkeling)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FadeIn>
  );
}
