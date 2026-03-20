/* =============================================
   i18n Context & Hook
   ============================================= */
import React, { createContext, useContext, useState, useEffect } from "react";
import { de, Translations } from "./de";
import { en } from "./en";
import { es } from "./es";

export type Lang = "de" | "en" | "es";

const translations: Record<Lang, Translations> = { de, en, es };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "de",
  setLang: () => {},
  t: de,
});

/* Detect browser language and map to supported lang */
function detectLang(): Lang {
  const stored = localStorage.getItem("ds-lang") as Lang | null;
  if (stored && translations[stored]) return stored;
  const browser = navigator.language.split("-")[0];
  if (browser === "en") return "en";
  if (browser === "es") return "es";
  return "de";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("ds-lang", l);
    document.documentElement.lang = l;
  }

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export type { Translations };
export { de, en, es };
