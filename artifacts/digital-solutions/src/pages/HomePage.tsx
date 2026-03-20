import { useState, useCallback } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MarqueeSection from "../components/MarqueeSection";
import ServicesSection from "../components/ServicesSection";
import ValuesSection from "../components/ValuesSection";
import PortfolioSection from "../components/PortfolioSection";
import AboutSection from "../components/AboutSection";
import TechStackSection from "../components/TechStackSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import LegalModal from "../components/LegalSection";

type LegalType = "imprint" | "privacy" | null;

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function HomePage() {
  const [legalOpen, setLegalOpen] = useState<LegalType>(null);

  const handleNav = useCallback((section: string) => scrollTo(section), []);
  const handleLegal = useCallback((type: "imprint" | "privacy") => setLegalOpen(type), []);
  const closeLegal = useCallback(() => setLegalOpen(null), []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
      >
        Skip to content
      </a>

      <Header onNav={handleNav} />

      <main id="main-content" className="bg-black">
        <HeroSection onNav={handleNav} />
        <MarqueeSection />
        <ServicesSection />
        <ValuesSection />
        <PortfolioSection />
        <AboutSection />
        <TechStackSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer onLegal={handleLegal} onNav={handleNav} />
      <LegalModal type={legalOpen} onClose={closeLegal} />
    </>
  );
}
