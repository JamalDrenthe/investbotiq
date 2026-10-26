import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const SVG_SOURCE = path.join(PUBLIC_DIR, "favicon.svg");
const BG_COLOR = { r: 5, g: 7, b: 14, alpha: 1 }; // #05070E

async function buildAssetPack() {
  console.log("🎨 [LogoAnywhere] Start genereren van Digital Brand Asset Pack...");

  const svgBuffer = fs.readFileSync(SVG_SOURCE);

  // 1. High-resolution master raster (2048x2048)
  const masterBuffer = await sharp(svgBuffer, { density: 300 })
    .resize(2048, 2048)
    .png()
    .toBuffer();

  // 2. apple-touch-icon.png (180x180 - GEEN transparantie, iOS safe zone 140x140)
  const appleLogo = await sharp(masterBuffer)
    .resize(140, 140, { fit: "contain" })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: appleLogo, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  ✓ apple-touch-icon.png (180x180) gegenereerd");

  // 3. android-chrome-192x192.png (192x192, 20% safe margin)
  const android192Logo = await sharp(masterBuffer)
    .resize(154, 154, { fit: "contain" })
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: android192Logo, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "android-chrome-192x192.png"));
  console.log("  ✓ android-chrome-192x192.png (192x192) gegenereerd");

  // 4. android-chrome-512x512.png (512x512, maskable splash icon)
  const android512Logo = await sharp(masterBuffer)
    .resize(410, 410, { fit: "contain" })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: android512Logo, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "android-chrome-512x512.png"));
  console.log("  ✓ android-chrome-512x512.png (512x512) gegenereerd");

  // 5. social-avatar.png (1000x1000 - Cirkel Safe Zone 700x700)
  const avatarLogo = await sharp(masterBuffer)
    .resize(700, 700, { fit: "contain" })
    .toBuffer();

  await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: avatarLogo, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "social-avatar.png"));
  console.log("  ✓ social-avatar.png (1000x1000) gegenereerd");

  // 6. og-image.png (1200x630 - Social Share Card met Brand Visual)
  const ogSvgTemplate = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="og-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0C1226"/>
        <stop offset="45%" stop-color="#070A14"/>
        <stop offset="100%" stop-color="#030508"/>
      </linearGradient>
      <radialGradient id="og-glow" cx="30%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#635BFF" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="#22D3EE" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#070A14" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="70%" stop-color="#E2E8F0"/>
        <stop offset="100%" stop-color="#38BDF8"/>
      </linearGradient>
      <linearGradient id="iq-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#34D399"/>
      </linearGradient>
    </defs>

    <!-- Canvas -->
    <rect width="1200" height="630" fill="url(#og-bg)" />
    <circle cx="360" cy="315" r="420" fill="url(#og-glow)" />

    <!-- Subtle Circuit Grid -->
    <path d="M 80 120 H 1120 M 80 510 H 1120" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1.5" />
    <circle cx="80" cy="120" r="3" fill="#22D3EE" opacity="0.6" />
    <circle cx="1120" cy="120" r="3" fill="#635BFF" opacity="0.6" />

    <!-- Eyebrow Pill -->
    <rect x="520" y="165" width="310" height="34" rx="17" fill="#635BFF" fill-opacity="0.15" stroke="#635BFF" stroke-opacity="0.4" stroke-width="1.5" />
    <circle cx="538" cy="182" r="4" fill="#34D399" />
    <text x="552" y="187" font-family="sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" fill="#38BDF8">IQ BOT · THE NEXT GEN AI AGENT</text>

    <!-- Main Title -->
    <text x="520" y="270" font-family="sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5" fill="url(#text-grad)">INVESTBOT<tspan fill="url(#iq-grad)">IQ</tspan></text>

    <!-- Subtitle -->
    <text x="520" y="325" font-family="sans-serif" font-size="24" font-weight="600" fill="#E2E8F0">Automated Cashflow Platform</text>
    
    <!-- Description -->
    <text x="520" y="375" font-family="sans-serif" font-size="16" font-weight="400" fill="#94A3B8">Autonome vermogensgroei · 12 Ecosysteem Partners · Pre-IPO Intelligentie</text>
    <text x="520" y="405" font-family="sans-serif" font-size="16" font-weight="400" fill="#64748B">Geen technische kennis vereist. Volledige controle &amp; transparante dividendallocatie.</text>

    <!-- Bottom Stat Badges -->
    <rect x="520" y="445" width="180" height="42" rx="12" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.1" />
    <text x="535" y="471" font-family="monospace" font-size="13" font-weight="700" fill="#34D399">+ €400 Cashflow / mnd</text>

    <rect x="715" y="445" width="170" height="42" rx="12" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.1" />
    <text x="730" y="471" font-family="monospace" font-size="13" font-weight="700" fill="#38BDF8">12 Partners Live</text>

    <rect x="900" y="445" width="150" height="42" rx="12" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.1" />
    <text x="915" y="471" font-family="monospace" font-size="13" font-weight="700" fill="#A78BFA">100% Autonoom</text>
  </svg>
  `;

  const ogCardBase = await sharp(Buffer.from(ogSvgTemplate))
    .png()
    .toBuffer();

  const ogEmblem = await sharp(masterBuffer)
    .resize(320, 320, { fit: "contain" })
    .toBuffer();

  await sharp(ogCardBase)
    .composite([{ input: ogEmblem, left: 120, top: 155 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "og-image.png"));
  console.log("  ✓ og-image.png (1200x630) gegenereerd");

  // 7. Multi-size favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const pngLayers = await Promise.all(
    icoSizes.map((sz) =>
      sharp(masterBuffer)
        .resize(sz, sz, { fit: "contain" })
        .png()
        .toBuffer()
    )
  );

  // We save the 32x32 PNG as standard favicon.png and compose multi-icon
  // Sharp can output PNG-based ICO buffer
  await sharp(pngLayers[1]).toFile(path.join(PUBLIC_DIR, "favicon-32x32.png"));
  await sharp(pngLayers[0]).toFile(path.join(PUBLIC_DIR, "favicon-16x16.png"));
  
  // Also create clean favicon.ico from the 32x32 layer
  await sharp(masterBuffer)
    .resize(48, 48, { fit: "contain" })
    .toFormat("png")
    .toFile(path.join(PUBLIC_DIR, "favicon.ico"));
  console.log("  ✓ favicon.ico & favicon-*.png gegenereerd");

  // 8. site.webmanifest
  const manifest = {
    name: "InvestBotIQ",
    short_name: "InvestBotIQ",
    description: "InvestBotIQ - Automated Cashflow Platform & The Next Gen AI Agent",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#05070E",
    theme_color: "#05070E",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
  console.log("  ✓ site.webmanifest aangemaakt");

  console.log("\n✨ LogoAnywhere Digital Asset Pack gereed in public/");
}

buildAssetPack().catch(console.error);
