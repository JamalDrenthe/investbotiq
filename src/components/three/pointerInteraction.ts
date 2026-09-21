export type PointerState = {
  /** Smoothed pointer position relative to the host, -1..1 on both axes (y up). */
  x: number;
  y: number;
  /** Raw (unsmoothed) target position. */
  targetX: number;
  targetY: number;
  /** 0..1 — eases in while the pointer is over the interactive surface. */
  hover: number;
  /** 1 right after a click, decays towards 0. */
  pulse: number;
  /** Position of the last click, -1..1. */
  clickX: number;
  clickY: number;
  /** Seconds since the last click (large when never clicked). */
  sinceClick: number;
  /** Momentum from pointer velocity — useful for spinning things on drag/flick. */
  velocityX: number;
  velocityY: number;
};

export type PointerTrackerOptions = {
  /** Smoothing factor per frame (0..1). Higher = snappier. */
  follow?: number;
  /** Seconds it takes a click pulse to fade out. */
  pulseDuration?: number;
  /** Element receiving pointer events. Defaults to the host's parent so
   *  pointer-transparent canvases still react to the section they decorate. */
  surface?: HTMLElement | null;
};

/**
 * Tracks pointer movement, hover and clicks for a pointer-transparent canvas.
 * Events are captured on the parent surface (the section/card the scene decorates),
 * so overlaid copy and buttons keep working while the scene still "feels" the mouse.
 */
export function createPointerTracker(host: HTMLElement, options: PointerTrackerOptions = {}) {
  const follow = options.follow ?? 0.08;
  const pulseDuration = options.pulseDuration ?? 1.4;
  const surface = options.surface ?? host.parentElement ?? host;
  const state: PointerState = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    hover: 0,
    pulse: 0,
    clickX: 0,
    clickY: 0,
    sinceClick: 1000,
    velocityX: 0,
    velocityY: 0,
  };
  let hovering = false;
  let lastX = 0;
  let lastY = 0;
  let lastMove = performance.now();
  let lastFrame = performance.now();

  const normalise = (event: PointerEvent) => {
    const bounds = host.getBoundingClientRect();
    const nx = ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1;
    const ny = -(((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 - 1);
    return { x: Math.max(-1.5, Math.min(1.5, nx)), y: Math.max(-1.5, Math.min(1.5, ny)) };
  };

  const onMove = (event: PointerEvent) => {
    const { x, y } = normalise(event);
    const now = performance.now();
    const dt = Math.max(0.008, (now - lastMove) / 1000);
    state.velocityX = (x - lastX) / dt;
    state.velocityY = (y - lastY) / dt;
    lastX = x;
    lastY = y;
    lastMove = now;
    state.targetX = x;
    state.targetY = y;
    hovering = true;
  };
  const onEnter = () => {
    hovering = true;
  };
  const onLeave = () => {
    hovering = false;
    state.targetX = 0;
    state.targetY = 0;
  };
  const onDown = (event: PointerEvent) => {
    const { x, y } = normalise(event);
    state.clickX = x;
    state.clickY = y;
    state.pulse = 1;
    state.sinceClick = 0;
  };

  surface.addEventListener("pointermove", onMove, { passive: true });
  surface.addEventListener("pointerenter", onEnter, { passive: true });
  surface.addEventListener("pointerleave", onLeave, { passive: true });
  surface.addEventListener("pointerdown", onDown, { passive: true });

  return {
    state,
    surface,
    /** Advance smoothing; call once per rendered frame. */
    update(now = performance.now()) {
      const dt = Math.min(0.1, Math.max(0.001, (now - lastFrame) / 1000));
      lastFrame = now;
      const ease = 1 - Math.pow(1 - follow, dt * 60);
      state.x += (state.targetX - state.x) * ease;
      state.y += (state.targetY - state.y) * ease;
      state.hover += ((hovering ? 1 : 0) - state.hover) * ease * 1.5;
      state.sinceClick += dt;
      state.pulse = Math.max(0, 1 - state.sinceClick / pulseDuration);
      state.velocityX *= Math.pow(0.02, dt);
      state.velocityY *= Math.pow(0.02, dt);
      return state;
    },
    dispose() {
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerenter", onEnter);
      surface.removeEventListener("pointerleave", onLeave);
      surface.removeEventListener("pointerdown", onDown);
    },
  };
}
