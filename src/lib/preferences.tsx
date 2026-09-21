import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { EN } from "@/lib/en";

export type Language = "nl" | "en";
/** `auto` keeps the route-driven default: dark on app surfaces, light elsewhere. */
export type ThemeMode = "auto" | "light" | "dark";
export type EffectiveTheme = "light" | "dark";

const LANG_KEY = "investbotiq.lang";
const THEME_KEY = "investbotiq.theme";

const CANVAS_ROUTE_PREFIXES = ["/member", "/admin", "/auth", "/register"];

const readStored = <T extends string>(key: string, allowed: readonly T[]): T | null => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw != null && (allowed as readonly string[]).includes(raw) ? (raw as T) : null;
  } catch {
    return null;
  }
};

interface PreferencesContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  effectiveTheme: EffectiveTheme;
  /** Translates a canonical (Dutch) source string; falls back to the source. */
  t: (source: string) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [lang, setLangState] = useState<Language>(
    () => readStored(LANG_KEY, ["nl", "en"] as const) ?? "nl",
  );
  const [theme, setThemeState] = useState<ThemeMode>(
    () => readStored(THEME_KEY, ["auto", "light", "dark"] as const) ?? "auto",
  );

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* storage unavailable */
    }
  };

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable */
    }
  };

  const effectiveTheme: EffectiveTheme =
    theme === "auto"
      ? CANVAS_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", effectiveTheme === "dark");
    root.classList.toggle("light", effectiveTheme === "light");
    root.style.colorScheme = effectiveTheme;
    root.lang = lang;
  }, [effectiveTheme, lang]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      lang,
      setLang,
      theme,
      setTheme,
      effectiveTheme,
      t: (source: string) => (lang === "en" ? EN[source] ?? source : source),
    }),
    [lang, theme, effectiveTheme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
