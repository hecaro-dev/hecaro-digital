import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

interface HeaderProps {
  onNav: (section: string) => void;
}

function DSLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="#020617" />
      <path
        d="M8 10h7.5c4.142 0 7.5 3.358 7.5 7.5v1C23 22.642 19.642 26 15.5 26H8V10z"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M21 13.5c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5"
        stroke="#6366f1"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="25.5" cy="18" r="1.5" fill="#10b981" />
    </svg>
  );
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

  const langs = ["de", "en", "es"] as const;

  function handleNav(section: string) {
    onNav(section);
    setMenuOpen(false);
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? "bg-[rgba(2,6,23,0.88)] backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
          : "bg-transparent"}
      `}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button
            onClick={() => handleNav("top")}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
            aria-label="Digital Solutions – Startseite"
          >
            <DSLogo />
            <span className="font-bold text-white tracking-tight text-lg hidden sm:block">
              Digital Solutions
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {/* Language pill toggle */}
            <div className="hidden sm:flex items-center bg-white/[0.05] border border-white/[0.08] rounded-full p-0.5 backdrop-blur-sm">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    lang === l
                      ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                  aria-pressed={lang === l}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => handleNav("contact")}
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-lg shadow-emerald-500/25"
            >
              {t.nav.contact}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[rgba(2,6,23,0.97)] backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <nav className="px-5 py-6 flex flex-col gap-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className="text-left text-slate-300 hover:text-white py-2.5 text-base font-medium transition-colors border-b border-white/[0.04] last:border-0"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 py-4">
                <div className="flex items-center bg-white/[0.05] border border-white/[0.08] rounded-full p-0.5">
                  {langs.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setMenuOpen(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200 ${
                        lang === l
                          ? "bg-emerald-500 text-black"
                          : "text-slate-400"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleNav("contact")}
                className="mt-1 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all duration-200 text-center text-sm"
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
