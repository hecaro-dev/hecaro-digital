"use client";

import { useCallback, useEffect } from "react";
import { I18nProvider, LANGS, type Lang, useI18n } from "../i18n";
import CustomCursor from "./CustomCursor";
import Header from "./Header";
import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";
import ServicesSection from "./ServicesSection";
import WebsitesSection from "./WebsitesSection";
import MaintenanceSection from "./MaintenanceSection";
import ReferenceSection from "./ReferenceSection";
import PortfolioSection from "./PortfolioSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function HomePageInner() {
  const handleNav = useCallback((section: string) => scrollTo(section), []);

  return (
    <>
      <CustomCursor />
      <a href="#main-content" className="sr-only">
        Skip to content
      </a>
      <Header onNav={handleNav} />
      <main id="main-content">
        <HeroSection onNav={handleNav} />
        <MarqueeSection />
        <WebsitesSection />
        <MaintenanceSection />
        <ServicesSection />
        <PortfolioSection />
        <ReferenceSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer onNav={handleNav} />
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
