import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import PublicHeaderMobileMenu from "./PublicHeaderMobileMenu";
import BrandLogo from "./BrandLogo";

const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const Logo = <BrandLogo variant="dark" size="md" showSubtitle={false} to="/" />;

  return (
    <header
      className={`fixed left-0 top-0 z-40 w-full transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-canvas-hairline bg-canvas/95 backdrop-blur-xl shadow-level-2"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-content items-center justify-between px-6 lg:px-10">
        {Logo}
        <PublicHeaderDesktopMenu handleNav={handleNav} />
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-canvas-hairline bg-white/5 text-ink transition-colors hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <PublicHeaderMobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} Logo={Logo} />
    </header>
  );
};

export default PublicHeader;
