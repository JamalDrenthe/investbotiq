import React, { useEffect, useRef } from "react";
import "./instrumentGauge.css";

export interface GaugeSpec {
  min: number;
  max: number;
  /** Gauge arc starts at -135deg with a 270deg sweep by default */
  start?: number;
  sweep?: number;
  majorStep: number;
  minorPerMajor: number;
  /** needle rest position during the instrument self-test */
  idle: number;
  /** live value the needle settles on */
  value: number;
  /** formatted readout shown in the centre stack */
  format?: (v: number) => string;
  /** numeral labels on the dial */
  numeral?: (v: number) => string;
  /** accent colour for ticks beyond this threshold gets `alert` tint */
  alertFrom?: number;
  accent: string;
  face: string;
  label: string;
  unit?: string;
  /** text shown when the live value is non-numeric (e.g. "In 4 min") */
  readoutText?: string;
}

const angleFor = (spec: GaugeSpec, value: number) => {
  const start = spec.start ?? -135;
  const sweep = spec.sweep ?? 270;
  return start + ((value - spec.min) / (spec.max - spec.min)) * spec.sweep;
};

/**
 * Analogue instrument gauge ported from the performance-diagnostics design:
 * machined plate, bezel ring, tick scale, sweeping needle with self-test cycle.
 */
export const InstrumentGauge = ({ spec }: { spec: GaugeSpec }) => {
  const needleRef = useRef<HTMLDivElement>(null);
  const flutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const needle = needleRef.current;
    const flutter = flutterRef.current;
    if (!needle) return;

    const setAngle = (value: number, duration = 1200) => {
      needle.style.setProperty("--needle-duration", `${duration}ms`);
      needle.style.setProperty("--angle", `${angleFor(spec, value)}deg`);
    };

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    setAngle(spec.idle, 0);

    if (reduceMotion) {
      setAngle(spec.value, 0);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    // instrument self-test: full-scale sweep, fall back to rest, settle on the live reading
    const cycle = () => {
      if (cancelled || !needle) return;
      flutter?.removeAttribute("data-live");
      setAngle(spec.max, 1100);
      timers.push(window.setTimeout(() => setAngle(spec.idle, 900), 1350));
      timers.push(window.setTimeout(() => setAngle(spec.value, 1200), 2500));
      timers.push(window.setTimeout(() => flutter?.setAttribute("data-live", ""), 3900));
    };

    cycle();
    const interval = window.setInterval(cycle, 8000);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticks: { angle: number; major: boolean; color: string }[] = [];
  const step = spec.majorStep / spec.minorPerMajor;
  const count = Math.round((spec.max - spec.min) / step);
  for (let i = 0; i <= count; i += 1) {
    const value = spec.min + i * step;
    const major = i % spec.minorPerMajor === 0;
    const color =
      spec.alertFrom != null && value >= spec.alertFrom
        ? "rgba(248,113,113,0.95)"
        : "rgba(255,255,255,0.6)";
    ticks.push({ angle: angleFor(spec, value), major, color });
  }

  const numerals: { angle: number; text: string }[] = [];
  const numCount = Math.round((spec.max - spec.min) / spec.majorStep);
  for (let i = 0; i <= numCount; i += 1) {
    const value = Math.round((spec.min + i * spec.majorStep) * 1000) / 1000;
    const angle = angleFor(spec, value);
    numerals.push({ angle, text: spec.numeral ? spec.numeral(value) : String(value) });
  }

  const readout = spec.readoutText ?? (spec.format ? spec.format(spec.value) : String(spec.value));

  return (
    <div className="iqg-card group">
      <div className="iqg-plate">
        <div className="iqg-shell">
          <div className="iqg-bezel">
            <div className="iqg-face" style={{ background: spec.face }}>
              {/* machined sunburst */}
              <div
                className="iqg-layer"
                style={{
                  background: "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.05) 0deg 1.4deg, rgba(0,0,0,0) 1.4deg 2.8deg)",
                  maskImage: "radial-gradient(closest-side, #000 0%, #000 56%, transparent 64%)",
                  WebkitMaskImage: "radial-gradient(closest-side, #000 0%, #000 56%, transparent 64%)",
                }}
              />
              {/* zone band */}
              <div
                className="iqg-layer"
                style={{
                  background: spec.accent,
                  opacity: 0.14,
                  maskImage: "radial-gradient(closest-side, transparent 88%, #000 89%, #000 95.5%, transparent 96.5%)",
                  WebkitMaskImage: "radial-gradient(closest-side, transparent 88%, #000 89%, #000 95.5%, transparent 96.5%)",
                }}
              />
              {/* ticks */}
              <div className="iqg-layer">
                {ticks.map((t, i) => (
                  <div key={i} className="iqg-spoke" style={{ transform: `rotate(${t.angle}deg)` }}>
                    <i
                      className={`iqg-tick ${t.major ? "iqg-tick-major" : "iqg-tick-minor"}`}
                      style={{ background: t.color }}
                    />
                  </div>
                ))}
              </div>
              {/* numerals */}
              <div className="iqg-layer">
                {numerals.map((n, i) => (
                  <div key={i} className="iqg-spoke" style={{ transform: `rotate(${n.angle}deg)` }}>
                    <span
                      className="iqg-numeral"
                      style={{
                        transform: `translateX(-50%) rotate(${-n.angle}deg)`,
                        fontSize: "4.85cqw",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      {n.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* label + readout stacks */}
              <div className="iqg-stack" style={{ top: "30%" }}>
                <span className="iqg-cap" style={{ color: spec.accent }}>
                  {spec.label}
                </span>
              </div>
              <div className="iqg-stack" style={{ top: "57%" }}>
                <span className="iqg-readout" style={{ color: spec.accent, textShadow: `0 0 12px ${spec.accent}`, fontSize: "7.2cqw" }}>
                  {readout}
                </span>
                {spec.unit && (
                  <span className="iqg-cap-sm" style={{ color: spec.accent, opacity: 0.7, marginTop: "1.85cqw" }}>
                    {spec.unit}
                  </span>
                )}
              </div>

              {/* needle */}
              <div ref={needleRef} className="iqg-needle" style={{ "--needle-ease": "cubic-bezier(.16,1.28,.4,1)" } as React.CSSProperties}>
                <div ref={flutterRef} className="iqg-flutter">
                  <i className="iqg-blade" style={{ background: `linear-gradient(#fff, ${spec.accent} 50%, #1e1e23)`, filter: `drop-shadow(0 0 7px ${spec.accent})` }} />
                  <i className="iqg-tail" style={{ background: "linear-gradient(#1e1e23,#050506)" }} />
                </div>
              </div>
              <div className="iqg-hub" style={{ width: "9%" }}>
                <span
                  className="block aspect-square rounded-full"
                  style={{ width: "38%", background: spec.accent, boxShadow: `0 0 6px ${spec.accent}` }}
                />
              </div>
              <div className="iqg-glass" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentGauge;
