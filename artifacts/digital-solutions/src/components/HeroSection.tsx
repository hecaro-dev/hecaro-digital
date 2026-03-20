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
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-32 pb-24 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[900px] h-[600px] bg-emerald-600/8 rounded-full blur-[140px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/60 to-[#020617]" />
      </div>

      {/* ── 2-column grid ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/*
            LEFT COLUMN: /public/hecaro-icon.svg
            ─ opacity: 0.18 (premium watermark)
            ─ filter: drop-shadow for the branded green glow
            ─ Mobile: 250px · Desktop: 500px height
            The img height drives the size; width is auto (aspect-correct).
          */}
          <motion.div
            {...anim(0)}
            className="shrink-0 self-center flex items-center justify-center"
          >
            {/* Mobile */}
            <img
              src="/hecaro-icon.svg"
              alt=""
              aria-hidden="true"
              className="block md:hidden select-none pointer-events-none"
              style={{
                height: 250,
                width: "auto",
                opacity: 0.18,
                filter: "drop-shadow(0 0 40px rgba(34, 197, 94, 0.3))",
              }}
            />
            {/* Desktop */}
            <img
              src="/hecaro-icon.svg"
              alt=""
              aria-hidden="true"
              className="hidden md:block select-none pointer-events-none"
              style={{
                height: 500,
                width: "auto",
                opacity: 0.18,
                filter: "drop-shadow(0 0 40px rgba(34, 197, 94, 0.3))",
              }}
            />
          </motion.div>

          {/* RIGHT COLUMN: Headline + Sub + CTAs */}
          <div className="flex-1 min-w-0">
            <motion.h1
              {...anim(0.15)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              {headlineParts.map((line, i) => (
                <span key={i} className="block leading-[1.1]">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...anim(0.28)}
              className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              {...anim(0.42)}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              {/* Primary CTA — magnetic */}
              <motion.button
                ref={ctaRef}
                style={{ x: sx, y: sy }}
                onMouseMove={onCtaMove}
                onMouseLeave={onCtaLeave}
                onClick={() => onNav("contact")}
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-colors duration-300 shadow-lg shadow-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </motion.button>

              {/* Secondary CTA */}
              <button
                onClick={() => onNav("services")}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border border-emerald-500/30 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 font-semibold transition-all duration-300 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
