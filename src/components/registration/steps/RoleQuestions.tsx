
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "../MultiStepForm";

interface RoleQuestionsProps {
  role: Role;
  answers: Record<string, string>;
  onUpdate: (answers: Record<string, string>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Define questions per role
const roleQuestions: Record<Role, { id: string; question: string }[]> = {
  member: [
    { id: "financiele_situatie", question: "Wat is uw huidige financiële situatie?" },
    { id: "voornaamste_doel", question: "Wat is uw voornaamste doel met Investbotiq?" }
  ],
  student: [
    { id: "studie", question: "Wat studeert u op dit moment?" },
    { id: "instituut", question: "Aan welk instituut bent u verbonden?" }
  ],
  ouder: [
    { id: "voor_wie", question: "Voor welk kind/volwassene vult u dit formulier in?" },
    { id: "zelf_investeren", question: "Wilt u ook investeren namens uzelf?" }
  ],
  affiliated: [
    { id: "promotie_manier", question: "Op welke manier wilt u Investbotiq promoten?" },
    { id: "bereik_netwerk", question: "Heeft u al een bereik of netwerk?" }
  ],
  freelancer: [
    { id: "expertise", question: "Wat is uw expertise of vakgebied?" },
    { id: "kvk", question: "Heeft u een KVK-inschrijving?" }
  ],
  ondernemer: [
    { id: "bedrijf_naam", question: "Wat is de naam van uw bedrijf?" },
    { id: "maandelijkse_omzet", question: "Hoeveel omzet draait u gemiddeld per maand?" }
  ],
  artiest: [
    { id: "discipline", question: "Wat is uw discipline? (bijv. muziek, dans, beeldende kunst)" },
    { id: "eerder_gepubliceerd", question: "Heeft u eerder gepubliceerd of opgetreden?" }
  ]
};

export const RoleQuestions = ({ role, answers, onUpdate, onNext, onBack }: RoleQuestionsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const questions = roleQuestions[role] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...answers, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    questions.forEach(question => {
      if (!answers[question.id]) {
        newErrors[question.id] = "Dit veld is verplicht";
      }
    });
    
    setErrors(newErrors);
    
    // If no errors, proceed to next step
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  // Get role label for display
  const getRoleLabel = (roleId: Role): string => {
    const roleMappings: Record<Role, string> = {
      member: "Member",
      student: "Student",
      ouder: "Ouder",
      affiliated: "Affiliated",
      freelancer: "Freelancer",
      ondernemer: "Ondernemer",
      artiest: "Artiest"
    };
    return roleMappings[roleId] || roleId;
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-center text-ink">Vragen voor {getRoleLabel(role)}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id}>{question.question} <span className="text-destructive">*</span></Label>
            <Input
              id={question.id}
              name={question.id}
              value={answers[question.id] || ""}
              onChange={handleChange}
              className={errors[question.id] ? "border-destructive" : ""}
            />
            {errors[question.id] && (
              <p className="text-destructive text-sm">{errors[question.id]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button type="button" variant="ghost" onClick={onBack} className="text-ink-muted hover:text-ink">
            Terug
          </Button>
          <Button type="submit" className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 text-white shadow-glow hover:brightness-110">
            Volgende
          </Button>
        </div>
      </form>
    </div>
  );
};
