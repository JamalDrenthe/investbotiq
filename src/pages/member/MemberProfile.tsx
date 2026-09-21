
import React, { useState } from "react";
import MemberPortalLayout from "@/components/member/MemberPortalLayout";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { withRoleGuard } from "@/utils/withRoleGuard";

const MemberProfile = () => {
  const { user, loading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: profile, refetch } = useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      const profile = (data ?? {}) as { telefoonnummer?: string; voornaam?: string; achternaam?: string };
      if (profile.telefoonnummer) {
        setPhoneNumber(profile.telefoonnummer);
      }

      return profile;
    },
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

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

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Wachtwoorden komen niet overeen");
      return;
    }
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      setPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
      toast.success("Wachtwoord bijgewerkt");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Er is een fout opgetreden bij het bijwerken van het wachtwoord");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <MemberPortalLayout>
      <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Mijn Profiel</h1>
            
            <div className="space-y-6">
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Beveiliging</CardTitle>
                  <CardDescription>
                    Beheer uw aanmeldgegevens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {showPasswordForm ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password">Nieuw wachtwoord</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                        Wachtwoord wijzigen
                      </Button>
                    </div>
                  )}
                </CardContent>
                {showPasswordForm && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowPasswordForm(false)}>
                      Annuleren
                    </Button>
                    <Button onClick={handleUpdatePassword} disabled={isUpdating}>
                      {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Wachtwoord bijwerken"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
      </div>
    </MemberPortalLayout>
  );
};

export default withRoleGuard(MemberProfile, ["member"]);
