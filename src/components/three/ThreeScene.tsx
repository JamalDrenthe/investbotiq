import { lazy, Suspense, useEffect, useState, type ComponentProps } from "react";

const EnergyOrbLazy = lazy(() => import("./EnergyOrb").then((m) => ({ default: m.EnergyOrb })));
const OrbitalSphereLazy = lazy(() =>
  import("./OrbitalSphereBackground").then((m) => ({ default: m.OrbitalSphereBackground })),
);
const DotMatrixLazy = lazy(() => import("./DotMatrixBackground").then((m) => ({ default: m.DotMatrixBackground })));
const PredictiveArcLazy = lazy(() => import("./PredictiveArcCanvas").then((m) => ({ default: m.PredictiveArcCanvas })));

type EnergyOrbProps = ComponentProps<typeof EnergyOrbLazy>;
type OrbitalSphereProps = ComponentProps<typeof OrbitalSphereLazy>;
type DotMatrixProps = ComponentProps<typeof DotMatrixLazy>;
type PredictiveArcProps = ComponentProps<typeof PredictiveArcLazy>;

export type ThreeSceneProps =
  | ({ kind: "energy-orb" } & EnergyOrbProps)
  | ({ kind: "orbital-sphere" } & OrbitalSphereProps)
  | ({ kind: "dot-matrix" } & DotMatrixProps)
  | ({ kind: "predictive-arc" } & PredictiveArcProps);

function useCanRender3D() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl") || probe.getContext("experimental-webgl");
    setReady(Boolean(gl));
  }, []);
  return ready;
}

const FALLBACK: Record<ThreeSceneProps["kind"], string> = {
  "energy-orb":
    "radial-gradient(circle at 50% 55%, rgba(99,91,255,0.55) 0%, rgba(34,211,238,0.25) 22%, rgba(5,3,14,0) 55%), #05030e",
  "orbital-sphere":
    "radial-gradient(circle at 75% 50%, rgba(139,92,246,0.35) 0%, rgba(5,7,15,0) 45%), #05070f",
  "dot-matrix":
    "radial-gradient(circle at 50% 50%, rgba(99,91,255,0.18) 0%, rgba(5,7,15,0) 60%), #05070f",
  "predictive-arc":
    "radial-gradient(ellipse at 50% 100%, rgba(99,91,255,0.35) 0%, rgba(5,7,15,0) 60%), #05070f",
};

/**
 * Lazy, safe wrapper around the ported threeui components.
 * Renders a static gradient when WebGL is unavailable or the user prefers reduced motion.
 */
export function ThreeScene(props: ThreeSceneProps) {
  const canRender = useCanRender3D();
  const fallback = (
    <div
      className={`threeui-background ${props.className ?? ""}`}
      style={{ background: props.kind === "predictive-arc" && props.mode === "light" ? "#f6f7fb" : FALLBACK[props.kind] }}
    />
  );

  if (!canRender) return fallback;

  const { kind, ...rest } = props;
  let scene: JSX.Element;
  switch (kind) {
    case "energy-orb":
      scene = <EnergyOrbLazy {...(rest as EnergyOrbProps)} />;
      break;
    case "orbital-sphere":
      scene = <OrbitalSphereLazy {...(rest as OrbitalSphereProps)} />;
      break;
    case "dot-matrix":
      scene = <DotMatrixLazy {...(rest as DotMatrixProps)} />;
      break;
    case "predictive-arc":
      scene = <PredictiveArcLazy {...(rest as PredictiveArcProps)} />;
      break;
  }

  return <Suspense fallback={fallback}>{scene}</Suspense>;
}
