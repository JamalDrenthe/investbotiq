---
version: alpha
name: Investbotiq Design System
description: Cinematic, dark-first fintech system for a platform that lets the IQ Bot build cashflow automatically. Deep space-navy storytelling bands alternate with calm off-white browsing bands; indigo-to-cyan light is the only "brand color", used sparingly as glow, hairline and CTA. Money is always set in tabular figures.
colors:
  canvas: "#05070f"
  canvas-elevated: "#0b1020"
  canvas-panel: "#111832"
  canvas-hairline: "rgba(148, 163, 255, 0.14)"
  paper: "#f6f7fb"
  paper-elevated: "#ffffff"
  paper-hairline: "#e3e6f2"
  indigo: "#635bff"
  indigo-deep: "#2f00ab"
  indigo-night: "#0d0029"
  cyan: "#22d3ee"
  mint: "#34d399"
  amber: "#fbbf24"
  rose: "#fb7185"
  text-on-canvas: "#f5f7ff"
  text-on-canvas-muted: "#a4adcf"
  text-on-canvas-faint: "#5f6a94"
  text-on-paper: "#0b1020"
  text-on-paper-muted: "#525b7a"
  text-on-paper-faint: "#8b93b2"
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -0.035em
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -0.03em
  display-md:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.025em
  heading:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  subheading:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  eyebrow:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.18em
  numeric:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontFeature: tnum
rounded:
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  4xl: 144px
components:
  button-primary:
    backgroundColor: "linear-gradient(90deg, {colors.indigo-night} 0%, {colors.indigo-deep} 45%, {colors.indigo} 75%, #9470d9 100%)"
    textColor: "{colors.text-on-canvas}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "0 {spacing.lg}"
    height: 46px
    shadow: "0 4px 22px rgba(70, 20, 190, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.14)"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.text-on-canvas}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "0 {spacing.lg}"
    height: 46px
    border: "1px solid rgba(255, 255, 255, 0.14)"
  card-glass:
    backgroundColor: "rgba(17, 24, 50, 0.72)"
    textColor: "{colors.text-on-canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.canvas-hairline}"
    backdrop: "blur(18px)"
  card-paper:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.text-on-paper}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.paper-hairline}"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.text-on-canvas}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 {spacing.md}"
    height: 48px
    border: "1px solid rgba(255, 255, 255, 0.12)"
  chip:
    backgroundColor: "rgba(99, 91, 255, 0.14)"
    textColor: "#c7c3ff"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  stat:
    backgroundColor: "transparent"
    textColor: "{colors.text-on-canvas}"
    typography: "{typography.numeric}"
---

# Investbotiq Design System

## Overview

Investbotiq sells a single idea: *the IQ Bot builds your cashflow while you do nothing*. The design system therefore behaves like a calm, expensive instrument panel — dark, quiet, precise — interrupted only by light. Light is the metaphor for the bot at work: an energy orb in the hero, dot-matrix fields behind CTAs, orbital particle spheres around authentication. Everything else recedes so the numbers and the promise stay legible.

The system follows a **two-mode canvas** (learned from Revolut): storytelling bands are near-black (`canvas`), browsing and reading bands are off-white (`paper`). A page never mixes both moods inside one band. Transitions between the two are hard edges, not gradients.

### Key Characteristics

- **Dark-first, light-second.** Hero, CTA and dashboard shells live on `canvas`; explanatory content and FAQ live on `paper`.
- **One light source per band.** A single indigo→cyan glow (orb, arc, matrix) anchors the composition; nothing else is colored.
- **Space Grotesk display with negative tracking**, DM Sans body. Headlines feel engineered, paragraphs feel human.
- **Tabular figures everywhere money appears** (`font-feature-settings: "tnum"`), so columns of cashflow align.
- **Pill CTAs, rounded-20 cards, hairline borders.** Corners are soft but never bubbly.
- **3D is functional, not decorative.** Each WebGL element illustrates a claim in the copy (growth, automation, security) and degrades to a static gradient when `prefers-reduced-motion` is set or WebGL is unavailable.

## Colors

### Brand & Accent

| Token | Value | Usage |
| --- | --- | --- |
| `indigo` | `#635bff` | Primary brand light: CTA gradient end, links on paper, focus rings |
| `indigo-deep` | `#2f00ab` | CTA gradient mid-stop, active nav pill |
| `indigo-night` | `#0d0029` | CTA gradient start, deepest orb core |
| `cyan` | `#22d3ee` | Secondary light: orb rim, arc highlight, live indicators |
| `mint` | `#34d399` | Positive delta, "verified" states |
| `amber` | `#fbbf24` | Pending / attention |
| `rose` | `#fb7185` | Errors, negative delta |

### Surface

| Token | Value | Usage |
| --- | --- | --- |
| `canvas` | `#05070f` | Page background in dark bands, behind all 3D |
| `canvas-elevated` | `#0b1020` | Header, sidebar, dashboard shell |
| `canvas-panel` | `#111832` | Glass card base color before alpha |
| `canvas-hairline` | `rgba(148,163,255,.14)` | All borders on dark |
| `paper` | `#f6f7fb` | Page background in light bands |
| `paper-elevated` | `#ffffff` | Cards on paper |
| `paper-hairline` | `#e3e6f2` | All borders on paper |

### Text

On canvas: `text-on-canvas` (#f5f7ff) for headings, `-muted` (#a4adcf) for body, `-faint` (#5f6a94) for meta. On paper: `text-on-paper` (#0b1020), `-muted` (#525b7a), `-faint` (#8b93b2). Never use pure black or pure white for text.

### Semantic

Success `mint`, warning `amber`, danger `rose`, info `cyan`. Semantic color appears only in badges, deltas and toasts — never as a surface.

## Typography

### Font Family

- **Display:** Space Grotesk (600 for display, 500 for subheadings).
- **Body:** DM Sans (400/500/600).
- Both loaded from Google Fonts; fallbacks `system-ui, -apple-system, Segoe UI, sans-serif`.

### Hierarchy

| Token | Size / Line / Tracking | Use |
| --- | --- | --- |
| `display-xl` | 72 / 1.0 / -0.035em | Home hero h1 only |
| `display-lg` | 56 / 1.04 / -0.03em | Info-page hero h1 |
| `display-md` | 40 / 1.08 / -0.025em | Band headlines (h2) |
| `heading` | 28 / 1.15 / -0.02em | Section heads (h3), dashboard page titles |
| `subheading` | 20 / 1.3 / -0.01em | Card titles, FAQ questions |
| `body-lg` | 18 / 1.6 | Hero lede, intro paragraphs |
| `body` | 16 / 1.6 | Default |
| `body-sm` | 14 / 1.5 | Buttons, meta, table cells |
| `eyebrow` | 12 / 1.2 / +0.18em uppercase | Band labels ("IQ BOT", "HOE HET WERKT") |
| `numeric` | 32 / 1.1 / -0.02em, `tnum` | KPI values |

### Principles

- Negative tracking scales with size: the larger the display, the tighter it gets.
- Max line length for body copy is 65ch; hero ledes are capped at 34rem.
- Eyebrows always precede a display headline; they carry the band's theme in uppercase with a small indicator dot.
- Numbers use `tnum` and `Space Grotesk` regardless of context.

### Note on Font Substitutes

If Space Grotesk is unavailable, use `Sora` or `Manrope` at -0.02em. If DM Sans is unavailable, use `Inter`.

## Layout

### Spacing System

4-based scale: 4, 8, 16, 24, 40, 64, 96, 144. Bands use `3xl` (96px) vertical padding on desktop and `2xl` (64px) on mobile. Inside cards, `lg` (24px). Between stacked cards, `md` (16px).

### Grid & Container

- Content container `max-width: 1200px`, side padding 24px (mobile) / 40px (desktop).
- Reading container `max-width: 44rem` for prose bands.
- 12-column grid on desktop; hero is 7/5 (copy / 3D), feature bands are 3-up cards, dashboard is sidebar 272px + fluid.

### Whitespace Philosophy

Whitespace is the second brand color. A band should feel slightly too empty before the 3D element is added; the light fills the void.

## Elevation & Depth

| Level | Treatment | Where |
| --- | --- | --- |
| 0 | Flat, no border | Page canvas |
| 1 | 1px hairline border | Nav, dividers, table rows |
| 2 | Hairline + `rgba(17,24,50,.72)` glass + blur 18px | Cards on canvas |
| 3 | Level 2 + `0 24px 80px rgba(5,7,15,.6)` | Floating hero panel, auth card |
| 4 | Glow: `0 0 120px rgba(99,91,255,.35)` | Only behind the orb and primary CTA |

### Decorative Depth

Depth comes from the WebGL layers, not from drop shadows. Layer order in a dark band: canvas → 3D background (pointer-events none) → radial vignette → content. Every 3D element is wrapped in `.threeui-background` (absolute, inset 0, overflow hidden, pointer-events none).

## Shapes

### Border Radius Scale

`sm` 8 (chips inside tables), `md` 14 (inputs, small cards), `lg` 20 (cards), `xl` 28 (hero panels, auth card), `pill` 999 (all buttons, nav items, badges).

### Photography Geometry

Product images (growth chart, dashboard screenshots) sit inside `lg`-rounded frames with a hairline border and a subtle inner top highlight. Black-on-transparent logo assets are inverted (`filter: invert(1)`) on canvas.

## Components

### Buttons

- **Primary (`button-primary`)** — LumenCta-style pill: 46px tall, indigo gradient, inset top highlight, 22px indigo shadow. Hover lifts 1px and brightens 8%. Exactly one per band.
- **Ghost (`button-ghost`)** — translucent pill with hairline border. Used for secondary actions beside a primary.
- **Paper primary** — on paper bands the primary button is solid `text-on-paper` (#0b1020) with white text; the gradient is reserved for canvas.
- **Link** — indigo text, underline on hover only.

### Cards & Containers

- **Glass card** (`card-glass`) on canvas; **Paper card** (`card-paper`) on paper. Both `lg` radius, 24px padding, hairline border.
- Cards contain an eyebrow, a `subheading`, body copy and optionally a `numeric` stat. No card has more than one CTA.
- Feature cards get a 40px icon tile (`md` radius, indigo 14% fill) top-left.

### Inputs & Forms

48px tall, `md` radius, hairline border, translucent fill on canvas / white on paper. Focus: 2px `indigo` ring with 2px offset. Labels are `body-sm` 500, eyebrow color. Helper text `body-sm` faint.

### Navigation

- **Public header:** fixed, 72px, canvas-elevated at 80% alpha with blur 20px; hairline bottom border appears after 8px of scroll. Logo left (icon + inverted wordmark), pill nav center, ghost "Inloggen" + primary "Aanmelden" right.
- **Dashboard sidebar:** 272px, canvas-elevated, pill items, active item = indigo 16% fill + indigo text + 3px indigo left bar.

### Pills, Tags, and Chips

`chip`: eyebrow typography, pill radius, indigo 14% fill / indigo-200 text. Status chips use semantic colors at 14% fill.

### Signature Components

- **Energy Orb (hero)** — raw WebGL fbm smoke sphere with starfield (ported from threeui `EnergyOrb`). Represents the IQ Bot. Hue tuned to indigo/cyan, glow 1.4.
- **Predictive Arc** — 2D canvas dot arc (threeui `PredictiveArcCanvas`) behind "Hoe werkt het?" and cashflow statements; the arc *is* the growth curve.
- **Dot Matrix** — three.js shader dot grid with pointer parallax (threeui `DotMatrixBackground`) behind CTA bands and the dashboard hero card.
- **Orbital Sphere** — three.js particle sphere with orbit rings (threeui `OrbitalSphereBackground`) behind the auth panel; signals security and system.
- **Lumen CTA** — gradient pill button with ring-dot indicator (threeui `LumenCta`), used as every primary action on canvas.

## Do's and Don'ts

**Do**

- Alternate canvas and paper bands; start and end the page on canvas.
- Put exactly one 3D element and one primary CTA per canvas band.
- Use `tnum` for every number.
- Invert black logo assets on canvas.
- Provide a static gradient fallback for every WebGL surface.

**Don't**

- Don't use colored surfaces (no indigo cards, no cyan sections).
- Don't use drop shadows on paper; hairlines only.
- Don't mix Space Grotesk and DM Sans within one line.
- Don't animate on scroll more than once per element (fade-up 0.6s, then still).
- Don't place text over the brightest part of the orb.

## Responsive Behavior

### Breakpoints

`sm` 640, `md` 768, `lg` 1024, `xl` 1280. Display sizes step down one token per breakpoint below `lg`.

### Touch Targets

Minimum 44px; pill buttons are 46px, sidebar items 44px.

### Collapsing Strategy

Hero 7/5 becomes stacked (3D moves above copy at 320px height). 3-up cards → 1-up. Header nav → full-screen sheet with the same pill items. Dashboard sidebar → off-canvas drawer.

### Image Behavior

3D canvases render at `devicePixelRatio` capped at 1.5 on mobile and pause when off-screen (IntersectionObserver) or when the tab is hidden.

## Iteration Guide

1. Start from the copy — never change it. Decide the band's mood (canvas/paper).
2. Pick the one 3D element that illustrates the claim.
3. Add eyebrow → display headline → lede → primary CTA.
4. Check contrast on the darkest and brightest parts of the 3D layer.
5. Verify `tnum`, pill radius and hairline borders; remove anything colored that is not light.

## Known Gaps

- Print styles are not defined.
- Charts (recharts) inherit tokens via CSS variables but have not been fully audited for the paper mode.
