import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronDown, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

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
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Logo: React.ReactNode;
}

const PublicHeaderMobileMenu: React.FC<Props> = ({ menuOpen, setMenuOpen, Logo }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.27 }}
          className="fixed inset-0 bg-white z-50"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32 }}
            className="absolute right-0 top-0 h-full w-4/5 max-w-xs sm:max-w-md bg-white shadow-2xl flex flex-col p-0 z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              {Logo}
              <button
                className="p-2 rounded-full hover:bg-indigo-50 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Sluit menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 px-6 py-5">
              <button
                className="font-semibold py-2 px-2 rounded hover:bg-indigo-50 text-left transition"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/");
                }}
              >
                Home
              </button>
              <div className="w-full">
                <button
                  className="flex items-center w-full justify-between font-semibold py-2 px-2 rounded hover:bg-indigo-50 transition"
                  onClick={() => setSubmenuOpen((o) => !o)}
                >
                  <span>Alles over Investbot</span>
                  <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {submenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.21 }}
                      className="flex flex-col mt-1 ml-4"
                    >
                      {NAV_ITEMS[1].submenu?.map((item) => (
                        <button
                          key={item.label}
                          className="py-2 w-full text-left text-gray-800 rounded hover:text-indigo-600 hover:bg-indigo-50 transition"
                          onClick={() => {
                            setMenuOpen(false);
                            setSubmenuOpen(false);
                            navigate(item.to);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {NAV_ITEMS.slice(2).map((item) => (
                <button
                  key={item.title}
                  className="font-semibold py-2 px-2 rounded hover:bg-indigo-50 text-left transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(item.to!);
                  }}
                >
                  {item.title}
                </button>
              ))}
              
              <div className="flex-1" />
            </nav>
            <div className="border-t mt-0 pt-3 pb-5 px-6 flex flex-col gap-2">
              {!user && (
                <>
                  <a
                    href="https://leadsinvestbotiq.netlify.app"
                    className="block w-full py-2 px-3 rounded bg-indigo-500 text-white font-semibold text-center hover:bg-indigo-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Aanmelden
                  </a>
                  <Link
                    to="/auth"
                    className="block w-full py-2 px-3 rounded bg-gray-100 text-indigo-700 font-semibold text-center hover:bg-indigo-200 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log-in
                  </Link>
                </>
              )}
              {isMember && (
                <Link
                  to="/member/dashboard"
                  className="block w-full py-2 px-3 rounded bg-blue-100 text-blue-700 font-semibold text-center hover:bg-blue-200 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Member Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PublicHeaderMobileMenu;
