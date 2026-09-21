import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { LumenCtaLink } from "@/components/three/LumenCta";
import { PUBLIC_NAV_ITEMS } from "./publicNav";

interface Props {
  handleNav: (to: string) => void;
}

const PublicHeaderDesktopMenu: React.FC<Props> = ({ handleNav }) => {
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);
  const { pathname } = useLocation();
  const submenu = PUBLIC_NAV_ITEMS[1].submenu;
  const submenuActive = pathname.startsWith("/alles-over-investbot");

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <Link to="/" className={`nav-pill ${pathname === "/" ? "nav-pill--active" : ""}`}>
        Home
      </Link>
      <div
        className="relative"
        onMouseEnter={() => setDesktopSubmenuOpen(true)}
        onMouseLeave={() => setDesktopSubmenuOpen(false)}
      >
        <button
          className={`nav-pill ${submenuActive ? "nav-pill--active" : ""}`}
          tabIndex={0}
          onClick={() => setDesktopSubmenuOpen((v) => !v)}
        >
          Alles over Investbot
          <ChevronDown className={`h-4 w-4 transition-transform ${desktopSubmenuOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {desktopSubmenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="card-glass card-glass--floating absolute left-0 top-full z-[100] mt-3 min-w-[240px] p-2"
            >
              {submenu.map((item) => (
                <button
                  key={item.label}
                  className="w-full rounded-full px-4 py-2.5 text-left text-sm font-medium text-ink-muted transition-colors hover:bg-white/8 hover:text-ink"
                  onClick={() => handleNav(item.to)}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {PUBLIC_NAV_ITEMS.slice(2).map((item) =>
        "to" in item ? (
          <button
            key={item.title}
            className={`nav-pill ${pathname === item.to ? "nav-pill--active" : ""}`}
            onClick={() => handleNav(item.to)}
          >
            {item.title}
          </button>
        ) : null,
      )}
      <div className="ml-3 flex items-center gap-2">
        {isMember ? (
          <LumenCtaLink to="/member/dashboard" size="sm" variant="ghost">
            Member Dashboard
          </LumenCtaLink>
        ) : (
          <LumenCtaLink to="/auth" size="sm" variant="ghost">
            Login
          </LumenCtaLink>
        )}
        <LumenCtaLink to="/register" size="sm" dot>
          Aanmelden
        </LumenCtaLink>
      </div>
    </nav>
  );
};

export default PublicHeaderDesktopMenu;
