
import { Card, CardContent } from "@/components/ui/card";

interface PersonalInfoCardProps {
  generalInfo: {
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
}

export const PersonalInfoCard = ({ generalInfo }: PersonalInfoCardProps) => {
  return (
    <Card className="border-white/10 bg-white/[0.03] text-ink shadow-none">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3 text-indigo-300">Persoonlijke gegevens</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Naam</dt>
            <dd>{generalInfo.voornaam} {generalInfo.achternaam}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Woonplaats</dt>
            <dd>{generalInfo.woonplaats}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Geboortedatum</dt>
            <dd>{generalInfo.geboortedatum}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">E-mailadres</dt>
            <dd>{generalInfo.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Telefoonnummer</dt>
            <dd>{generalInfo.telefoon}</dd>
          </div>
          {generalInfo.hoe_hoorde_u_van_ons && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Hoe gehoord van ons</dt>
              <dd>{generalInfo.hoe_hoorde_u_van_ons}</dd>
            </div>
          )}
          {generalInfo.referral && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Referral</dt>
              <dd>{generalInfo.referral}</dd>
            </div>
          )}
          {generalInfo.plus_1 && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Plus één</dt>
              <dd>{generalInfo.plus_1}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};
