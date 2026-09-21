import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { LumenCtaButton, LumenCtaLink } from "@/components/three/LumenCta";
import { PUBLIC_NAV_ITEMS } from "./publicNav";

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Logo: React.ReactNode;
}

const PublicHeaderMobileMenu: React.FC<Props> = ({ menuOpen, setMenuOpen, Logo }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const navigate = useNavigate();
  const submenu = PUBLIC_NAV_ITEMS[1].submenu;

  const go = (to: string) => {
    setMenuOpen(false);
    setSubmenuOpen(false);
    navigate(to);
  };

  const itemClass =
    "w-full rounded-full px-4 py-3 text-left text-base font-medium text-ink-muted transition-colors hover:bg-white/8 hover:text-ink";

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-canvas/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 z-[100] flex h-full w-[86%] max-w-sm flex-col border-l border-canvas-hairline bg-canvas-elevated text-ink shadow-level-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[72px] items-center justify-between border-b border-canvas-hairline px-6">
              {Logo}
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-canvas-hairline bg-white/5 transition hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
                aria-label="Sluit menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
              <button className={itemClass} onClick={() => go("/")}>
                Home
              </button>
              <div className="w-full">
                <button
                  className={`${itemClass} flex items-center justify-between`}
                  onClick={() => setSubmenuOpen((o) => !o)}
                >
                  <span>Alles over Investbot</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${submenuOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {submenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-1 flex flex-col border-l border-canvas-hairline pl-2"
                    >
                      {submenu.map((item) => (
                        <button
                          key={item.label}
                          className="w-full rounded-full px-4 py-2.5 text-left text-sm text-ink-muted transition hover:bg-white/8 hover:text-ink"
                          onClick={() => go(item.to)}
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
                  <button key={item.title} className={itemClass} onClick={() => go(item.to)}>
                    {item.title}
                  </button>
                ) : null,
              )}
            </nav>
            <div className="flex flex-col gap-3 border-t border-canvas-hairline px-6 pb-8 pt-5">
              {!user && (
                <>
                  <LumenCtaLink to="/register" dot className="w-full" onClick={() => setMenuOpen(false)}>
                    Aanmelden
                  </LumenCtaLink>
                  <LumenCtaButton variant="ghost" className="w-full" onClick={() => go("/auth")}>
                    Login
                  </LumenCtaButton>
                </>
              )}
              {isMember && (
                <LumenCtaButton variant="ghost" className="w-full" onClick={() => go("/member/dashboard")}>
                  Member Dashboard
                </LumenCtaButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PublicHeaderMobileMenu;
