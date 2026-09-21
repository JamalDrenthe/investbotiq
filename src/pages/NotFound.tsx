import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import { ThreeScene } from "@/components/three/ThreeScene";
import { LumenCtaButton, LumenCtaLink } from "@/components/three/LumenCta";
import { usePreferences } from "@/lib/preferences";

const NotFound = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { t } = usePreferences();

  const getDashboardLink = () => {
    if (userRole === "admin") return "/admin";
    if (userRole === "member") return "/member/dashboard";
    return "/";
  };

  const dashboardLabel = userRole === "admin" 
    ? t("Terug naar Admin Dashboard") 
    : userRole === "member" 
      ? t("Terug naar Member Dashboard") 
      : t("Terug naar Home");

  return (
    <div className="band-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      {/* threeui OrbitalSphereBackground — lost-in-orbit motif for the 404 */}
      <ThreeScene
        kind="orbital-sphere"
        className="!absolute !inset-0"
        speed={0.6}
        particleSize={0.014}
        particleOpacity={0.7}
        orbitOpacity={0.25}
        haloOpacity={0.18}
        hue={-16}
        scale={1.15}
      />
      <div aria-hidden="true" className="scene-veil scene-veil--notfound" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card-glass card-glass--floating relative z-10 w-full max-w-lg p-8 text-center md:p-10"
      >
        <div className="eyebrow justify-center">{t("Fout 404")}</div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tnum mt-6 font-display text-7xl font-semibold leading-none tracking-[-0.05em] text-gradient-light md:text-8xl"
        >
          404
        </motion.div>

        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {t("Pagina niet gevonden")}
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-muted">
          {t("Deze pagina is momenteel niet beschikbaar of bestaat niet.")}
          {userRole && t(" De IQ Bot is eraan aan het werken.")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LumenCtaButton variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> {t("Ga terug")}
          </LumenCtaButton>
          <LumenCtaLink to={getDashboardLink()} dot>
            <Home className="h-4 w-4" /> {dashboardLabel}
          </LumenCtaLink>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
