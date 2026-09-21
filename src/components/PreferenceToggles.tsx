import React from "react";
import { Moon, Sun } from "lucide-react";
import { usePreferences } from "@/lib/preferences";

/**
 * Light/dark + NL/EN preference toggles rendered in the site chrome.
 * Both persist to localStorage; the theme toggle sets an explicit override,
 * while the default ("auto") keeps the route-driven theme.
 */
const PreferenceToggles: React.FC = () => {
  const { effectiveTheme, setTheme, lang, setLang, t } = usePreferences();
  const nextTheme = effectiveTheme === "dark" ? "light" : "dark";

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setTheme(nextTheme)}
        aria-label={t("Thema wisselen")}
        title={t("Thema wisselen")}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-canvas-hairline bg-white/5 text-ink-muted transition-colors hover:bg-white/10 hover:text-ink"
      >
        {effectiveTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <div
        role="group"
        aria-label={t("Taal wisselen")}
        className="flex h-9 items-center rounded-full border border-canvas-hairline bg-white/5 p-0.5 text-[11px] font-black tracking-wider"
      >
        {(["nl", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`rounded-full px-2 py-1 uppercase transition-colors ${
              lang === code ? "bg-indigo text-white shadow-lumen" : "text-ink-muted hover:text-ink"
            }`}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreferenceToggles;
