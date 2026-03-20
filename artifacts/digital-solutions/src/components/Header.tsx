/* =============================================
   Header / Navigation Component
   ============================================= */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

interface HeaderProps {
  onNav: (section: string) => void;
}

export default function Header({ onNav }: HeaderProps) {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "services", label: t.nav.services },
    { key: "portfolio", label: t.nav.portfolio },
    { key: "faq", label: t.nav.faq },
    { key: "contact", label: t.nav.contact },
  ];

  function handleNav(section: string) {
    onNav(section);
    setMenuOpen(false);
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[rgba(0,0,0,0.85)] backdrop-blur-lg border-b border-white/5 shadow-lg"
          : "bg-transparent"}
      `}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("top")}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            aria-label="Digital Solutions – zur Startseite"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-bold text-white tracking-tight text-lg">Digital Solutions</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              {(["de", "en", "es"] as const).map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  <button
                    onClick={() => setLang(l)}
                    className={`transition-colors uppercase ${lang === l ? "text-white" : "hover:text-slate-200"}`}
                  >
                    {l}
                  </button>
                  {i < 2 && <span className="text-white/20">|</span>}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => handleNav("contact")}
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-lg shadow-indigo-500/20"
            >
              {t.nav.contact}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className="text-left text-slate-300 hover:text-white py-2 text-lg font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-4 py-4 border-t border-white/10 mt-2">
                {(["de", "en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setMenuOpen(false);
                    }}
                    className={`text-sm font-semibold uppercase ${lang === l ? "text-white" : "text-slate-500"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleNav("contact")}
                className="mt-2 px-4 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition-all duration-200 text-center"
              >
                {t.nav.contact}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
