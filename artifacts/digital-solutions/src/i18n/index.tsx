"use client";

import React, { createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { de, Translations } from "./de";
import { en } from "./en";
import { es } from "./es";

export type Lang = "de" | "en" | "es";
export const LANGS: Lang[] = ["de", "en", "es"];

const translations: Record<Lang, Translations> = { de, en, es };

export function getTranslations(lang: string): Translations {
  const safeLang: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : "de";
  return translations[safeLang];
}

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

export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function setLang(l: Lang) {
    // Replace just the language segment: /de/preview/... → /en/preview/...
    // pathname always starts with /[lang], so replace the first segment.
    const segments = pathname.split("/");
    segments[1] = l;
    router.push(segments.join("/"));
  }

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
