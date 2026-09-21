import React from "react";
import { motion } from "framer-motion";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { ThreeScene } from "@/components/three/ThreeScene";
import { usePreferences } from "@/lib/preferences";

interface InfoPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showGradientBackground?: boolean;
}

export default function InfoPageLayout({ children, title, subtitle, eyebrow }: InfoPageLayoutProps) {
  const { t } = usePreferences();
  return (
    <div className="band-canvas min-h-screen w-full overflow-x-hidden">
      <PublicHeader />

      <section className="relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        {/* threeui DotMatrixBackground — quiet shader field behind every info-page title */}
        <ThreeScene
          kind="dot-matrix"
          className="!absolute !inset-0"
          speed={0.6}
          gridScale={64}
          mouseAmount={0.05}
          pulseSpeed={0.3}
          radius={0.13}
          opacity={0.4}
          hue={-20}
        />
        <div aria-hidden="true" className="scene-veil scene-veil--info" />
        <div className="relative mx-auto w-full max-w-content px-6 lg:px-10">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
            >
              {t(eyebrow)}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-display-md lg:text-display-lg"
          >
            {t(title)}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted md:text-xl md:leading-9"
            >
              {t(subtitle)}
            </motion.p>
          )}
        </div>
      </section>

      <div className="band-paper info-body">{children}</div>

      <PublicFooter />
    </div>
  );
}
