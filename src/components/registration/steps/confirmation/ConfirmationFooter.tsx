
import { Button } from "@/components/ui/button";

interface ConfirmationFooterProps {
  onBack: () => void;
  onSubmit: () => void;
  disabled: boolean;
  submitting: boolean;
}

export const ConfirmationFooter = ({ onBack, onSubmit, disabled, submitting }: ConfirmationFooterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
      <Button type="button" variant="ghost" onClick={onBack} disabled={submitting} className="w-full sm:w-auto text-ink-muted hover:text-ink">
        Terug
      </Button>
      <Button onClick={onSubmit} disabled={disabled || submitting} className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 py-6 text-base text-white shadow-glow hover:brightness-110 sm:w-auto sm:px-10">
        {submitting ? "Aanmelden..." : "Aanmelden"}
      </Button>
    </div>
  );
};
