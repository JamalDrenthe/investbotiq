# INVESTBOTIQ

Automated Cashflow Platform — de publieke website en het member/admin-dashboard van Investbotiq.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- three.js (WebGL-scènes overgenomen uit threeui)
- react-router-dom, TanStack Query, Recharts

## Design system

Het visuele systeem is vastgelegd in [`DESIGN.md`](./DESIGN.md) (kleuren, typografie, radii, spacing, componenten,
do's & don'ts). Tokens uit dat bestand zijn geïmplementeerd in `tailwind.config.ts` en `src/index.css`;
de 3D-componenten staan in `src/components/three/`.

## Lokaal draaien

```sh
npm install
npm run dev
```

De dev-server draait op `http://localhost:8080`.

### Login

Authenticatie draait momenteel volledig lokaal (geen Supabase of andere backend):

- elk geldig e-mailadres werkt, wachtwoord minimaal vier tekens;
- e-mailadressen die met `admin` beginnen krijgen de admin-rol (`/admin`);
- overige gebruikers krijgen de member-rol (`/member/dashboard`).

Sessies en gebruikers worden opgeslagen in `localStorage` (`investbotiq.local-session`, `investbotiq.local-users`).

## Scripts

| Script            | Doel                              |
| ----------------- | --------------------------------- |
| `npm run dev`     | Dev-server met HMR                |
| `npm run build`   | Productiebuild naar `dist/`       |
| `npm run preview` | Productiebuild lokaal serveren    |
| `npm run lint`    | ESLint                            |
