export const CORE_UPLINK_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;
export const CORE_UPLINK_FRAGMENT_SHADER = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uGridScale;
uniform float uMouseAmount;
uniform float uPulseSpeed;
uniform float uRadius;
uniform float uOpacity;
uniform float uHover;
uniform float uPulse;
uniform vec2 uClick;
varying vec2 vUv;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;
  uv += uMouse * uMouseAmount;
  vec2 grid = fract(uv * uGridScale);
  vec2 id = floor(uv * uGridScale);
  float dist = length(grid - vec2(0.5));
  float pulse = sin(uTime * uPulseSpeed + id.x * 0.05 + id.y * 0.05) * 0.5 + 0.5;

  // Pointer spotlight: dots near the cursor swell and brighten.
  vec2 pointerUv = vec2((uMouse.x * 0.5 + 0.5) * aspect, uMouse.y * 0.5 + 0.5);
  float spot = smoothstep(0.45, 0.0, length(uv - pointerUv)) * uHover;

  // Click ripple: an expanding ring that fades out.
  vec2 clickUv = vec2((uClick.x * 0.5 + 0.5) * aspect, uClick.y * 0.5 + 0.5);
  float ringDist = abs(length(uv - clickUv) - (1.0 - uPulse) * 1.1);
  float ripple = smoothstep(0.08, 0.0, ringDist) * uPulse;

  float radius = 0.08 + pulse * uRadius + spot * 0.18 + ripple * 0.25;
  float alpha = smoothstep(radius, radius - 0.05, dist);
  vec2 center = vec2(0.5 * aspect, 0.5);
  float depthFade = smoothstep(1.2, 0.1, length(uv - center));
  depthFade = max(depthFade, spot * 0.9 + ripple);
  vec3 color = mix(vec3(0.0, 0.9, 1.0) * pulse, vec3(0.55, 0.6, 1.0), spot * 0.6 + ripple * 0.8);
  color += vec3(0.4, 0.9, 1.0) * ripple * 0.8;
  gl_FragColor = vec4(color, alpha * depthFade * uOpacity * (1.0 + spot * 0.9 + ripple * 1.2));
}
`;
