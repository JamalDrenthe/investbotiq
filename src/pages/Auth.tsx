
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      console.log("Auth page - Already logged in as:", userRole, "with email:", user.email);
      
      // Add a slight delay to ensure role is properly set
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin', { replace: true });
        } else if (userRole === 'member') {
          navigate('/member/dashboard', { replace: true });
        } else {
          // Default to home page for guests or unknown roles
          navigate('/', { replace: true });
        }
      }, 100);
    }
  }, [user, userRole, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Vul alstublieft zowel e-mail als wachtwoord in");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data.user) {
        toast.success("Succesvol ingelogd");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Fout bij inloggen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inloggen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Bezig..." : "Inloggen"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Tijdelijke lokale login: elk geldig e-mailadres en minimaal vier tekens als wachtwoord werkt.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
