
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10142a] p-4">
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-2xl backdrop-blur-2xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between p-10 text-white md:flex lg:p-14">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/lovable-uploads/f072ab55-6051-4ac3-a481-2047383cf59f.png" alt="Invest Bot IQ Icon" className="h-11 w-auto" />
              <span className="display-font text-xl font-bold">Invest Bot IQ</span>
            </Link>
            <div className="mt-24 max-w-sm">
              <span className="eyebrow border-white/20 bg-white/10 text-cyan-200">Invest Bot IQ</span>
              <h1 className="display-font mt-6 text-4xl font-bold leading-tight lg:text-5xl">Laat de IQ Bot automatisch jouw cashflow opbouwen</h1>
              <p className="mt-5 text-base leading-7 text-slate-300">Geen kennis vereist, geen zorgen. Gewoon laten groeien.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400"><Sparkles className="h-4 w-4 text-cyan-300" /> Tijdelijke lokale login</div>
        </div>
        <Card className="rounded-none border-0 bg-white p-7 shadow-none sm:p-10 lg:p-14">
        <CardHeader className="p-0 pb-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><LockKeyhole className="h-5 w-5" /></div>
          <CardTitle className="display-font text-3xl font-bold tracking-tight text-slate-900">Inloggen</CardTitle>
          <p className="mt-2 text-sm text-slate-500">Tijdelijke lokale login: elk geldig e-mailadres en minimaal vier tekens als wachtwoord werkt.</p>
        </CardHeader>
        <CardContent className="p-0">
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
            <Button type="submit" className="h-12 w-full rounded-xl bg-[#635bff] font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600" disabled={loading}>
              {loading ? "Bezig..." : "Inloggen"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Auth;
