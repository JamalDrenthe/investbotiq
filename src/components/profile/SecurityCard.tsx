
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updatePassword } from "@/lib/auth";

const SecurityCard = () => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [showPasswordForm, setShowPasswordForm] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Wachtwoorden komen niet overeen");
      return;
    }
    
    try {
      setIsUpdating(true);
      
      await updatePassword(password);
      
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
  );
};

export default SecurityCard;
