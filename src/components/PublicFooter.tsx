import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { PUBLIC_NAV_ITEMS } from "./publicNav";
import { usePreferences } from "@/lib/preferences";

const PublicFooter: React.FC = () => {
  const { t } = usePreferences();
  const year = new Date().getFullYear();
  return (
    <footer className="band-canvas hairline-top">
      <div className="mx-auto grid w-full max-w-content gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div className="flex flex-col gap-5">
          <BrandLogo variant="dark" size="md" to="/" />
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">Automated Cashflow Platform</p>
          <div className="chip chip--cyan w-fit">{t("IQ Bot actief")}</div>
        </div>
        <div>
          <div className="eyebrow mb-5">{t("Navigatie")}</div>
          <ul className="flex flex-col gap-3 text-sm">
            {PUBLIC_NAV_ITEMS.map((item) =>
              "to" in item ? (
                <li key={item.title}>
                  <Link to={item.to} className="text-ink-muted transition-colors hover:text-ink">
                    {t(item.title)}
                  </Link>
                </li>
              ) : (
                item.submenu.map((sub) => (
                  <li key={sub.to}>
                    <Link to={sub.to} className="text-ink-muted transition-colors hover:text-ink">
                      {t(sub.label)}
                    </Link>
                  </li>
                ))
              ),
            )}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-5">{t("Juridisch")}</div>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href="#" className="text-ink-muted transition-colors hover:text-ink">
                {t("Algemene Voorwaarden")}
              </a>
            </li>
            <li>
              <a href="#" className="text-ink-muted transition-colors hover:text-ink">
                {t("Privacybeleid")}
              </a>
            </li>
            <li>
              <a href="#" className="text-ink-muted transition-colors hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline-top">
        <div className="mx-auto flex w-full max-w-content items-center px-6 py-6 text-xs text-ink-faint lg:px-10">
          <span className="tnum">© {year} Invest Bot IQ</span>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
