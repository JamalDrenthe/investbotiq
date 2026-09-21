import * as THREE from "three";
import type { PointerState } from "./pointerInteraction";

export type IqBotOptions = {
  speed: number;
  scale: number;
  hue: number;
  glow: number;
  /** Pointer influence: the bot looks at the cursor, leans on hover, pulses on click. */
  interaction: number;
};

export const IQ_BOT_DEFAULTS: IqBotOptions = {
  speed: 1,
  scale: 1,
  hue: 0,
  glow: 1,
  interaction: 1,
};

const INDIGO = 0x635bff;
const CYAN = 0x22d3ee;
const VIOLET = 0x9470d9;

/**
 * The IQ Bot: a floating holographic bot head — glossy core sphere, emissive
 * visor eyes, antenna, double gyroscopic rings and a particle halo.
 * Tracks the pointer: the head looks at the cursor, the rings accelerate on
 * hover, and a click fires an energy pulse from the core.
 */
export function createIqBotRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => IqBotOptions,
  getPointer?: () => PointerState,
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0x8890ff, 0.7));
  const keyLight = new THREE.PointLight(0xffffff, 60, 40);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(CYAN, 40, 40);
  rimLight.position.set(-5, -2, 4);
  scene.add(rimLight);
  const coreLight = new THREE.PointLight(INDIGO, 50, 30);
  coreLight.position.set(0, 0.4, 3);
  scene.add(coreLight);

  const rig = new THREE.Group();
  scene.add(rig);
  const bot = new THREE.Group();
  rig.add(bot);

  const trackedMaterials: THREE.Material[] = [];
  const trackedGeometries: THREE.BufferGeometry[] = [];
  const track = <T extends THREE.BufferGeometry>(g: T) => (trackedGeometries.push(g), g);
  const trackM = <T extends THREE.Material>(m: T) => (trackedMaterials.push(m), m);

  // Core head — glossy dark sphere
  const headGeo = track(new THREE.SphereGeometry(1.05, 48, 48));
  const headMat = trackM(new THREE.MeshPhysicalMaterial({
    color: 0x101838,
    metalness: 0.85,
    roughness: 0.25,
    clearcoat: 0.8,
    clearcoatRoughness: 0.3,
    emissive: INDIGO,
    emissiveIntensity: 0.12,
  }));
  const head = new THREE.Mesh(headGeo, headMat);
  bot.add(head);

  // Inner glow shell
  const glowGeo = track(new THREE.SphereGeometry(1.18, 32, 32));
  const glowMat = trackM(new THREE.MeshBasicMaterial({
    color: INDIGO,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  }));
  bot.add(new THREE.Mesh(glowGeo, glowMat));

  // Face plate — slightly protruding visor band
  const visorGeo = track(new THREE.TorusGeometry(0.78, 0.16, 24, 48, Math.PI * 2));
  const visorMat = trackM(new THREE.MeshPhysicalMaterial({
    color: 0x0a0f28,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x090d24,
    emissiveIntensity: 0.6,
  }));
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.scale.set(1, 0.55, 0.5);
  visor.position.set(0, 0.12, 0.78);
  bot.add(visor);

  // Eyes — two emissive spheres that glance at the cursor
  const eyeGeo = track(new THREE.SphereGeometry(0.13, 24, 24));
  const eyeMat = trackM(new THREE.MeshBasicMaterial({ color: CYAN }));
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.32, 0.12, 0.92);
  eyeR.position.set(0.32, 0.12, 0.92);
  bot.add(eyeL, eyeR);
  // Eye glow halos
  const eyeGlowGeo = track(new THREE.SphereGeometry(0.26, 16, 16));
  const eyeGlowMat = trackM(new THREE.MeshBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  const eyeGlowL = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
  const eyeGlowR = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
  eyeL.add(eyeGlowL);
  eyeR.add(eyeGlowR);

  // Antenna + tip light
  const antGeo = track(new THREE.CylinderGeometry(0.03, 0.05, 0.55, 12));
  const antMat = trackM(new THREE.MeshPhysicalMaterial({ color: 0x2a3565, metalness: 0.9, roughness: 0.3 }));
  const antenna = new THREE.Mesh(antGeo, antMat);
  antenna.position.set(0, 1.28, 0);
  bot.add(antenna);
  const tipGeo = track(new THREE.SphereGeometry(0.09, 16, 16));
  const tipMat = trackM(new THREE.MeshBasicMaterial({ color: VIOLET }));
  const tip = new THREE.Mesh(tipGeo, tipMat);
  tip.position.set(0, 0.3, 0);
  antenna.add(tip);
  const tipGlowGeo = track(new THREE.SphereGeometry(0.22, 16, 16));
  const tipGlowMat = trackM(new THREE.MeshBasicMaterial({
    color: VIOLET,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  tip.add(new THREE.Mesh(tipGlowGeo, tipGlowMat));

  // Gyroscopic rings
  const ringGroup = new THREE.Group();
  rig.add(ringGroup);
  const ringMatA = trackM(new THREE.MeshBasicMaterial({
    color: INDIGO, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const ringMatB = trackM(new THREE.MeshBasicMaterial({
    color: CYAN, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const ringA = new THREE.Mesh(track(new THREE.TorusGeometry(1.7, 0.02, 12, 90)), ringMatA);
  const ringB = new THREE.Mesh(track(new THREE.TorusGeometry(1.95, 0.015, 12, 90)), ringMatB);
  ringA.rotation.x = Math.PI / 2.4;
  ringB.rotation.x = -Math.PI / 2.6;
  ringB.rotation.y = Math.PI / 5;
  ringGroup.add(ringA, ringB);

  // Orbiting data nodes on the rings
  const nodeGeo = track(new THREE.SphereGeometry(0.06, 12, 12));
  const nodeMat = trackM(new THREE.MeshBasicMaterial({ color: 0x9beaff }));
  const nodeA = new THREE.Mesh(nodeGeo, nodeMat);
  const nodeB = new THREE.Mesh(nodeGeo, nodeMat);
  ringA.add(nodeA);
  ringB.add(nodeB);

  // Particle halo — ambient data motes
  const MOTES = 320;
  const motePositions = new Float32Array(MOTES * 3);
  for (let i = 0; i < MOTES; i += 1) {
    const r = 1.6 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    motePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    motePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    motePositions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
  }
  const moteGeo = track(new THREE.BufferGeometry());
  moteGeo.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
  const moteMat = trackM(new THREE.PointsMaterial({
    color: CYAN,
    size: 0.035,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  const motes = new THREE.Points(moteGeo, moteMat);
  rig.add(motes);

  // Click pulse shockwave ring
  const pulseGeo = track(new THREE.TorusGeometry(0.4, 0.02, 8, 48));
  const pulseMat = trackM(new THREE.MeshBasicMaterial({
    color: CYAN, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
  rig.add(pulseRing);

  let floatPhase = Math.random() * Math.PI * 2;
  let lastPulse = 1;

  return {
    resize(width: number, height: number) {
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    },

    render(dt: number, t: number) {
      const options = getOptions();
      const pointer = getPointer?.();
      const interaction = pointer ? Math.max(0, options.interaction) : 0;
      const hover = (pointer?.hover ?? 0) * interaction;
      const pulse = (pointer?.pulse ?? 0) * interaction;
      const mx = (pointer?.x ?? 0) * interaction;
      const my = (pointer?.y ?? 0) * interaction;

      floatPhase += dt * options.speed;
      const bob = Math.sin(floatPhase * 1.6) * 0.12;
      bot.position.y = bob + my * 0.3;
      bot.position.x = mx * 0.35;

      // Look at the cursor
      const targetRotY = mx * 0.85;
      const targetRotX = -my * 0.55;
      bot.rotation.y += (targetRotY - bot.rotation.y) * 0.08;
      bot.rotation.x += (targetRotX - bot.rotation.x) * 0.08;
      bot.rotation.z = mx * 0.06;

      // Eyes dart toward the cursor a bit faster than the head
      const eyeShiftX = mx * 0.08;
      const eyeShiftY = my * 0.06;
      eyeL.position.x = -0.32 + eyeShiftX;
      eyeL.position.y = 0.12 + eyeShiftY;
      eyeR.position.x = 0.32 + eyeShiftX;
      eyeR.position.y = 0.12 + eyeShiftY;
      const eyeGlow = 0.35 + hover * 0.4 + pulse * 0.5;
      eyeGlowMat.opacity = Math.min(1, eyeGlow * options.glow);
      eyeMat.color.setHSL(0.52 - options.hue / 720, 1, 0.55 + hover * 0.15);

      // Rings speed up on hover/click
      const ringSpeed = options.speed * (0.3 + hover * 1.4 + pulse * 2.5);
      ringA.rotation.z += dt * ringSpeed * 1.4;
      ringB.rotation.z -= dt * ringSpeed * 1.1;
      ringA.rotation.x = Math.PI / 2.4 + Math.sin(floatPhase * 0.5) * 0.15 + my * 0.2;
      ringB.rotation.y = Math.PI / 5 + mx * 0.25;
      ringMatA.opacity = Math.min(1, (0.5 + hover * 0.3 + pulse * 0.4) * options.glow);
      ringMatB.opacity = Math.min(1, (0.45 + hover * 0.3 + pulse * 0.4) * options.glow);

      // Orbit nodes
      const orbit = floatPhase * 1.8;
      nodeA.position.set(Math.cos(orbit) * 1.7, Math.sin(orbit) * 1.7, 0);
      nodeB.position.set(Math.cos(-orbit * 1.2) * 1.95, Math.sin(-orbit * 1.2) * 1.95, 0);

      // Motes drift and brighten near hover
      motes.rotation.y += dt * 0.12 * options.speed;
      motes.rotation.x = my * 0.1;
      moteMat.opacity = Math.min(1, (0.45 + hover * 0.3) * options.glow);

      // Antenna tip pulse
      const tipScale = 1 + Math.sin(floatPhase * 3.2) * 0.15 + pulse * 0.6;
      tip.scale.setScalar(tipScale);
      tipGlowMat.opacity = Math.min(1, (0.35 + Math.sin(floatPhase * 3.2) * 0.15 + pulse * 0.6) * options.glow);

      // Head breathing glow + click surge
      headMat.emissiveIntensity = (0.12 + hover * 0.2 + pulse * 0.5) * options.glow;
      glowMat.opacity = Math.min(1, (0.08 + hover * 0.1 + pulse * 0.25) * options.glow);

      // Shockwave expands out of the bot on each click
      if (pulse > 0 && lastPulse === 0) {
        pulseRing.scale.setScalar(0.4);
      }
      lastPulse = pulse;
      if (pulse > 0) {
        const progress = 1 - pulse;
        pulseRing.scale.setScalar(0.4 + progress * 3.2);
        pulseRing.quaternion.copy(camera.quaternion);
        pulseMat.opacity = pulse * 0.8 * options.glow;
      } else {
        pulseMat.opacity = 0;
      }

      // Whole assembly drifts with the mouse a touch
      rig.rotation.y = mx * 0.15;
      rig.rotation.x = -my * 0.1;
      rig.scale.setScalar(options.scale * (1 + hover * 0.05 + pulse * 0.08));

      renderer.render(scene, camera);
    },

    dispose() {
      trackedGeometries.forEach((g) => g.dispose());
      trackedMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
