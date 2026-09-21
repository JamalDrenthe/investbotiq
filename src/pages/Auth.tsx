import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { ThreeScene } from "@/components/three/ThreeScene";
import { LumenCtaButton } from "@/components/three/LumenCta";
import BrandLogo from "@/components/BrandLogo";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user && userRole) {
      const timer = setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin", { replace: true });
        } else if (userRole === "member") {
          navigate("/member/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 100);
      return () => clearTimeout(timer);
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) toast.success("Succesvol ingelogd");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Fout bij inloggen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="band-canvas relative grid min-h-screen w-full overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
      {/* Storytelling side — threeui OrbitalSphereBackground as the security/network metaphor */}
      <div className="relative isolate hidden min-h-screen overflow-hidden lg:block">
        <ThreeScene
          kind="orbital-sphere"
          className="!absolute !inset-0"
          speed={0.8}
          particleSize={0.016}
          particleOpacity={0.85}
          orbitOpacity={0.3}
          haloOpacity={0.22}
          hue={-16}
          scale={1.05}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,7,15,0.7) 0%, rgba(5,7,15,0.1) 35%, rgba(5,7,15,0.15) 65%, rgba(5,7,15,0.95) 100%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <BrandLogo variant="dark" size="lg" to="/" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <div className="eyebrow mb-6">Invest Bot IQ</div>
            <h1 className="font-display text-display-md font-semibold tracking-[-0.03em] text-ink xl:text-display-lg">
              Laat de <span className="text-gradient-light">IQ Bot</span> automatisch jouw cashflow opbouwen
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink-muted">Geen kennis vereist, geen zorgen. Gewoon laten groeien.</p>
          </motion.div>
          <div className="flex items-center gap-3 text-sm text-ink-faint">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            Tijdelijke lokale login
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(99,91,255,0.35) 0%, rgba(5,7,15,0) 70%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass card-glass--floating relative w-full max-w-md rounded-ds-xl p-8 sm:p-10"
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="icon-tile mb-7">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h2 className="font-display text-heading font-semibold tracking-[-0.02em] text-ink">Inloggen</h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Tijdelijke lokale login: elk geldig e-mailadres en minimaal vier tekens als wachtwoord werkt.
          </p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                className="input-canvas"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                placeholder="Wachtwoord"
                className="input-canvas"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <LumenCtaButton type="submit" className="mt-2 w-full" disabled={loading} dot={!loading}>
              {loading ? "Bezig..." : "Inloggen"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </LumenCtaButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
