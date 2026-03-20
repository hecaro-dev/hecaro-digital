"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

interface HeaderProps {
  onNav: (section: string) => void;
}

const LOGO_FILTER = "brightness(0) invert(1)";

function HLogo({ height, flip = false }: { height: number; flip?: boolean }) {
  return (
    <img
      src="/hecaro-logo.png"
      alt=""
      aria-hidden="true"
      style={{
        height,
        width: "auto",
        display: "block",
        flexShrink: 0,
        filter: LOGO_FILTER,
        transform: flip ? "scaleX(-1)" : undefined,
        userSelect: "none",
      }}
    />
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
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* ── Brand lockup ────────────────────────────────────────── */}
          <button
            onClick={() => handleNav("top")}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
            aria-label="HECARO Digital – Home"
          >
            {/* Desktop: [H logo] | name + subline | [H logo mirrored] */}
            <span className="hidden sm:flex items-center gap-4">
              <HLogo height={60} />
              <span className="flex flex-col items-center leading-tight">
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.06em",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  HECARO Digital
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.46)",
                    letterSpacing: "0.09em",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                    marginTop: 3,
                  }}
                >
                  International Web Design &amp; SEO
                </span>
              </span>
              <HLogo height={60} flip />
            </span>

            {/* Mobile: [H logo] | name + subline */}
            <span className="flex sm:hidden items-center gap-3">
              <HLogo height={40} />
              <span className="flex flex-col leading-tight">
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    fontFamily: "inherit",
                  }}
                >
                  HECARO Digital
                </span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.46)",
                    letterSpacing: "0.07em",
                    fontFamily: "inherit",
                    marginTop: 2,
                  }}
                >
                  International Web Design &amp; SEO
                </span>
              </span>
            </span>
          </button>

          {/* ── Desktop nav ─────────────────────────────────────────── */}
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

          {/* ── Language switcher + hamburger ───────────────────────── */}
          <div className="flex items-center gap-4">
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

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
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
