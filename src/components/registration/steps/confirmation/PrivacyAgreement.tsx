
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PrivacyAgreementProps {
  agreed: boolean;
  onAgreeChange: (agreed: boolean) => void;
}

export const PrivacyAgreement = ({ agreed, onAgreeChange }: PrivacyAgreementProps) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
      <Checkbox 
        id="privacy" 
        checked={agreed} 
        onCheckedChange={(checked) => onAgreeChange(checked as boolean)}
      />
      <Label htmlFor="privacy" className="text-sm">
        Ik ga akkoord met de <span className="underline text-indigo-300 cursor-pointer">privacyverklaring</span> en de <span className="underline text-indigo-300 cursor-pointer">algemene voorwaarden</span>
      </Label>
    </div>
  );
};
