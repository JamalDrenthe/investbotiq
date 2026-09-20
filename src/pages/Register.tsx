import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MultiStepForm } from "@/components/registration/MultiStepForm";
import { ThreeScene } from "@/components/three/ThreeScene";
import { BRAND_ICON, BRAND_WORDMARK } from "@/components/publicNav";

const Register = () => {
  return (
    <div className="band-canvas relative min-h-screen overflow-hidden px-4 py-10 md:py-16">
      {/* threeui DotMatrixBackground — calm shader field behind the registration flow */}
      <ThreeScene
        kind="dot-matrix"
        className="!absolute !inset-0"
        speed={0.5}
        gridScale={60}
        mouseAmount={0.04}
        pulseSpeed={0.28}
        radius={0.12}
        opacity={0.35}
        hue={-20}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,91,255,0.3) 0%, rgba(5,7,15,0) 55%), linear-gradient(180deg, rgba(5,7,15,0.15), rgba(5,7,15,0.7))",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={BRAND_ICON} alt="Invest Bot IQ Icon" className="logo-invert h-9 w-auto" />
            <img src={BRAND_WORDMARK} alt="Invest Bot IQ Logo" className="logo-invert hidden h-4 w-auto sm:block" />
          </Link>
          <Link to="/" className="nav-pill inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" /> Terug naar home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass card-glass--floating p-6 md:p-10"
        >
          <div className="mb-8 text-center">
            <div className="eyebrow justify-center">Aanmelden</div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Aanmelden bij Investbotiq
            </h1>
          </div>
          <div className="register-form">
            <MultiStepForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
