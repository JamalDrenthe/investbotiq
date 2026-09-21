export const PUBLIC_NAV_ITEMS = [
  { title: "Home", to: "/" },
  {
    title: "Alles over Investbot",
    submenu: [
      { label: "Wat is het?", to: "/alles-over-investbot/wat-is-het" },
      { label: "Hoe werkt het?", to: "/alles-over-investbot/hoe-werkt-het" },
      { label: "Missie & Visie", to: "/alles-over-investbot/mission-vision" },
    ],
  },
  { title: "Tier Plannen", to: "/tier-plannen" },
  { title: "Veiligheid", to: "/veiligheid" },
  { title: "FAQ", to: "/faq" },
] as const;

