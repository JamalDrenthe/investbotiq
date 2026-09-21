import { useEffect, useRef } from "react";
import {
  createOrbitalSphereRenderer,
  ORBITAL_SPHERE_DEFAULTS,
  type OrbitalSphereOptions,
} from "./orbitalSphereRenderer";
import { createPointerTracker } from "./pointerInteraction";

export type OrbitalSphereBackgroundProps = Partial<OrbitalSphereOptions> & { className?: string };

/**
 * Ported from threeui `OrbitalSphereBackground`: a particle sphere with orbit rings and nodes.
 * Pauses when off-screen or when the tab is hidden; disposes all GPU resources on unmount.
 * Reacts to the pointer on its parent surface: turns towards the cursor, speeds up on hover,
 * bursts on click and picks up spin from fast flicks.
 */
export function OrbitalSphereBackground({ className = "", ...props }: OrbitalSphereBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...ORBITAL_SPHERE_DEFAULTS, ...props });
  optionsRef.current = { ...ORBITAL_SPHERE_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const pointer = createPointerTracker(host, { follow: 0.06, pulseDuration: 1.8 });
    const renderer = createOrbitalSphereRenderer(canvas, () => optionsRef.current, () => pointer.state);
    let frame = 0;
    let visible = true;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };

    const tick = (now: number) => {
      pointer.update(now);
      renderer.render();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) {
        frame = requestAnimationFrame(tick);
      } else if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(host);
    intersection.observe(host);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      pointer.dispose();
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className={`threeui-background orbital-sphere${className ? ` ${className}` : ""}`}>
      <canvas ref={canvasRef} style={{ filter: `hue-rotate(${optionsRef.current.hue}deg)` }} />
    </div>
  );
}
