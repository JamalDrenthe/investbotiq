
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { RoleSelector } from "./steps/RoleSelector";
import { GeneralInfo } from "./steps/GeneralInfo";
import { RoleQuestions } from "./steps/RoleQuestions";
import { Confirmation } from "./steps/Confirmation";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export type Role = "member" | "student" | "ouder" | "affiliated" | "freelancer" | "ondernemer" | "artiest";

interface FormData {
  role: Role;
  general: {
    voornaam: string;
    achternaam: string;
    woonplaats: string;
    geboortedatum: string;
    email: string;
    telefoon: string;
    hoe_hoorde_u_van_ons: string;
    referral: string;
    plus_1: string;
  };
  answers: Record<string, string>;
}

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    role: "member",
    general: {
      voornaam: "",
      achternaam: "",
      woonplaats: "",
      geboortedatum: "",
      email: "",
      telefoon: "",
      hoe_hoorde_u_van_ons: "",
      referral: "",
      plus_1: "",
    },
    answers: {},
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      // Insert registration lead
      const { error: registrationError } = await supabase.from("registration_leads").insert({
        role: formData.role,
        general: formData.general,
        answers: formData.answers,
      });

      if (registrationError) throw registrationError;

      // Send notification to admin
      await supabase.from("notifications").insert({
        type: "lead",
        user_id: "system",
        bericht: `Nieuwe aanmelding ontvangen van ${formData.general.voornaam} ${formData.general.achternaam}`,
      });

      // Send welcome email via edge function
      const welcomeResponse = await supabase.functions.invoke('send-welcome-email', {
        body: JSON.stringify({
          firstName: formData.general.voornaam,
          email: formData.general.email,
          role: formData.role
        })
      });

      if (welcomeResponse.error) {
        console.error('Welcome email error:', welcomeResponse.error);
        toast.warning('Aanmelding gelukt, maar kon geen welkomstmail verzenden');
      } else {
        toast.success('Aanmelding succesvol verzonden!');
      }

      navigate("/register/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Er is een fout opgetreden bij het verzenden van uw aanmelding");
    }
  };

  const progress = (step / 4) * 100;
  const stepLabels = ["Kies uw rol", "Persoonlijke gegevens", "Vragen", "Bevestig uw aanmelding"];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-ink-faint">
          <span>
            Stap <span className="tnum text-ink">{step}</span> van 4
          </span>
          <span className="text-indigo-300">{stepLabels[step - 1]}</span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="hidden grid-cols-4 gap-2 sm:grid">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                    done
                      ? "bg-mint/20 text-mint"
                      : active
                        ? "bg-indigo-500 text-white shadow-glow"
                        : "bg-white/5 text-ink-faint"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" /> : n}
                </span>
                <span className={`truncate text-xs ${active ? "font-semibold text-ink" : "text-ink-faint"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
        {step === 1 && (
          <RoleSelector
            selected={formData.role}
            onSelect={(role) => {
              setFormData({ ...formData, role });
              handleNext();
            }}
          />
        )}

        {step === 2 && (
          <GeneralInfo
            data={formData.general}
            onUpdate={(general) => setFormData({ ...formData, general })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <RoleQuestions
            role={formData.role}
            answers={formData.answers}
            onUpdate={(answers) => setFormData({ ...formData, answers })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 4 && (
          <Confirmation
            formData={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
