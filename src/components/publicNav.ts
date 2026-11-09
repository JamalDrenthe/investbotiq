export const PUBLIC_NAV_ITEMS = [
  {
    title: "Alles over Investbot",
    submenu: [
      { label: "Wat is het?", to: "/alles-over-investbot/wat-is-het" },
      { label: "Hoe werkt het?", to: "/alles-over-investbot/hoe-werkt-het" },
      { label: "Missie & Visie", to: "/alles-over-investbot/mission-vision" },
    ],
  },
  { title: "Flows", to: "/flows" },
  { title: "Veiligheid", to: "/veiligheid" },
  { title: "Vacatures", to: "/vacatures" },
  { title: "FAQ", to: "/faq" },
  { title: "Contact", to: "/contact" },
] as const;
