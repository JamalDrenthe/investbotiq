import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Home,
  Layers,
  Shield,
  HelpCircle,
  Mail,
  LogIn,
  UserPlus,
  ArrowRight,
  FileText,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { usePreferences } from "@/lib/preferences";
import PreferenceToggles from "@/components/PreferenceToggles";
import BrandLogo from "./BrandLogo";
import { PUBLIC_NAV_ITEMS } from "./publicNav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Logo?: React.ReactNode;
}

const PublicHeaderMobileMenu: React.FC<Props> = ({ menuOpen, setMenuOpen, Logo }) => {
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const { user, userRole } = useAuth();
  const { t } = usePreferences();
  const location = useLocation();
  const navigate = useNavigate();
  const isMember = !!user && userRole === "member";
  const isAdmin = !!user && userRole === "admin";
  const submenu = PUBLIC_NAV_ITEMS[1].submenu;

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(t("Succesvol uitgelogd"));
      setMenuOpen(false);
      navigate("/", { replace: true });
    } catch {
      toast.error(t("Fout bij uitloggen"));
    }
  };

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent
        side="right"
        className="flex h-full w-[88%] max-w-sm flex-col p-0 border-l border-white/10 bg-[#070a14] text-white shadow-2xl z-[100]"
      >
        <SheetHeader className="flex h-[72px] flex-row items-center justify-between border-b border-white/10 px-6 space-y-0">
          <SheetTitle className="sr-only">{t("Navigatiemenu")}</SheetTitle>
          {Logo ?? <BrandLogo variant="dark" size="md" showSubtitle={false} to="/" />}
        </SheetHeader>

        {/* Top Prominent Auth Action Card */}
        <div className="p-4 border-b border-white/10 bg-white/[0.02]">
          {!user ? (
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                onClick={() => go("/auth")}
                variant="outline"
                className="w-full border-white/20 bg-white/5 hover:bg-white/15 text-white rounded-xl py-5 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <LogIn className="h-4 w-4 text-cyan-400" />
                <span>{t("Inloggen")}</span>
              </Button>
              <Button
                onClick={() => go("/register")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-5 font-semibold text-sm shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>{t("Registreren")}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl bg-indigo-600/15 border border-indigo-500/25 p-3">
              <div className="min-w-0 pr-2">
                <p className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
                  {t("Ingelogd als")}
                </p>
                <p className="text-sm font-semibold text-white truncate">{user.email}</p>
              </div>
              <Button
                size="sm"
                onClick={() => go(isAdmin ? "/admin" : "/member/dashboard")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1.5"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Button>
            </div>
          )}
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {/* Home */}
          <button
            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold transition-colors ${
              location.pathname === "/"
                ? "bg-indigo-600/20 text-indigo-300 shadow-[inset_3px_0_0_#635bff]"
                : "text-zinc-200 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => go("/")}
          >
            <Home className="h-5 w-5 text-indigo-400" />
            <span>{t("Home")}</span>
          </button>

          {/* Alles over Investbot Submenu */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-2 my-1.5">
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-indigo-300"
              onClick={() => setSubmenuOpen((o) => !o)}
            >
              <span>{t(PUBLIC_NAV_ITEMS[1].title)}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  submenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {submenuOpen && (
              <div className="mt-1 flex flex-col space-y-1">
                {submenu.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between ${
                      location.pathname === item.to
                        ? "bg-indigo-600/30 text-white font-semibold"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => go(item.to)}
                  >
                    <span>{t(item.label)}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Public Nav items: Tier Plannen, Veiligheid, FAQ, Contact */}
          {PUBLIC_NAV_ITEMS.slice(2).map((item) =>
            "to" in item ? (
              <button
                key={item.title}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold transition-colors ${
                  location.pathname === item.to
                    ? "bg-indigo-600/20 text-indigo-300 shadow-[inset_3px_0_0_#635bff]"
                    : "text-zinc-200 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => go(item.to)}
              >
                {item.to.includes("tier") && <Layers className="h-5 w-5 text-cyan-400" />}
                {item.to.includes("veiligheid") && <Shield className="h-5 w-5 text-emerald-400" />}
                {item.to.includes("faq") && <HelpCircle className="h-5 w-5 text-amber-400" />}
                {item.to.includes("contact") && <Mail className="h-5 w-5 text-rose-400" />}
                <span>{t(item.title)}</span>
              </button>
            ) : null,
          )}

          {/* Direct Auth links in menu list */}
          <div className="pt-2 my-2 border-t border-white/10 space-y-1">
            {!user ? (
              <>
                <button
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-cyan-300 hover:bg-white/5 transition-colors"
                  onClick={() => go("/auth")}
                >
                  <LogIn className="h-5 w-5 text-cyan-400" />
                  <span>{t("Inloggen")}</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-indigo-300 hover:bg-white/5 transition-colors"
                  onClick={() => go("/register")}
                >
                  <UserPlus className="h-5 w-5 text-indigo-400" />
                  <span>{t("Registreren")}</span>
                </button>
              </>
            ) : (
              <button
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-rose-300 hover:bg-white/5 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-rose-400" />
                <span>{t("Uitloggen")}</span>
              </button>
            )}
          </div>

          {/* Legal links */}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-1 px-3">
            <button
              onClick={() => go("/algemene-voorwaarden")}
              className="flex items-center gap-2 text-left text-xs text-zinc-400 hover:text-zinc-200 py-1 transition"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{t("Algemene Voorwaarden")}</span>
            </button>
            <button
              onClick={() => go("/privacybeleid")}
              className="flex items-center gap-2 text-left text-xs text-zinc-400 hover:text-zinc-200 py-1 transition"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{t("Privacybeleid")}</span>
            </button>
          </div>
        </nav>

        {/* Footer preferences & CTAs */}
        <div className="flex flex-col gap-3 border-t border-white/10 px-5 pb-8 pt-4 bg-[#05070f]">
          <div className="flex justify-center pb-1">
            <PreferenceToggles />
          </div>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => go("/register")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-base"
              >
                <UserPlus className="h-5 w-5" />
                <span>{t("Registreren")}</span>
              </Button>
              <Button
                onClick={() => go("/auth")}
                variant="outline"
                className="w-full border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-xl py-6 font-semibold flex items-center justify-center gap-2 text-base"
              >
                <LogIn className="h-4 w-4 text-cyan-400" />
                <span>{t("Inloggen")}</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => go(isAdmin ? "/admin" : "/member/dashboard")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-base"
            >
              <span>{isAdmin ? t("Admin Dashboard") : t("Member Dashboard")}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PublicHeaderMobileMenu;
