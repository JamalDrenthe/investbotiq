export interface Vacancy {
  id: string; // "01" - "13"
  num: number;
  title: string;
  domain: string;
  category: "finance" | "growth" | "executive" | "recruitment" | "tech" | "sales" | "strategy" | "consulting";
  reward: string;
  location: string;
  experience: string;
  hours: string;
  contractTypes: string[];
  roleOverview: string;
  tasks: string[];
  profile: string[];
  compensation: string[];
  badgeColor: string;
}

export const ARBEIDSVOORWAARDEN = [
  {
    title: "Salaris & Beloning",
    desc: "In overleg, afgestemd op ervaring, anciënniteit en dienstverband. Aangevuld met riante succesfees en prestatiebeloningen.",
    icon: "Wallet",
  },
  {
    title: "27 Vakantiedagen",
    desc: "Op fulltime basis (40u), met flexibele opties tot bijkopen of tijd-voor-tijd sparen naar eigen inzicht.",
    icon: "Calendar",
  },
  {
    title: "100% Remote Werkplek",
    desc: "Volledige vrijheid om thuis of onderweg te werken, inclusief maandelijkse onbelaste thuiswerkvergoeding.",
    icon: "Globe",
  },
  {
    title: "High-End Apparatuur",
    desc: "Recente laptop (MacBook Pro of high-spec ThinkPad) en smartphone met zakelijk abonnement in bruikleen.",
    icon: "Laptop",
  },
  {
    title: "Ergonomisch Inrichtingsbudget",
    desc: "Ruim budget voor het inrichten van een professionele ergonomische werkplek (zit-sta bureau, 4K monitor, bureaustoel).",
    icon: "Armchair",
  },
  {
    title: "Kennis & Certificering",
    desc: "Onbeperkte toegang tot onze interne academie, externe specialistische trainingen en officiële certificeringstrajecten.",
    icon: "GraduationCap",
  },
  {
    title: "Events & Workations",
    desc: "Regelmatige kwartaalborrels, jaarlijkse internationale workation, AI-hackathons en exclusieve partnerbijeenkomsten.",
    icon: "Sparkles",
  },
  {
    title: "HBO/WO Werk- & Denkniveau",
    desc: "Geldt als algemene basiseis voor alle 13 functies, of gelijkwaardige aantoonbare senior praktijkervaring.",
    icon: "Award",
  },
];

export const SOLLICITATIE_STAPPEN = [
  {
    step: "01",
    title: "Kennismaking & Dossier",
    desc: "Stuur je CV en LinkedIn-profiel met het gewenste vacature-ID (01 t/m 13) via ons formulier of per e-mail.",
  },
  {
    step: "02",
    title: "Kennismakingsgesprek (30 min)",
    desc: "Een direct videogesprek over je bewezen trackrecord, beschikbaarheid, ambitie en de passende vergoedingsstructuur.",
  },
  {
    step: "03",
    title: "Contract & Tech Setup",
    desc: "Ondertekening van de overeenkomst (ZZP/vast), toekenning van systemen, hardware en toegang tot de academie.",
  },
  {
    step: "04",
    title: "Vliegende Start (100% Remote)",
    desc: "Onboarding met persoonlijke sparringpartners en directe integratie in de lopende projecten van de groep.",
  },
];

export const VACANCIES: Vacancy[] = [
  {
    id: "01",
    num: 1,
    title: "Investor Relations Manager",
    domain: "Corporate / Pre-IPO",
    category: "finance",
    reward: "Salaris + succesfee",
    location: "100% remote (reisbereidheid voor internationale roadshows)",
    experience: "5+ jaar corporate finance, private equity, venture capital of IR",
    hours: "32–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Ter voorbereiding op een internationale beursnotering en meerdere kapitaalrondes zoeken wij een IR Manager. Je bent het vaste aanspreekpunt richting de financiële markt en onderhoudt relaties met institutionele beleggers, family offices en strategische co-investeerders.",
    tasks: [
      "Werven en onboarden van institutionele investeerders en kapitaalverstrekkers.",
      "Regisseren van de internationale IR-roadshow en het bookbuilding-proces.",
      "Presenteren van groeimodellen, kwartaalcijfers en IFRS-rapportage aan investeringscomités.",
      "Schakelen met corporate finance-adviseurs, toezichthouders, juristen en auditors.",
    ],
    profile: [
      "HBO/WO in finance, economie of bedrijfskunde, of gelijkwaardige ervaring.",
      "Aantoonbaar netwerk binnen institutioneel kapitaal, family offices en private equity.",
      "Nederlands en Engels op boardroomniveau.",
      "Ervaring met IFRS, kapitaalmarkttransacties en pre-IPO-trajecten.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring en bewezen trackrecord.",
      "Aantrekkelijke succesfee over elk door jou aangebracht en gecontracteerd investeringsvolume (percentage in overleg).",
      "Volledige arbeidsvoorwaarden inclusief thuiswerkbudget, apparatuur en 27 vakantiedagen.",
    ],
    badgeColor: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
  },
  {
    id: "02",
    num: 2,
    title: "Campagnemanager (Growth & Crowdfunding)",
    domain: "Growth & crowdfunding",
    category: "growth",
    reward: "Salaris + campagnevergoeding",
    location: "100% remote",
    experience: "3+ jaar growth marketing, B2B of crowdfunding",
    hours: "32–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je bent verantwoordelijk voor de B2B-wervingscampagnes en co-financieringstrajecten voor nieuwe hardware- en vastgoedprojecten. Je bouwt datagedreven funnels die op Europese schaal converteren.",
    tasks: [
      "Ontwerpen, lanceren en optimaliseren van crowdfunding- en ledenwervingscampagnes.",
      "Uitrollen van multi-channel campagnes (LinkedIn, Meta, Google, programmatic, e-mail) voor Europese wervingshubs.",
      "Continueren van A/B-tests op landingspagina's, advertenties en onboarding-flows.",
      "Monitoren van campagnedata, acquisitiekosten (CAC) en funnelconversie.",
    ],
    profile: [
      "HBO/WO in marketing, communicatie of data-analyse, of gelijkwaardige ervaring.",
      "Minimaal 3 jaar ervaring met B2B performance marketing, leadgeneratie of grootschalige crowdfundingcampagnes.",
      "Sterk in zowel creatieve copywriting als diepgaande data-analyse.",
      "Ondernemend, zelfsturend en doelgericht.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Vergoeding per succesvol geactiveerd B2B-lid en per voltooide financieringscampagne.",
      "Volledige arbeidsvoorwaarden (laptop, ergonomie, academie, 27 vakantiedagen).",
    ],
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  },
  {
    id: "03",
    num: 3,
    title: "Sponsor- & Partnership Manager",
    domain: "Media, tech, events",
    category: "growth",
    reward: "Salaris + dealvergoeding",
    location: "100% remote",
    experience: "3+ jaar B2B-partnerships, media of sponsoring",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je sluit commerciële samenwerkingen, sponsorcontracten en strategische allianties voor de media-, compute- en community-platforms van de groep.",
    tasks: [
      "Binnenhalen van B2B-sponsors, adverteerders en mediapartners voor evenementen, platforms en hubs.",
      "Initiëren van samenwerkingen met hardwareleveranciers, vastgoedpartijen en softwarelicentiepartners.",
      "Ontwikkelen van sponsorpakketten en joint-venture-voorstellen.",
      "Voeren van onderhandelingen van eerste pitch tot getekend contract.",
    ],
    profile: [
      "HBO/WO, of vergelijkbare werkervaring.",
      "Ervaring in B2B-sales, sponsorwerving, media-exploitatie of strategic partnerships.",
      "Commercieel sterk, representatief en zelfsturend.",
      "Uitstekende communicatieve vaardigheden in Nederlands en Engels.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Dealvergoeding: percentage van elke gecontracteerde sponsor- of partnership-deal (in overleg).",
      "Volledig arbeidsvoorwaardenpakket en flexibele uren.",
    ],
    badgeColor: "border-rose-500/40 text-rose-300 bg-rose-500/10",
  },
  {
    id: "04",
    num: 4,
    title: "Executive Search Consultant",
    domain: "Boardroom & C-level",
    category: "executive",
    reward: "Salaris + plaatsingsfee",
    location: "100% remote",
    experience: "5+ jaar executive search of boardroom consulting",
    hours: "32–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je werft boardroomposities voor de eigen holdings en voor opdrachtgevers van de B2B recruitment-marketplace. Je opereert op strategisch niveau en bent verantwoordelijk voor het vinden en binden van bestuurders en toezichthouders.",
    tasks: [
      "Werven van statutaire directieleden, non-executive directors (RvC) en country managers.",
      "Plaatsen van C-level executives (CIO, CTO, Chief AI Officer, VP Engineering) bij externe opdrachtgevers.",
      "Begeleiden van het volledige search-, selectie- en benoemingsproces op boardroomniveau.",
    ],
    profile: [
      "HBO/WO, of gedegen praktijkervaring op directieniveau.",
      "Minimaal 5 jaar ervaring bij een executive search-bureau of als senior headhunter voor C-level posities.",
      "Gelijkwaardige gesprekspartner voor CEO's, commissarissen en investeringsmaatschappijen.",
      "Nederlands en Engels vloeiend in woord en geschrift.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Plaatsingsfee per geplaatste executive, gebaseerd op bruto jaarsalaris of contractwaarde (in overleg).",
      "Standaard arbeidsvoorwaardenpakket van de groep.",
    ],
    badgeColor: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  },
  {
    id: "05",
    num: 5,
    title: "360° Recruiter (IT & Tech-Detachering)",
    domain: "IT-detachering",
    category: "recruitment",
    reward: "Salaris + margedeling",
    location: "100% remote",
    experience: "2+ jaar 360°-recruitment of IT-detachering",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je beheert zowel de klantkant (IT-detacheringsopdrachten) als de kandidatenkant (selectie en plaatsing van internationale specialisten die via de eigen relocatie-tak instromen).",
    tasks: [
      "Binnenhalen van B2B IT-detacheringscontracten en aanvragen bij techbedrijven en corporates.",
      "Matchen van vooraf geverifieerde kennismigranten en IT-professionals aan jouw klantportefeuille.",
      "Voeren van tariefonderhandelingen, begeleiden van sollicitatiegesprekken en afsluiten van contracten via het recruitment-systeem.",
    ],
    profile: [
      "HBO/WO, of vergelijkbare ervaring.",
      "Ervaring als 360°-recruiter, accountmanager of consultant in IT-, engineering- of tech-detachering.",
      "Commercieel gedreven, proactief en relatiegericht.",
      "Ervaring met moderne recruitmentsoftware en matchingtools.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Margedeling over gerealiseerde detacheringsomzet (in overleg).",
      "Standaard secundaire arbeidsvoorwaarden zoals beschreven.",
    ],
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
  },
  {
    id: "06",
    num: 6,
    title: "Tech Headhunter (Global AI & Engineering Talent)",
    domain: "AI & engineering",
    category: "tech",
    reward: "Salaris + succesfee",
    location: "100% remote",
    experience: "Aantoonbare ervaring in tech-sourcing of direct search",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je spoort wereldwijd AI-engineers, systeemarchitecten en senior developers op voor externe B2B-klanten en de eigen R&D-, AI- en hardware-afdelingen. Voor geplaatste kandidaten regelt de groep ook visum en huisvesting.",
    tasks: [
      "Actief sourcen via GitHub, LinkedIn Recruiter, StackOverflow en eigen sourcing-tools.",
      "Overtuigen van internationaal talent met het totaalpakket: baan, visum, relocatie en huisvesting.",
      "Begeleiden van kandidaten door technische assessments tot contractondertekening.",
    ],
    profile: [
      "HBO/WO, of vergelijkbare praktijkervaring in IT-sourcing.",
      "Ervaring met het sourcen van schaarse developers en data/AI-engineers.",
      "Bekend met Python, Rust, Kubernetes en LLM-architecturen.",
      "Vloeiend Engels, comfortabel met kandidaten in verschillende tijdzones.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Aantrekkelijke succesfee per geplaatste en geverifieerde tech-specialist (in overleg).",
      "100% remote, inclusief thuiswerkvergoeding en apparatuur.",
    ],
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-500/10",
  },
  {
    id: "07",
    num: 7,
    title: "High-Ticket Closer (B2B-Proposities)",
    domain: "B2B-conversie",
    category: "sales",
    reward: "Salaris + commissie",
    location: "100% remote (flexibele agenda)",
    experience: "Aantoonbaar trackrecord in high-ticket closing",
    hours: "24–40 per week (flexibele agenda)",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je voert de eindgesprekken met warme, voorgekwalificeerde zakelijke leads en sluit de deals voor de gecombineerde proposities (compute, digitale infrastructuur, zakelijk vastgoed). Koude acquisitie is geen onderdeel van de functie.",
    tasks: [
      "Voeren van consultatieve videocalls en telefoongesprekken met zakelijke beslissers.",
      "Toelichten van de modulaire B2B-pakketten en het rendement van het ecosysteem.",
      "Zorgen dat overeenkomsten tijdens of direct na het gesprek digitaal worden ondertekend.",
      "Afstemmen met marketing en sales over leadkwaliteit.",
    ],
    profile: [
      "HBO/WO, of gelijkwaardige saleservaring.",
      "Trackrecord in consultative selling en high-ticket closing (bij voorkeur B2B SaaS, finance, vastgoed of consultancy).",
      "Sterk in actief luisteren, bezwaren behandelen en vertrouwen opbouwen.",
      "Resultaatgericht, discreet en gedisciplineerd.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Commissie per gecontracteerde B2B-transactie (percentage in overleg).",
      "Volledige arbeidsvoorwaarden.",
    ],
    badgeColor: "border-yellow-500/40 text-yellow-300 bg-yellow-500/10",
  },
  {
    id: "08",
    num: 8,
    title: "Commercieel Agent (Compute, Cloud & Corporate Housing)",
    domain: "Compute & huisvesting",
    category: "sales",
    reward: "Salaris + doorlopende courtage",
    location: "100% remote (eigen regio-indeling mogelijk)",
    experience: "Zelfstandige B2B-sales of agentuurervaring",
    hours: "Flexibel, 24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je vertegenwoordigt de commerciële eindproducten van de operationele clusters in de zakelijke markt: GPU-rekenkracht, zakelijke account-infrastructuur en short-/long-stay huisvesting voor expats en projectteams.",
    tasks: [
      "Verkopen van GPU-servers en digitale infrastructuur aan AI-bedrijven, mediabureaus en tech-ondernemingen.",
      "Bemiddelen in B2B-huisvestingscontracten voor bedrijven die internationale specialisten huisvesten.",
      "Opbouwen en beheren van een eigen klantenkring met meerjarige afnamecontracten.",
    ],
    profile: [
      "HBO/WO, of gedegen commerciële achtergrond.",
      "Sterk zakelijk netwerk in tech, media of corporate vastgoed.",
      "Zelfstandig, plant eigen agenda, bouwt graag aan terugkerende omzet.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Provisie per afgesloten B2B-transactie én doorlopende courtage over contractverlengingen van jouw portefeuille (in overleg).",
      "Standaard arbeidsvoorwaardenpakket.",
    ],
    badgeColor: "border-teal-500/40 text-teal-300 bg-teal-500/10",
  },
  {
    id: "09",
    num: 9,
    title: "B2B Sales Representative (SaaS & Ecosysteem)",
    domain: "SaaS & ecosysteem",
    category: "sales",
    reward: "Salaris + commissie",
    location: "100% remote",
    experience: "Junior / medior / senior",
    hours: "32–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je vult de commerciële pijplijn: je vertegenwoordigt de B2B SaaS-software (CRM, AI-outreach, workflow-automatisering) en de bredere ecosysteem-proposities, opent deuren bij nieuwe zakelijke klanten en zet contacten om in verkoopkansen en getekende orders.",
    tasks: [
      "Uitvoeren van gepersonaliseerde outbound campagnes via telefoon, videomessaging, e-mail en LinkedIn.",
      "Geven van online productdemo's aan MKB- en enterprise-bedrijven.",
      "Kwalificeren van zakelijke partijen en beheren van de eigen salesfunnel in samenwerking met de closers.",
    ],
    profile: [
      "HBO/WO, of sterke aantoonbare saleservaring.",
      "Communicatief vaardig, bestand tegen afwijzing, krijgt energie van nieuwe contacten leggen.",
      "Affiniteit met B2B SaaS, AI-tools en moderne salesmethodieken.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Commissie per gesloten B2B-deal, plus maandelijkse staffelbonus bij behalen van targets (in overleg).",
      "Laptop, smartphone, ergonomisch budget en 27 vakantiedagen.",
    ],
    badgeColor: "border-orange-500/40 text-orange-300 bg-orange-500/10",
  },
  {
    id: "10",
    num: 10,
    title: "Senior Strategy Consultant (AI, Werkkapitaal & M&A)",
    domain: "AI, werkkapitaal, M&A",
    category: "strategy",
    reward: "Salaris + projectfee",
    location: "100% remote",
    experience: "7+ jaar strategy consulting, M&A of enterprise IT",
    hours: "32–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je adviseert op directie- en C-level over AI-automatisering, werkkapitaaloptimalisatie en het begeleiden van fusies, overnames en integraties binnen het ecosysteem.",
    tasks: [
      "Adviseren van middelgrote en grote ondernemingen over AI-executiemotoren, B2B clearing-API's en werkstroomautomatisering.",
      "Identificeren, beoordelen (due diligence) en begeleiden van acquisities van tech-startups, softwarebedrijven en licentiepartners.",
      "Opstellen van business cases op boardroomniveau.",
    ],
    profile: [
      "WO-master in business, finance, economie of IT, of gelijkwaardig topniveau door ervaring.",
      "Minimaal 7 jaar ervaring als strategy consultant, M&A-adviseur of enterprise transformation manager.",
      "Diepgaand financieel inzicht (kasstroommodellen, waarderingen, WCO) en begrip van AI- en cloudarchitecturen.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Projectfee over de contractwaarde van elk enterprise-implementatietraject of afgeronde M&A-transactie (in overleg).",
      "Volledige arbeidsvoorwaarden.",
    ],
    badgeColor: "border-sky-500/40 text-sky-300 bg-sky-500/10",
  },
  {
    id: "11",
    num: 11,
    title: "Subsidieconsultant (R&D, AI & Duurzaam Vastgoed)",
    domain: "R&D, AI, duurzaamheid",
    category: "consulting",
    reward: "Salaris + succespercentage",
    location: "100% remote",
    experience: "3+ jaar als subsidieadviseur of grant writer",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Binnen het ecosysteem wordt geïnvesteerd in eigen R&D en duurzame fysieke infrastructuur. Je haalt nationale, Britse en Europese innovatiesubsidies, tech-grants en fiscale regelingen binnen.",
    tasks: [
      "In kaart brengen van relevante regelingen (WBSO, MIT, Horizon Europe, UK Innovate, duurzaamheidsfondsen).",
      "Opstellen en indienen van technisch en financieel onderbouwde aanvragen in samenwerking met developers, AI-architecten en vastgoedmanagers.",
      "Benutten van fiscale voordelen rond kennismigranten en Europese innovatiehubs.",
      "Verzorgen van projectadministratie en eindverantwoording conform UK GAAP en IFRS.",
    ],
    profile: [
      "HBO/WO, of vergelijkbare ervaring.",
      "Aantoonbare ervaring als subsidieconsultant met sterk slagingspercentage, bij voorkeur op het snijvlak van IT, AI, innovatie en duurzaamheid.",
      "Sterk in het vertalen van technische projecten naar beoordelingscriteria.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Succespercentage over elk daadwerkelijk toegekend subsidiebedrag of gerealiseerd fiscaal voordeel (in overleg).",
      "Standaard secundaire arbeidsvoorwaarden.",
    ],
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  },
  {
    id: "12",
    num: 12,
    title: "Recruitment Consultant (International Talent & Relocation)",
    domain: "Internationaal talent",
    category: "recruitment",
    reward: "Salaris + plaatsingsfee",
    location: "100% remote",
    experience: "1+ jaar recruitment of HR",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je bent verantwoordelijk voor de kandidaatkant: je begeleidt gekwalificeerde kennismigranten door het verificatieproces en matcht hen aan openstaande B2B-vacatures op het platform.",
    tasks: [
      "Voeren van diepte-interviews en begeleiden van kandidaten door screening en verificatie.",
      "Matchen van gevalideerde IT-, engineering- en tech-specialisten aan openstaande vacatures via het ATS.",
      "Coördineren van de digitale overdracht na plaatsing, zodat zusterentiteiten visum, huisvesting en financiële onboarding in gang zetten.",
    ],
    profile: [
      "HBO/WO, of vergelijkbare praktijkervaring.",
      "Mensgericht, empathisch en organisatorisch sterk.",
      "Gestructureerd, vaardig met moderne HR-software.",
      "Vloeiend Nederlands en Engels.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Plaatsingsfee per succesvolle, gecontracteerde B2B-plaatsing (in overleg).",
      "Volledige arbeidsvoorwaarden.",
    ],
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-500/10",
  },
  {
    id: "13",
    num: 13,
    title: "Corporate Funding Broker (Asset-Backed, Lease & Vastgoed)",
    domain: "Hardware & vastgoed",
    category: "finance",
    reward: "Salaris + bemiddelingsfee",
    location: "100% remote",
    experience: "5+ jaar debt advisory, corporate finance of leasing",
    hours: "24–40 per week",
    contractTypes: ["ZZP / Freelance", "Vast Contract"],
    roleOverview:
      "Je structureert en bemiddelt zakelijke financieringen voor de uitbreiding van GPU-serverclusters, de vastgoedportefeuille en de interne factoring- en werkkapitaalfaciliteiten.",
    tasks: [
      "Ophalen en structureren van kredietlijnen, equipment lease-constructies en zakelijke vastgoedhypotheken.",
      "Bemiddelen bij banken, private debt-fondsen en BaaS/EMI-partners voor factoring- en liquiditeitslijnen.",
      "Presenteren van geconsolideerde cijfers (UK GAAP, IFRS) en onderpandstructuren aan kredietcomités.",
    ],
    profile: [
      "HBO/WO, of gelijkwaardig vakmanschap.",
      "Ervaring als zakelijk financieringsadviseur, debt broker, accountmanager grootzakelijk bij een bank of leasing-specialist.",
      "Netwerk van kapitaalverstrekkers, leasemaatschappijen, private debt-fondsen en vastgoedfinanciers.",
    ],
    compensation: [
      "Salaris in overleg, afhankelijk van ervaring.",
      "Bemiddelingscourtage per afgesloten financieringslijn, hardware-lease of vastgoedhypotheek (in overleg).",
      "Volledige arbeidsvoorwaarden.",
    ],
    badgeColor: "border-mint/40 text-mint bg-mint/10",
  },
];
