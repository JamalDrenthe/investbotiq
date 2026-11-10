# 3D Effecten Kaart

Alle 3D/WebGL-effecten van Investbotiq op één plek: wat ze doen, welke bestanden erbij horen, welke opties ze hebben en waar ze op de site voorkomen. Bedoeld om effecten snel terug te vinden en elders te hergebruiken.

## Architectuur in het kort

- **Alles staat in `src/components/three/`**. Elk effect bestaat uit een React-component (`*.tsx`) die een `<canvas>` host, plus optioneel een losse renderer (`*Renderer.ts`) en shaders (`*Shaders.ts`).
- **`ThreeScene` (`src/components/three/ThreeScene.tsx`) is de enige publieke ingang.** Gebruik nooit de componenten direct; gebruik `<ThreeScene kind="..." {...opties} />`. De wrapper:
  - laadt elke renderer lazy (code-splitting, kleinere eerste bundle);
  - rendert een statische gradient-fallback als WebGL ontbreekt of `prefers-reduced-motion` aan staat;
  - geeft een compile-time fout als je props mixt tussen kinds.
- **`pointerInteraction.ts`** is de gedeelde helper achter alle interactiviteit. Hij luistert op het parent-element (niet het canvas), zodat knoppen en tekst bovenop het effect gewoon klikbaar blijven terwijl het effect toch reageert op muis en klik. State die renderers krijgen: `x/y` (gesmooth, -1 tot 1), `hover` (0-1), `pulse` + `clickX/Y` (klik-explosie, decay), `velocityX/Y` (momentum).
- Alle componenten pauzeren via `IntersectionObserver` + `visibilitychange` en disposen GPU-resources bij unmount.
- `LumenCta.tsx` zit in dezelfde map maar is geen 3D-effect: het is de CTA-button-stijl (`variant="gradient" | "ghost" | "paper"`, `size="md" | "sm" | "lg"`, `dot`).

## Effect 1 | `energy-orb` - gloeiende nevelbol (hero)

**Bestanden:** `EnergyOrb.tsx` + `energyOrbShaders.ts` (raw WebGL shader, géén three.js meshes; sterren worden in een 2D-overlay-canvas getekend).

**Wat het is:** een paarse/blauwe roterende nevel-orb (fbm-noise shader) met fresnel-rim en glow, omringd door driftende sterren. Pointer: orb, licht en sterren volgen de cursor; klik geeft een puls.

**Opties (`EnergyOrbProps`, defaults in `ENERGY_ORB_DEFAULTS`):**
`speed`, `scale`, `smokeScale`, `smokeStrength`, `smokeSpeed`, `hue`, `saturation`, `glow`, `starDensity`, `starSpeed`, `starSize`, `brightness`, `opacity`, `interaction` (0 = pointer uit), `className`.

**Gebruikt op:**
| Locatie | Bestand | Afgestemde props |
|---|---|---|
| `/` homepage hero | `src/components/HeroSection.tsx:27` | `hue={-18} saturation={1.05} glow={1.35} smokeScale={1.1} smokeStrength={1.1} speed={0.85} starDensity={1.2} starSize={0.9} brightness={1.05}` |

## Effect 2 | `orbital-sphere` - deeltjesplaneet met orbit-ringen

**Bestanden:** `OrbitalSphereBackground.tsx` + `orbitalSphereRenderer.ts` (three.js, ~15.000 Fibonacci-deeltjes, 6 orbit-ringen met gloeiende nodes).

**Wat het is:** een bol van punten met noise-uitsparingen en orbit-ringen eromheen. Pointer: bol kantelt naar de cursor, versnelt op hover, "burst" op klik en pakt spin op bij snelle swipes (`velocity`).

**Opties (`OrbitalSphereOptions`, defaults in `ORBITAL_SPHERE_DEFAULTS`):**
`speed`, `particleSize` (0.015), `particleOpacity` (0.8), `orbitOpacity` (0.25), `scale`, `haloOpacity` (0.2), `hue`, `interaction`, `className`.

**Gebruikt op:**
| Locatie | Bestand | Afgestemde props |
|---|---|---|
| `/auth` (login) | `src/pages/Auth.tsx:99` | `speed={0.8} particleSize={0.016} particleOpacity={0.85} orbitOpacity={0.3} haloOpacity={0.22} hue={-16} scale={1.05}` |
| `/register/success` | `src/pages/RegisterSuccess.tsx:12` | `speed={0.7} particleSize={0.015} particleOpacity={0.8} orbitOpacity={0.28} haloOpacity={0.2} hue={-16} scale={1.1}` |
| `*` 404-pagina | `src/pages/NotFound.tsx:30` | `speed={0.6} particleSize={0.014} particleOpacity={0.7} orbitOpacity={0.25} haloOpacity={0.18} hue={-16} scale={1.15}` |

## Effect 3 | `dot-matrix` - pulserend dotgrid met spotlight en ripples

**Bestanden:** `DotMatrixBackground.tsx` + `dotMatrixShaders.ts` (three.js orthografisch vlak met core-uplink fragment shader).

**Wat het is:** een full-screen raster van pulserende stippen. Pointer: spotlight die de cursor volgt (dots zwellen en verkleuren naar cyan); klik stuurt een uitdijende ring-ripple.

**Opties (`DotMatrixBackgroundProps`, defaults in `DOT_MATRIX_DEFAULTS`):**
`speed`, `gridScale` (60), `mouseAmount` (parallax, 0.04), `pulseSpeed` (0.4), `radius` (0.15), `opacity` (0.35), `hue`, `interaction`, `className`.

**Gebruikt op:**
| Locatie | Bestand | Afgestemde props |
|---|---|---|
| Alle info/landingspagina's via `InfoPageLayout` (`/faq`, `/contact`, `/vacatures`, `/algemene-voorwaarden`, `/privacybeleid`, `/alles-over-investbot/*`, `/flows`, `/veiligheid`) | `src/components/layouts/InfoPageLayout.tsx:24` | `speed={0.6} gridScale={64} mouseAmount={0.05} pulseSpeed={0.3} radius={0.13} opacity={0.4} hue={-20}` |
| `/` homepage, "Waarom"-sectie | `src/components/info/WhySection.tsx:19` | `speed={0.7} gridScale={54} mouseAmount={0.06} pulseSpeed={0.35} radius={0.14} opacity={0.45} hue={-20}` |
| `/register` | `src/pages/Register.tsx:15` | `speed={0.5} gridScale={60} mouseAmount={0.04} pulseSpeed={0.28} radius={0.12} opacity={0.35} hue={-20}` |
| `/admin` dashboard header | `src/pages/admin/AdminDashboard.tsx:131` | `speed={0.5} gridScale={48} mouseAmount={0.04} pulseSpeed={0.3} radius={0.12} opacity={0.35} hue={-20}` |

## Effect 4 | `predictive-arc` - golvende punt-boog (2D canvas)

**Bestanden:** `PredictiveArcCanvas.tsx` + `predictiveArcRenderer.ts` (canvas 2D, géén WebGL).

**Wat het is:** een boog van stippen aan de onderkant van een paneel die overloopt in een golf. Pointer: boog buigt naar de cursor, "surge" op klik. Heeft een eigen `mode="dark" | "light"` voor lichte achtergronden.

**Opties (`PredictiveArcOptions`, defaults in `PREDICTIVE_ARC_DEFAULTS`):**
`mode`, `speed`, `spacing` (5), `dotSize` (6), `archHeight` (0.7), `thickness`, `brightness`, `hue`, `saturation`, `interaction`, `className`.

**Gebruikt op:**
| Locatie | Bestand | Afgestemde props |
|---|---|---|
| `/` homepage, "Hoe het werkt"-paneel | `src/components/info/HowSection.tsx:53` | `mode="dark" speed={0.8} spacing={5} dotSize={5} archHeight={0.72} thickness={1.1} brightness={1.1} hue={-10} saturation={1.1}` |

## Effect 5 | `iq-bot` - interactieve holografische robotkop

**Bestanden:** `IqBot.tsx` + `iqBotRenderer.ts` (three.js: glanzende core-sphere, emissive vizierogen, antenne, dubbele gyroscopische ringen, deeltjes-halo; merkkleuren INDIGO `0x635bff`, CYAN `0x22d3ee`, VIOLET `0x9470d9`).

**Wat het is:** de mascotte. Kijkt naar de cursor, ringen versnellen op hover, klik vuurt een shockwave uit de core af.

**Opties (`IqBotOptions`, defaults in `IQ_BOT_DEFAULTS`):**
`speed`, `scale`, `hue`, `glow`, `interaction`, `className`.

**Gebruikt op:**
| Locatie | Bestand | Afgestemde props |
|---|---|---|
| `/alles-over-investbot/wat-is-het`, intro-paneel | `src/components/wat-is-investbot/IntroductionSection.tsx:60` | `scale={0.9}` |
| `/member/dashboard`, statuskaart | `src/components/member/MemberDashboardTab.tsx:102` | `scale={0.7}` |
| `/member` console (intelligence-tab), hoofdweergave | `src/components/member/IqBotInteractiveConsole.tsx:438` | `scale={0.85}` |
| Zelfde console, compacte weergave | `src/components/member/IqBotInteractiveConsole.tsx:623` | `scale={0.7}` |
| Zwevende chatbubbel op alle `/member`-pagina's | `src/components/member/IqBotBubble.tsx:31` (via `MemberPortalLayout.tsx:181`) | `scale={0.52}` |

## Hergebruik / remixen

```tsx
import { ThreeScene } from "@/components/three/ThreeScene";

// Voorbeeld: het hero-effect hergebruiken als achtergrond van een kaart
<div className="relative">
  <ThreeScene
    kind="energy-orb"
    className="!absolute !inset-0"
    hue={-18}
    interaction={0.5}   // subtielere muisreactie
  />
  <div className="relative z-10">{/* content */}</div>
</div>
```

- **Nieuw tintje nodig?** Alle effecten accepteren `hue` (graden rotatie, positief/negatief). `interaction={0}` maakt elk effect volledig statisch.
- **Altijd `className="!absolute !inset-0"`** meegeven als het effect een achtergrond is; de host-div positioneert zichzelf.
- **Fallbacks staan in `FALLBACK` in `ThreeScene.tsx`**; voeg er een toe als je een nieuw kind maakt.
- **Nieuw effect toevoegen:** maak `mijnRenderer.ts` (+ eventueel shaders), een `MijnEffect.tsx` component volgens het bestaande patroon (hostRef/canvasRef/optionsRef + pointer + IntersectionObserver), en registreer een nieuw `kind` in `ThreeScene.tsx` met een lazy import en een FALLBACK-gradient.
