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
cp .env.example .env.local
VITE_ENABLE_DEMO_MODE=true npm run dev
```

De dev-server draait op `http://localhost:8080`.

### Login

De lokale demo-login is alleen beschikbaar in Vite development wanneer `VITE_ENABLE_DEMO_MODE=true` is ingesteld:

- elk geldig e-mailadres werkt, wachtwoord minimaal vier tekens;
- e-mailadressen die met `admin` beginnen krijgen alleen in deze demo de admin-rol (`/admin`);
- overige gebruikers krijgen de member-rol (`/member/dashboard`).

Sessies en gebruikers worden opgeslagen in `localStorage` (`investbotiq.local-session`, `investbotiq.local-users`).

Voor Firebase-authenticatie moeten de `VITE_FIREBASE_*`-waarden in `.env.local` overeenkomen met de webapp in `investbotiq-dev`. Schakel Email/Password in Firebase Authentication in en provision accounts voordat je inlogt. In Firebase mode is een gebruiker alleen admin wanneer diens Firebase ID token een vertrouwde `admin: true` custom claim bevat; de client kan die claim niet instellen. Zonder Firebase-configuratie en zonder expliciete lokale demo-modus blijft aanmelden uitgeschakeld.

### Firebase Emulator Suite

De Firestore Security Rules kunnen lokaal worden getest zonder het dev- of productieproject te wijzigen:

```sh
npm run test:rules
```

Voor de app tegen Auth en Firestore emulators, zet `VITE_USE_FIREBASE_EMULATORS=true` in `.env.local` en start `npm run firebase:emulators` in een tweede terminal. De emulatorconfiguratie gebruikt uitsluitend het lokale project `demo-investbotiq`.

## Scripts

| Script            | Doel                              |
| ----------------- | --------------------------------- |
| `npm run dev`     | Dev-server met HMR                |
| `npm run build`   | Productiebuild naar `dist/`       |
| `npm run preview` | Productiebuild lokaal serveren    |
| `npm run lint`    | ESLint                            |
| `npm run firebase:emulators` | Firebase Auth- en Firestore-emulators lokaal starten |
| `npm run test:rules` | Firestore Security Rules-tests uitvoeren |
