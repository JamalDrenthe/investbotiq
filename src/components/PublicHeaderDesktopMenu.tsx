import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  {
    title: "Home",
    to: "/",
    desktopOnly: false
  },
  {
    title: "Alles over Investbot",
    submenu: [
      { label: "Wat is het?", to: "/alles-over-investbot/wat-is-het" },
      { label: "Hoe werkt het?", to: "/alles-over-investbot/hoe-werkt-het" },
      { label: "Missie & Visie", to: "/alles-over-investbot/mission-vision" }
    ],
    desktopOnly: false
  },
  { title: "Tier Plannen", to: "/tier-plannen", desktopOnly: false },
  { title: "Veiligheid", to: "/veiligheid", desktopOnly: false },
  { title: "FAQ", to: "/faq", desktopOnly: false }
];

interface Props {
  handleNav: (to: string) => void;
}

const PublicHeaderDesktopMenu: React.FC<Props> = ({ handleNav }) => {
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-6 relative">
      <Link to="/" className="px-3 py-2 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
        Home
      </Link>
      {/* Alles over Investbot (Dropdown) */}
      <div
        className="relative group"
        onMouseEnter={() => setDesktopSubmenuOpen(true)}
        onMouseLeave={() => setDesktopSubmenuOpen(false)}
      >
        <button
          className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-50 font-semibold transition-colors"
          tabIndex={0}
          onClick={() => setDesktopSubmenuOpen((v) => !v)}
        >
          Alles over Investbot
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${
              desktopSubmenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
        {desktopSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24 }}
            className="absolute left-0 top-full min-w-[220px] rounded-md shadow-lg bg-white border z-[100] animate-fade-in"
          >
            {NAV_ITEMS[1].submenu?.map((item) => (
              <button
                key={item.label}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors"
                onClick={() => handleNav(item.to)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      {/* Single nav items */}
      {NAV_ITEMS.slice(2).map((item) => (
        <button
          key={item.title}
          className="px-3 py-2 rounded-md hover:bg-indigo-50 font-semibold transition-colors"
          onClick={() => handleNav(item.to!)}
        >
          {item.title}
        </button>
      ))}
      {/* Inloggen knop + Registreren knop */}
      <Link to="/auth" className="flex items-center px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 font-semibold transition-all ml-2">
        <LogIn className="mr-2 h-4 w-4" /> Log-in
      </Link>
      <a
        href="https://leadsinvestbotiq.netlify.app"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground h-10 px-4 py-2 transition-all hover:bg-indigo-600 hover:scale-105 ml-2"
      >
        Aanmelden
      </a>
      {/* Register / Member */}

      {isMember && (
        <Link
          to="/member/dashboard"
          className="px-5 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold transition-all ml-2"
        >
          Member Dashboard
        </Link>
      )}
    </nav>
  );
};

export default PublicHeaderDesktopMenu;
