/**
 * English translations keyed by the canonical Dutch source strings.
 * `usePreferences().t(source)` returns the English text when the language is
 * "en" and falls back to the source string for anything not yet covered.
 */
export const EN: Record<string, string> = {
  // Public navigation & header
  "Alles over Investbot": "All about Investbot",
  "Wat is het?": "What is it?",
  "Hoe werkt het?": "How does it work?",
  "Missie & Visie": "Mission & Vision",
  "Tier Plannen": "Tier Plans",
  Veiligheid: "Security",
  Aanmelden: "Sign up",
  "Sluit menu": "Close menu",
  "Open menu": "Open menu",

  // Hero
  "Laat de": "Let the",
  "automatisch jouw cashflow opbouwen": "build your cashflow automatically",
  "Geen kennis vereist, geen zorgen. Gewoon laten groeien.":
    "No expertise needed, no worries. Just let it grow.",
  Inloggen: "Log in",
  "Bekijk hoe het werkt": "See how it works",
  "Bekijk demo": "Watch demo",
  Actief: "Active",
  "Cashflow ontvangen": "Cashflow received",
  "Bekijk hoe InvestbotIQ werkt": "See how InvestbotIQ works",

  // Footer
  "IQ Bot actief": "IQ Bot active",
  Navigatie: "Navigation",
  Juridisch: "Legal",
  "Algemene Voorwaarden": "Terms & Conditions",
  Privacybeleid: "Privacy Policy",

  // Preference toggles
  "Thema wisselen": "Toggle theme",
  "Taal wisselen": "Switch language",

  // Member portal chrome
  Voortgang: "Progress",
  Takenlijst: "Tasks",
  "Mijn Referrals": "My Referrals",
  Profiel: "Profile",
  "Autonoom Live": "Autonomous · Live",
  Uitloggen: "Log out",
  "Succesvol uitgelogd": "Signed out",
  "Fout bij uitloggen": "Sign-out failed",

  // Admin navigation
  Gebruikers: "Users",
  Taken: "Tasks",
  Notificaties: "Notifications",
  Instellingen: "Settings",

  // Auth
  "Tijdelijke lokale login": "Temporary local login",
  "Tijdelijke lokale login: elk geldig e-mailadres en minimaal vier tekens als wachtwoord werkt.":
    "Temporary local login: any valid email address and a password of at least four characters works.",
  "E-mail": "Email",
  Wachtwoord: "Password",
  "Bezig...": "Working...",
  "Vul alstublieft zowel e-mail als wachtwoord in":
    "Please fill in both email and password",
  "Succesvol ingelogd": "Signed in",
  "Fout bij inloggen": "Sign-in failed",

  // Intelligence tab
  "Live Actief": "Live Active",
  Gepauzeerd: "Paused",
  "Bot monitoring gepauzeerd": "Bot monitoring paused",
  "Bot monitoring hervat": "Bot monitoring resumed",
  Pauzeren: "Pause",
  Hervatten: "Resume",
  "Direct Optimaliseren": "Optimize Now",
  "AI Optimalisatie cyclus gestart! Alle 6 Flowlutas opnieuw afgesteld.":
    "AI optimization cycle started! All 6 Flowlutas recalibrated.",
  "Het autonome neurale netwerk van Investbotiq beheert, optimaliseert en beveiligt uw cashflowgeneratie 24/7 zonder handmatige interventie.":
    "Investbotiq's autonomous neural network manages, optimizes and secures your cashflow generation 24/7 without manual intervention.",
  "Klik op een instrument voor een vergrote weergave":
    "Click an instrument for an enlarged view",
  "Live AI Beslissingsstroom": "Live AI Decision Stream",
  "AI Parameters & Simulatie": "AI Parameters & Simulation",
  "Aantal Actieve Flowluta Slots": "Active Flowluta Slots",
  "6 Slots (Huidig)": "6 Slots (Current)",
  "Geprojecteerde Maandelijkse Cashflow:": "Projected Monthly Cashflow:",
  "Geprojecteerde Jaaropbrengst:": "Projected Annual Yield:",
  "Risicoprofiel Bot": "Bot Risk Profile",
  defensief: "defensive",
  gebalanceerd: "balanced",
  groeigericht: "growth-oriented",
  "Alle strategieën opereren binnen de strengste risicolimieten en kapitaalbescherming.":
    "All strategies operate within the strictest risk limits and capital protection.",
  Sluiten: "Close",

  // Instrument gauges
  "Actieve Slots": "Active Slots",
  "Markt Scansnelheid": "Market Scan Speed",
  Efficiëntiescore: "Efficiency Score",
  "Volgende Cyclus": "Next Cycle",
  "Maandelijkse Cashflow": "Monthly Cashflow",
  Dekkingsgraad: "Coverage Ratio",
  "6 van de 8 Flowluta slots zijn actief en genereren cashflow in de autonome cyclus.":
    "6 of the 8 Flowluta slots are active and generate cashflow in the autonomous cycle.",
  "Het neurale netwerk scant 120 markten en liquiditeitspools per seconde op koersafwijkingen.":
    "The neural network scans 120 markets and liquidity pools per second for price deviations.",
  "99.6% van de beslissingen wordt binnen de optimale parameters uitgevoerd zonder slippage.":
    "99.6% of decisions are executed within optimal parameters without slippage.",
  "De volgende compounding- en herverdelingscyclus start over 4 minuten.":
    "The next compounding and rebalancing cycle starts in 4 minutes.",
  "De geborgde maandelijkse cashflow reserve van €1.620,00 staat veilig in de kluis.":
    "The secured monthly cashflow reserve of €1,620.00 is safely stored in the vault.",
  "De BEL leningen buffer heeft een dekkingsgraad van 100% voor maximale kapitaalbescherming.":
    "The BEL loan buffer has 100% coverage for maximum capital protection.",

  // Live decision stream
  Zojuist: "Just now",
  "2 min geleden": "2 min ago",
  "5 min geleden": "5 min ago",
  "11 min geleden": "11 min ago",
  "18 min geleden": "18 min ago",
  "Micro-arbitrage scan voltooid over 14 DEX liquiditeitspools (+0.42%)":
    "Micro-arbitrage scan completed across 14 DEX liquidity pools (+0.42%)",
  "Flowluta Beta #02 liquiditeitsverhouding opnieuw gekalibreerd":
    "Flowluta Beta #02 liquidity ratio recalibrated",
  "BEL leningen buffer gecontroleerd: 100% dekkingsgraad":
    "BEL loan buffer checked: 100% coverage",
  "Maandelijkse cashflow reserve van €1.620,00 geborgd in kluis":
    "Monthly cashflow reserve of €1,620.00 secured in vault",
  "Marktvolatiliteit gecorrigeerd via Flowluta Zeta algoritme":
    "Market volatility corrected via Flowluta Zeta algorithm",
  "Dynamische herverdeling uitgevoerd voor maximale cashflow stabiliteit":
    "Dynamic rebalancing executed for maximum cashflow stability",
  "Liquiditeitspaar BTC/EUR en ETH/EUR gescand op koersafwijkingen":
    "Liquidity pair BTC/EUR and ETH/EUR scanned for price deviations",
  "Compounding cyclus succesvol afgerond voor actieve portfolio":
    "Compounding cycle completed successfully for active portfolio",
  "Veiligheidscontrole uitgevoerd: alle sleutels in HSM kluis beveiligd":
    "Security check performed: all keys secured in HSM vault",
  "Nieuwe rendementspiek gedetecteerd in Flowluta Alpha pool (+3.8%)":
    "New yield peak detected in Flowluta Alpha pool (+3.8%)",

  // Register
  "Aanmelden bij Investbotiq": "Sign up at Investbotiq",
  "Aanmelding ontvangen": "Registration received",
  "Bedankt voor uw aanmelding!": "Thank you for signing up!",
  "De IQ Bot": "The IQ Bot",
  "bekijkt uw aanvraag.": "is reviewing your application.",
  "U ontvangt binnen": "You will receive a message by email within",
  "48 uur": "48 hours",
  "bericht via e-mail.": "",
  "Wij nemen zo spoedig mogelijk contact met u op.":
    "We will contact you as soon as possible.",

  // NotFound
  "Fout 404": "Error 404",
  "Pagina niet gevonden": "Page not found",
  "Deze pagina is momenteel niet beschikbaar of bestaat niet.":
    "This page is currently unavailable or does not exist.",
  " De IQ Bot is eraan aan het werken.": " The IQ Bot is on it.",
  "Ga terug": "Go back",
  "Terug naar Admin Dashboard": "Back to Admin Dashboard",
  "Terug naar Member Dashboard": "Back to Member Dashboard",
  "Terug naar Home": "Back to Home",
};
