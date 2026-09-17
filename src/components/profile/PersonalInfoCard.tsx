import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LocalUser, supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/utils/date-utils";

interface PersonalInfoCardProps {
  user: LocalUser;
}

const PersonalInfoCard = ({ user }: PersonalInfoCardProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: profile, refetch } = useQuery({
    queryKey: ["userProfile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      
      if (data.telefoonnummer) {
        setPhoneNumber(data.telefoonnummer);
      }
      
      return data;
    },
    enabled: !!user,
  });

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({ telefoonnummer: phoneNumber })
        .eq("id", user.id);
      
      if (error) throw error;
      
      await refetch();
      toast.success("Profiel bijgewerkt");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Er is een fout opgetreden bij het bijwerken van het profiel");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profiel Informatie</CardTitle>
        <CardDescription>
          Bekijk en beheer uw persoonlijke gegevens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>E-mail</Label>
            <div className="text-sm mt-1 text-muted-foreground">{user.email}</div>
          </div>
          
          <div>
            <Label>Naam</Label>
            <div className="text-sm mt-1 text-muted-foreground">
              {profile?.voornaam && profile?.achternaam 
                ? `${profile.voornaam} ${profile.achternaam}`
                : "Niet ingesteld"}
            </div>
          </div>
          
          <div>
            <Label>Account aangemaakt</Label>
            <div className="text-sm mt-1 text-muted-foreground">
              {user.created_at ? formatDate(user.created_at) : "Onbekend"}
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Telefoonnummer</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Bijv. 0612345678"
              className="flex-1"
            />
            <Button onClick={handleUpdateProfile} disabled={isUpdating}>
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Opslaan"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
