"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "../i18n";

interface HeroSectionProps {
  onNav: (section: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function anim(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease },
  };
}

export default function HeroSection({ onNav }: HeroSectionProps) {
  const { t } = useI18n();
  const headlineParts = t.hero.headline.split("\n");

  const ctaRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 280, damping: 22, mass: 0.5 });

  const onCtaMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const r = ctaRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
    mx.set(Math.max(-8, Math.min(8, dx)));
    my.set(Math.max(-8, Math.min(8, dy)));
  };

  const onCtaLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background atmosphere ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-emerald-600/8 rounded-full blur-[140px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070a]/60 to-[#05070a]" />
      </div>

      {/*
        ── 2-column grid layout ─────────────────────────────────────
        Breakpoint: md (768px) — kicks in at user's 811px canvas viewport.
        LEFT  : Logo — responsive width (fills 1fr column), aspect-ratio
                crops HECAROOO text at 55% height. filter: brightness(0)
                invert(1) makes dark PNG white. Colors/glow unchanged.
        RIGHT : Text — max-w-2xl limits line length for comfortable reading.
        gap-24 (96px) gives generous breathing room between columns.
      */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] items-center gap-12 md:gap-24">

          {/* ── LEFT: Logo — responsive, crops HECAROOO ─────────────── */}
          <motion.div
            {...anim(0)}
            className="flex items-center justify-center md:justify-start"
          >
            {/*
              The image is a 1:1 square PNG (dark mark on transparent).
              Wrapper: aspect-ratio 100/55 (wider than tall) clips the bottom
              45% so "HECAROOO" text never shows. brightness(0) invert(1)
              turns the dark mark white. Colors/glow exactly as before.
              max-w-[280px] on mobile keeps it compact;
              md:max-w-none fills the column width naturally.
            */}
            <div
              className="w-full max-w-[280px] md:max-w-none"
              style={{
                aspectRatio: "100 / 55",
                overflow: "hidden",
                filter: "brightness(0) invert(1) drop-shadow(0 0 60px rgba(34,197,94,0.30))",
              }}
            >
              <img
                src="/hecaro-watermark.png"
                alt="HECARO Digital"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Text — max-w-2xl keeps lines from stretching ── */}
          <div className="flex flex-col max-w-2xl">
            <motion.h1
              {...anim(0.12)}
              className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6 leading-[1.08]"
              style={{ fontWeight: 800 }}
            >
              {headlineParts.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...anim(0.24)}
              className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 font-normal"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              {...anim(0.34)}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              {/* Primary CTA */}
              <motion.button
                ref={ctaRef}
                style={{ x: sx, y: sy }}
                onMouseMove={onCtaMove}
                onMouseLeave={onCtaLeave}
                onClick={() => onNav("contact")}
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-widest uppercase transition-colors duration-300 shadow-lg shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </motion.button>

              {/* Secondary CTA */}
              <button
                onClick={() => onNav("services")}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                {t.hero.cta2}
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => onNav("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-600 hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-7 h-7" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
