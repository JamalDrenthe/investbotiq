import { useEffect, useRef } from "react";
import { createIqBotRenderer, IQ_BOT_DEFAULTS, type IqBotOptions } from "./iqBotRenderer";
import { createPointerTracker } from "./pointerInteraction";

export type IqBotProps = Partial<IqBotOptions> & { className?: string };

/**
 * The interactive IQ Bot: a holographic bot head that looks at the cursor,
 * accelerates its gyroscopic rings on hover, and fires a shockwave on click.
 * Pointer events are captured on the parent surface so overlaid UI keeps working.
 */
export function IqBot({ className = "", ...props }: IqBotProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...IQ_BOT_DEFAULTS, ...props });
  optionsRef.current = { ...IQ_BOT_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const pointer = createPointerTracker(host, { follow: 0.09, pulseDuration: 1.5 });
    const renderer = createIqBotRenderer(canvas, () => optionsRef.current, () => pointer.state);
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(Math.max(1, bounds.width), Math.max(1, bounds.height));
    };

    const tick = (now: number) => {
      pointer.update(now);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      renderer.render(dt, now * 0.001);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const visibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!document.hidden && visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    resizeObserver.observe(host);
    intersection.observe(host);
    document.addEventListener("visibilitychange", visibility);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      pointer.dispose();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`threeui-background iq-bot${className ? ` ${className}` : ""}`}
      style={{ background: "transparent" }}
    >
      <canvas ref={canvasRef} style={{ filter: `hue-rotate(${optionsRef.current.hue}deg)` }} />
    </div>
  );
}
