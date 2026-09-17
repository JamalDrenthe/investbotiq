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
    <nav className="relative hidden items-center gap-1 md:flex lg:gap-2 xl:gap-3">
      <Link to="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700">
        Home
      </Link>
      {/* Alles over Investbot (Dropdown) */}
      <div
        className="relative group"
        onMouseEnter={() => setDesktopSubmenuOpen(true)}
        onMouseLeave={() => setDesktopSubmenuOpen(false)}
      >
        <button
          className="flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
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
            className="absolute left-0 top-full z-[100] mt-3 min-w-[240px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl animate-fade-in"
          >
            {NAV_ITEMS[1].submenu?.map((item) => (
              <button
                key={item.label}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
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
          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => handleNav(item.to!)}
        >
          {item.title}
        </button>
      ))}
      {/* Inloggen knop + Registreren knop */}
      <Link to="/auth" className="ml-2 flex items-center rounded-xl bg-[#635bff] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600">
        <LogIn className="mr-2 h-4 w-4" /> Log-in
      </Link>
      <a
        href="https://leadsinvestbotiq.netlify.app"
        className="ml-1 inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
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
