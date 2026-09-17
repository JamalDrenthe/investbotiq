
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import PublicHeaderMobileMenu from "./PublicHeaderMobileMenu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [{
  title: "Home",
  to: "/",
  desktopOnly: false
}, {
  title: "Alles over Investbot",
  submenu: [{
    label: "Wat is het?",
    to: "/alles-over-investbot/wat-is-het"
  }, {
    label: "Hoe werkt het?",
    to: "/alles-over-investbot/hoe-werkt-het"
  }, {
    label: "Missie & Visie",
    to: "/alles-over-investbot/mission-vision"
  }],
  desktopOnly: false
}, {
  title: "Tier Plannen",
  to: "/tier-plannen",
  desktopOnly: false
}, {
  title: "Veiligheid",
  to: "/veiligheid",
  desktopOnly: false
}, {
  title: "FAQ",
  to: "/faq",
  desktopOnly: false
}];

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";

  // Add the missing handleNav function here
  const handleNav = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const Logo = (
    <Link 
      to="/" 
      className="flex items-center gap-4 cursor-pointer select-none" 
      aria-label="Invest Bot IQ Homepage"
    >
      <img 
        src="/lovable-uploads/f072ab55-6051-4ac3-a481-2047383cf59f.png" 
        alt="Invest Bot IQ Icon" 
        className="h-10 w-auto"
      />
      <img 
        src="/lovable-uploads/4befc6ee-1b19-4552-af1f-062bf7191a8a.png" 
        alt="Invest Bot IQ Logo" 
        className="h-8 w-auto hidden md:block"
      />
      <img
        src="/lovable-uploads/4befc6ee-1b19-4552-af1f-062bf7191a8a.png"
        alt="Extra Logo"
        className="h-8 w-auto block md:hidden"
      />
    </Link>
  );

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-white/50 bg-white/75 shadow-[0_10px_40px_rgba(38,44,92,0.08)] backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between px-4 md:h-24">
        {Logo}
        <div className="flex items-center space-x-4">

          <PublicHeaderDesktopMenu handleNav={handleNav} />
          <button className="rounded-xl border border-slate-200 bg-white/70 p-2.5 transition-colors hover:bg-indigo-50 md:hidden" aria-label={menuOpen ? "Sluit menu" : "Open menu"} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>
      <PublicHeaderMobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} Logo={Logo} />
    </header>
  );
};

export default PublicHeader;
