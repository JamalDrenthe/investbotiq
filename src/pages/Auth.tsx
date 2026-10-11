import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { ThreeScene } from "@/components/three/ThreeScene";
import { LumenCtaButton } from "@/components/three/LumenCta";
import BrandLogo from "@/components/BrandLogo";
import PreferenceToggles from "@/components/PreferenceToggles";
import { usePreferences } from "@/lib/preferences";
import { isAuthAvailable, isDemoModeEnabled, signInWithPassword, signInWithGoogle, checkRedirectResult } from "@/lib/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { t } = usePreferences();

  useEffect(() => {
    void checkRedirectResult();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success(t("Succesvol ingelogd met Google"));
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (err?.code === "auth/popup-closed-by-user") {
        return;
      }
      toast.error(error instanceof Error ? error.message : t("Fout bij inloggen met Google"));
    } finally {
      setLoading(false);
    }
  };

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
      toast.error(t("Vul alstublieft zowel e-mail als wachtwoord in"));
      return;
    }

    setLoading(true);

    try {
      await signInWithPassword(email, password);
      toast.success(t("Succesvol ingelogd"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("Fout bij inloggen"));
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
        <div aria-hidden="true" className="scene-veil scene-veil--auth" />
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
              {t("Laat de")} <span className="text-gradient-light">IQ Bot</span> {t("automatisch jouw cashflow opbouwen")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink-muted">{t("Geen kennis vereist, geen zorgen. Gewoon laten groeien.")}</p>
          </motion.div>
          <div className="flex items-center gap-3 text-sm text-ink-faint">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            {isDemoModeEnabled ? t("Lokale demo-login") : t("Beveiligde Firebase-login")}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
        <div className="absolute right-6 top-6 z-10">
          <PreferenceToggles />
        </div>
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
          <h2 className="font-display text-heading font-semibold tracking-[-0.02em] text-ink">{t("Inloggen")}</h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            {isDemoModeEnabled
              ? t("Demo-login is lokaal ingeschakeld; gebruik geen echte persoonsgegevens.")
              : t("Log in met het e-mailadres en wachtwoord van je Investbotiq-account.")}
          </p>
          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || !isAuthAvailable}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {t("Inloggen met Google")}
            </button>
            <div className="relative flex items-center justify-center">
              <span className="w-full border-t border-white/10" />
              <span className="bg-ink-canvas px-3 text-xs uppercase tracking-wider text-ink-faint">of</span>
              <span className="w-full border-t border-white/10" />
            </div>
          </div>
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                {t("E-mail")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("E-mail")}
                className="input-canvas"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                {t("Wachtwoord")}
              </label>
              <input
                id="password"
                type="password"
                placeholder={t("Wachtwoord")}
                className="input-canvas"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                minLength={isDemoModeEnabled ? 4 : 6}
                required
              />
            </div>
            {!isAuthAvailable && (
              <p role="status" className="text-sm text-amber-300">
                {t("Firebase Authentication is nog niet geconfigureerd voor deze omgeving.")}
              </p>
            )}
            <LumenCtaButton type="submit" className="mt-2 w-full" disabled={loading || !isAuthAvailable} dot={!loading}>
              {loading ? t("Bezig...") : t("Inloggen")}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </LumenCtaButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
