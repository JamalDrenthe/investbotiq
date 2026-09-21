import type { PointerState } from "./pointerInteraction";

export type PredictiveArcMode = "dark" | "light";

export type PredictiveArcOptions = {
  mode: PredictiveArcMode;
  speed: number;
  spacing: number;
  dotSize: number;
  archHeight: number;
  thickness: number;
  brightness: number;
  hue: number;
  saturation: number;
  /** Pointer influence: the arc bows towards the cursor and surges on click. */
  interaction: number;
};

export const PREDICTIVE_ARC_DEFAULTS: PredictiveArcOptions = {
  mode: "dark",
  speed: 1,
  spacing: 5,
  dotSize: 6,
  archHeight: 0.7,
  thickness: 1,
  brightness: 1,
  hue: 0,
  saturation: 1,
  interaction: 1,
};

function resolveMode(mode: PredictiveArcOptions["mode"] | number | string | undefined): PredictiveArcMode {
  if (mode === "light" || mode === 1 || mode === "1") return "light";
  return "dark";
}

export function createPredictiveArcRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => PredictiveArcOptions,
  getPointer?: () => PointerState,
) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return null;
  let width = 1;
  let height = 1;
  let time = 0;
  let centerX = 0;
  let peakY = 0;
  let surge = 0;

  const resize = (nextWidth: number, nextHeight: number) => {
    width = Math.max(1, nextWidth);
    height = Math.max(1, nextHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const render = () => {
    const options = getOptions();
    const mode = resolveMode(options.mode);
    const isLight = mode === "light";
    context.fillStyle = isLight ? "#eef1f6" : "#030303";
    context.fillRect(0, 0, width, height);

    const pointer = getPointer?.();
    const interaction = pointer ? Math.max(0, options.interaction) : 0;
    surge += ((pointer?.pulse ?? 0) * interaction - surge) * 0.12;
    const hover = (pointer?.hover ?? 0) * interaction;
    time += 0.015 * options.speed * (1 + hover * 0.8 + surge * 2);

    // The arc bows gently towards the pointer: apex follows y, focus follows x.
    const targetCenterX = width / 2 + (pointer?.x ?? 0) * width * 0.06 * interaction;
    const targetPeakY = height * 0.35 - (pointer?.y ?? 0) * height * 0.07 * interaction;
    centerX += (targetCenterX - centerX) * 0.06;
    peakY += (targetPeakY - peakY) * 0.06;

    const archPeakY = peakY;
    const archWidth = width * 1.5;
    const archHeight = height * options.archHeight * (1 + surge * 0.12);
    context.globalCompositeOperation = isLight ? "source-over" : "lighter";

    for (let x = 0; x < width; x += options.spacing) {
      const normX = (x - centerX) / (archWidth / 2);
      const curveY = archPeakY + normX * normX * archHeight;
      for (let y = 0; y < height; y += options.spacing) {
        const distanceToCurve = Math.abs(y - curveY);
        const thickness = (140 + (1 - Math.abs(normX)) * 80) * options.thickness;
        if (distanceToCurve >= thickness) continue;
        let intensity = 1 - distanceToCurve / thickness;
        const waveX = Math.sin(x * 0.015 + time);
        const waveY = Math.cos(y * 0.02 + time);
        intensity = intensity * 0.7 + waveX * waveY * 0.3 * intensity;
        intensity *= Math.max(0, 1 - Math.pow(Math.abs(normX), 2.5));
        if (pointer && interaction > 0) {
          const dx = (x - (pointer.x * 0.5 + 0.5) * width) / width;
          const dy = (y - (0.5 - pointer.y * 0.5) * height) / height;
          intensity += Math.max(0, 0.35 - Math.hypot(dx, dy) * 1.4) * hover * 0.9;
        }
        intensity *= 1 + surge * 0.35;
        if (intensity <= 0.02) continue;

        let r: number;
        let g: number;
        let b: number;
        if (isLight) {
          // Cool violet ink on pale paper — readable without additive washout.
          r = Math.min(255, 48 * intensity + 70 * Math.pow(intensity, 3));
          g = Math.min(255, 28 * intensity + 45 * Math.pow(intensity, 4));
          b = Math.min(255, 120 * intensity + 110 * Math.pow(intensity, 2));
          if (intensity > 0.7) {
            const coreBoost = (intensity - 0.7) * 3.3;
            r = Math.min(255, r + 90 * coreBoost);
            g = Math.min(255, g + 70 * coreBoost);
            b = Math.min(255, b + 110 * coreBoost);
          }
        } else {
          r = Math.min(255, 60 * intensity + 100 * Math.pow(intensity, 3));
          g = Math.min(255, 20 * intensity + 60 * Math.pow(intensity, 4));
          b = Math.min(255, 120 * intensity + 135 * Math.pow(intensity, 2));
          if (intensity > 0.7) {
            const coreBoost = (intensity - 0.7) * 3.3;
            r = Math.min(255, r + 150 * coreBoost);
            g = Math.min(255, g + 150 * coreBoost);
            b = Math.min(255, b + 150 * coreBoost);
          }
        }
        context.fillStyle = `rgb(${Math.floor(r * options.brightness)}, ${Math.floor(g * options.brightness)}, ${Math.floor(b * options.brightness)})`;
        context.fillRect(x, y, options.dotSize * intensity, options.dotSize * intensity);
      }
    }
    context.globalCompositeOperation = "source-over";
  };

  return { resize, render };
}
