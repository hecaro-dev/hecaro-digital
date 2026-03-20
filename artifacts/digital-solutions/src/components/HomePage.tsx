"use client";

import { useState, useCallback, useEffect } from "react";
import { I18nProvider, LANGS, type Lang } from "../i18n";
import CustomCursor from "./CustomCursor";
import Header from "./Header";
import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";
import ServicesSection from "./ServicesSection";
import ValuesSection from "./ValuesSection";
import PortfolioSection from "./PortfolioSection";
import AboutSection from "./AboutSection";
import ProcessSection from "./ProcessSection";
import TechStackSection from "./TechStackSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import LegalModal from "./LegalSection";

type LegalType = "imprint" | "privacy" | null;

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function HomePageInner() {
  const [legalOpen, setLegalOpen] = useState<LegalType>(null);
  const handleNav = useCallback((section: string) => scrollTo(section), []);
  const handleLegal = useCallback(
    (type: "imprint" | "privacy") => setLegalOpen(type),
    []
  );
  const closeLegal = useCallback(() => setLegalOpen(null), []);

  return (
    <>
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold"
      >
        Skip to content
      </a>
      <Header onNav={handleNav} />
      <main id="main-content">
        <HeroSection onNav={handleNav} />
        <MarqueeSection />
        <ServicesSection />
        <ValuesSection />
        <PortfolioSection />
        <AboutSection />
        <ProcessSection />
        <TechStackSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer onLegal={handleLegal} onNav={handleNav} />
      <LegalModal type={legalOpen} onClose={closeLegal} />
    </>
  );
}

export function HomePage({ lang }: { lang: string }) {
  const safeLang: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : "de";

  useEffect(() => {
    document.documentElement.lang = safeLang;
  }, [safeLang]);

  return (
    <I18nProvider lang={safeLang}>
      <HomePageInner />
    </I18nProvider>
  );
}
