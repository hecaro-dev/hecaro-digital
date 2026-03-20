/* =============================================
   Home Page – orchestrates all sections
   ============================================= */
import { useState, useCallback } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import LegalModal from "../components/LegalSection";

type LegalType = "imprint" | "privacy" | null;

/* Smooth scroll to section by id */
function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const offset = 72; /* header height */
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
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
      >
        Skip to content
      </a>

      <Header onNav={handleNav} />

      <main id="main-content">
        <HeroSection onNav={handleNav} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer onLegal={handleLegal} />
      <LegalModal type={legalOpen} onClose={closeLegal} />
    </>
  );
}
