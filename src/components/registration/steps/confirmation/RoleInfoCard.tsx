
import { Card, CardContent } from "@/components/ui/card";
import { Role } from "../../MultiStepForm";

interface RoleInfoCardProps {
  role: Role;
  questions: { id: string; question: string }[];
  answers: Record<string, string>;
}

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

export const RoleInfoCard = ({ role, questions, answers }: RoleInfoCardProps) => {
  return (
    <Card className="border-white/10 bg-white/[0.03] text-ink shadow-none">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3 text-indigo-300">Rol specifieke informatie - {getRoleLabel(role)}</h3>
        <dl className="grid grid-cols-1 gap-3">
          {questions.map((question) => (
            <div key={question.id}>
              <dt className="text-sm font-medium text-muted-foreground">{question.question}</dt>
              <dd>{answers[question.id] || "-"}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};
