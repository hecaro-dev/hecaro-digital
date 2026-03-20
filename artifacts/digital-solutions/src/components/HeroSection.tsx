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
      {/* ── Background atmosphere ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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

      {/*
        ── Logo watermark — absolutely positioned background element ──
        position: absolute keeps it out of document flow entirely.
        left: 0, top: 50%, translateY(-50%) pins it vertically centered on the left.
        zIndex: 1 puts it above the atmospheric background but below the content (z-10).
        overflow:hidden on the wrapper crops the HECAROOO text at 55% height.
        filter is on the wrapper so it only processes the cropped area.

        Original image: 500×500px (square, dark-on-transparent).
        brightness(0) invert(1) → converts dark pixels to white.
        Crop at 55% height → shows top 275px of original → H mark only, text hidden.

        Desktop: 600px wide → wrapper h = 600 × 0.55 = 330px
        Mobile : 320px wide → wrapper h = 320 × 0.55 = 176px (hidden via md: classes on desktop size)
      */}

      {/* Mobile logo */}
      <div
        className="block md:hidden absolute pointer-events-none select-none"
        style={{
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          width: 320,
          height: 176,
          overflow: "hidden",
          opacity: 0.15,
          filter: "brightness(0) invert(1) drop-shadow(0 0 40px rgba(34, 197, 94, 0.45))",
        }}
      >
        <img
          src="/hecaro-watermark.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 320,
            height: 320,
            display: "block",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Desktop logo */}
      <div
        className="hidden md:block absolute pointer-events-none select-none"
        style={{
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          width: 600,
          height: 330,
          overflow: "hidden",
          opacity: 0.15,
          filter: "brightness(0) invert(1) drop-shadow(0 0 60px rgba(34, 197, 94, 0.45))",
        }}
      >
        <img
          src="/hecaro-watermark.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 600,
            height: 600,
            display: "block",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* ── Text content — full width, above watermark ─────────────── */}
      <div className="relative max-w-4xl w-full mx-auto" style={{ zIndex: 10 }}>
        <motion.h1
          {...anim(0.15)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
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
          className="text-lg sm:text-xl md:text-2xl text-slate-400 leading-relaxed mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          {...anim(0.38)}
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

      {/* Scroll indicator */}
      <motion.button
        onClick={() => onNav("services")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 10 }}
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
