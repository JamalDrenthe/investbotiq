import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ThreeScene } from "@/components/three/ThreeScene";
import { LumenCtaLink } from "@/components/three/LumenCta";

const RegisterSuccess = () => {
  return (
    <div className="band-canvas relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* threeui OrbitalSphereBackground — the bot "takes your request into orbit" */}
      <ThreeScene
        kind="orbital-sphere"
        className="!absolute !inset-0"
        speed={0.7}
        particleSize={0.015}
        particleOpacity={0.8}
        orbitOpacity={0.28}
        haloOpacity={0.2}
        hue={-16}
        scale={1.1}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(5,7,15,0) 0%, rgba(5,7,15,0.5) 60%, rgba(5,7,15,0.95) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1.01, 0.32, 1] }}
        className="card-glass card-glass--floating relative z-10 w-full max-w-md p-8 text-center md:p-10"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-cyan shadow-glow"
        >
          <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
        </motion.div>

        <div className="eyebrow mt-8 justify-center">Aanmelding ontvangen</div>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Bedankt voor uw aanmelding!
        </h1>

        <motion.p
          className="mt-4 text-base leading-7 text-ink-muted md:text-lg md:leading-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-semibold text-ink">De IQ Bot</span> bekijkt uw aanvraag.<br/>
          U ontvangt binnen <span className="tnum font-semibold text-ink">48 uur</span> bericht via e-mail.<br/>
          Wij nemen zo spoedig mogelijk contact met u op.
        </motion.p>

        <div className="mt-8">
          <LumenCtaLink to="/" dot className="w-full">Terug naar home</LumenCtaLink>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterSuccess;
