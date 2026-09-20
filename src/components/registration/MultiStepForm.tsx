
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RoleSelector } from "./steps/RoleSelector";
import { GeneralInfo } from "./steps/GeneralInfo";
import { RoleQuestions } from "./steps/RoleQuestions";
import { Confirmation } from "./steps/Confirmation";
import { Progress } from "@/components/ui/progress";
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

  return (
    <div className="space-y-8">
      <Progress value={progress} className="h-2 w-full bg-white/10" />
      
      <div className="space-y-6">
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
      </div>
    </div>
  );
};
