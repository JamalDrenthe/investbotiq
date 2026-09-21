import * as THREE from "three";
import type { PointerState } from "./pointerInteraction";

export type OrbitalSphereOptions = {
  speed: number;
  particleSize: number;
  particleOpacity: number;
  orbitOpacity: number;
  scale: number;
  haloOpacity: number;
  hue: number;
  /** Pointer influence: the sphere turns towards the cursor, speeds up on hover and bursts on click. */
  interaction: number;
};

export const ORBITAL_SPHERE_DEFAULTS: OrbitalSphereOptions = {
  speed: 1,
  particleSize: 0.015,
  particleOpacity: 0.8,
  orbitOpacity: 0.25,
  scale: 1,
  haloOpacity: 0.2,
  hue: 0,
  interaction: 1,
};

const SPHERE_RADIUS = 2.2;
const PARTICLE_COUNT = 15000;
const ORBIT_COUNT = 6;

/**
 * Scene builder ported from threeui `OrbitalSphereBackground`: a Fibonacci-distributed
 * particle sphere with noise-based gaps, six orbit rings and glowing nodes on every other ring.
 */
export function createOrbitalSphereRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => OrbitalSphereOptions,
  getPointer?: () => PointerState,
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // `rig` follows the pointer (tilt/drift); `networkGroup` keeps its own steady spin inside it.
  const rig = new THREE.Group();
  const networkGroup = new THREE.Group();
  rig.add(networkGroup);
  scene.add(rig);

  // Particle sphere
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const colorBright = new THREE.Color(0xa78bfa);
  const colorDim = new THREE.Color(0x701a75);
  let validIndex = 0;

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const phi = Math.acos(-1 + (2 * index) / PARTICLE_COUNT);
    const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
    const x = SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi);
    const y = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
    const z = SPHERE_RADIUS * Math.cos(phi);

    const noise = Math.sin(x * 3.5) * Math.cos(y * 3.5) * Math.sin(z * 3.5) + Math.cos(x * 6) * 0.4;
    if (noise <= -0.1) continue;

    const distortion = 1 + noise * 0.1;
    positions[validIndex * 3] = x * distortion;
    positions[validIndex * 3 + 1] = y * distortion;
    positions[validIndex * 3 + 2] = z * distortion;

    const mixedColor = colorDim.clone().lerp(colorBright, noise > 0.5 ? 1 : 0.3);
    colors[validIndex * 3] = mixedColor.r;
    colors[validIndex * 3 + 1] = mixedColor.g;
    colors[validIndex * 3 + 2] = mixedColor.b;
    validIndex += 1;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(0, validIndex * 3), 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors.slice(0, validIndex * 3), 3));
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  networkGroup.add(new THREE.Points(particleGeometry, particleMaterial));

  // Orbit rings + nodes
  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
  });
  const orbitGeometries: THREE.BufferGeometry[] = [];
  const nodeGeometries: THREE.BufferGeometry[] = [];
  const nodeMaterials: THREE.Material[] = [];
  const haloMaterials: THREE.MeshBasicMaterial[] = [];
  let responsiveScale = 1;
  let basePosition = new THREE.Vector3();
  const tilt = new THREE.Vector2();
  let spin = 0;
  let burst = 0;

  for (let index = 0; index < ORBIT_COUNT; index += 1) {
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];
    const orbitRadius = SPHERE_RADIUS * (1.08 + Math.random() * 0.2);

    for (let point = 0; point <= 90; point += 1) {
      const angle = (point / 90) * Math.PI * 2;
      points.push(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, Math.sin(angle * 4) * 0.1);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    orbitGeometries.push(geometry);

    const line = new THREE.Line(geometry, orbitMaterial);
    line.rotation.x = Math.random() * Math.PI * 2;
    line.rotation.y = Math.random() * Math.PI * 2;
    networkGroup.add(line);

    if (index % 2 !== 0) {
      const nodeGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xd946ef });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = Math.random() * Math.PI * 2;
      node.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0);
      line.add(node);

      const haloGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });
      node.add(new THREE.Mesh(haloGeometry, haloMaterial));

      nodeGeometries.push(nodeGeometry, haloGeometry);
      nodeMaterials.push(nodeMaterial, haloMaterial);
      haloMaterials.push(haloMaterial);
    }
  }

  return {
    resize(width: number, height: number) {
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      if (width >= 1024) {
        basePosition = new THREE.Vector3(2.5, 0, -2);
        responsiveScale = 1.15;
        camera.position.z = 5.5;
      } else {
        basePosition = new THREE.Vector3(0, -1, -3);
        responsiveScale = 1;
        camera.position.z = 6.5;
      }
      rig.position.copy(basePosition);
      networkGroup.scale.setScalar(responsiveScale * getOptions().scale);
    },

    render() {
      const options = getOptions();
      const pointer = getPointer?.();
      const interaction = pointer ? Math.max(0, options.interaction) : 0;
      const hover = pointer ? pointer.hover * interaction : 0;
      const pulse = pointer ? pointer.pulse * interaction : 0;

      // Click → a soft burst: the sphere swells and the halos flare, then settle.
      burst += (pulse - burst) * 0.12;
      const swell = 1 + burst * 0.18;
      particleMaterial.size = options.particleSize * (1 + hover * 0.35 + burst * 0.9);
      particleMaterial.opacity = Math.min(1, options.particleOpacity * (1 + hover * 0.2 + burst * 0.3));
      orbitMaterial.opacity = Math.min(1, options.orbitOpacity * (1 + hover * 0.8 + burst));
      haloMaterials.forEach((material) => {
        material.opacity = Math.min(1, options.haloOpacity * (1 + hover * 1.2 + burst * 3));
      });
      networkGroup.scale.setScalar(responsiveScale * options.scale * swell);

      // Pointer → the whole network turns to face the cursor and drifts with it.
      if (pointer) {
        tilt.x += (pointer.x * interaction - tilt.x) * 0.06;
        tilt.y += (pointer.y * interaction - tilt.y) * 0.06;
        // Flicks add angular momentum that decays naturally.
        spin += pointer.velocityX * 0.00004 * interaction;
      }
      spin *= 0.96;
      rig.position.set(basePosition.x + tilt.x * 0.35, basePosition.y + tilt.y * 0.25, basePosition.z);
      rig.rotation.set(-tilt.y * 0.45, tilt.x * 0.6, -tilt.x * 0.2);

      const speed = options.speed * (1 + hover * 1.2 + burst * 2.5);
      networkGroup.rotation.y += 0.0008 * speed + spin;
      networkGroup.rotation.x += 0.0003 * speed;
      networkGroup.children.forEach((child, index) => {
        if (child.type === "Line") {
          child.rotation.z += 0.0004 * speed * (index % 2 === 0 ? 1 : -1);
        }
      });
      renderer.render(scene, camera);
    },

    dispose() {
      particleGeometry.dispose();
      particleMaterial.dispose();
      orbitMaterial.dispose();
      orbitGeometries.forEach((item) => item.dispose());
      nodeGeometries.forEach((item) => item.dispose());
      nodeMaterials.forEach((item) => item.dispose());
      renderer.dispose();
    },
  };
}
