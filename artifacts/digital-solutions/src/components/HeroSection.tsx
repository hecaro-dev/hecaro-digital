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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

export default function HeroSection({ onNav }: HeroSectionProps) {
  const { t } = useI18n();

  // Split headline by newline, then isolate the last word for the neon highlight
  const headlineParts = t.hero.headline.split("\n");
  const lastLine = headlineParts[headlineParts.length - 1];
  const lastSpaceIdx = lastLine.lastIndexOf(" ");
  const lastLinePrefix = lastSpaceIdx >= 0 ? lastLine.substring(0, lastSpaceIdx + 1) : "";
  const lastLineKeyword = lastSpaceIdx >= 0 ? lastLine.substring(lastSpaceIdx + 1) : lastLine;

  const ctaRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 280, damping: 22, mass: 0.5 });

  const onCtaMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const r = ctaRef.current.getBoundingClientRect();
    mx.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.28)));
    my.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * 0.28)));
  };
  const onCtaLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center"
      aria-label="Hero"
    >
      {/* ── Background — overflow-hidden lives HERE, not on <section> ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070a]/50 to-[#05070a]" />
      </div>

      {/*
        ── Grid: LEFT = Text (55fr) | RIGHT = Logo (45fr) ──────────
        fr units prevent gap-overflow unlike percentage columns.
        Kicks in at md (768 px) – covers the 811 px canvas viewport.
        Gap steps up progressively to keep both columns breathable.
      */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-16 md:gap-24 lg:gap-32">

          {/* ── LEFT: Massive text ─────────────────────────────────── */}
          <div className="flex flex-col min-w-0">

            {/* Eyebrow */}
            <motion.p
              {...anim(0)}
              className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-6"
            >
              ✦ DIGITAL SOLUTIONS STUDIO
            </motion.p>

            {/* H1 — oversized, 800 weight, last word in neon green */}
            <motion.h1
              {...anim(0.1)}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-white pb-4"
              style={{
                fontWeight: 800,
                fontFamily: "'Syne', var(--font-syne), system-ui, sans-serif",
                lineHeight: 1.4,
              }}
            >
              {headlineParts.slice(0, -1).map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
              <span className="block" style={{ whiteSpace: "nowrap" }}>
                {lastLinePrefix}
                <span style={{ color: "#00ff99" }}>{lastLineKeyword}</span>
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              {...anim(0.22)}
              className="text-xl sm:text-2xl text-gray-400 max-w-xl mt-8 leading-relaxed font-normal"
              style={{ fontFamily: "'Syne', var(--font-syne), system-ui, sans-serif" }}
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...anim(0.34)}
              className="flex flex-col sm:flex-row items-start gap-4 mt-10"
            >
              {/* Primary — huge button with neon glow */}
              <motion.button
                ref={ctaRef}
                style={{
                  x: sx,
                  y: sy,
                  boxShadow: "0 0 50px rgba(0,255,153,0.4), 0 0 100px rgba(0,255,153,0.15)",
                }}
                onMouseMove={onCtaMove}
                onMouseLeave={onCtaLeave}
                onClick={() => onNav("contact")}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </motion.button>

              {/* Secondary */}
              <button
                onClick={() => onNav("services")}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-6 rounded-full border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                {t.hero.cta2}
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: Giant glowing H logo ────────────────────────── */}
          <motion.div
            {...anim(0.06)}
            className="relative flex items-center justify-center md:justify-end"
          >
            {/*
              Neon-green glow orb behind the logo.
              blur-[160px] creates the large soft halo.
              opacity-20 keeps it subtle but visible.
            */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "-20% -10%",
                background: "#00ff99",
                opacity: 0.2,
                filter: "blur(160px)",
                zIndex: 0,
              }}
            />

            {/*
              Logo: white background PNG.
              filter: invert(1) brightness(1.5) — inverts so bg becomes black,
              H mark becomes bright white.
              mix-blend-mode: screen — black areas become transparent,
              white H shines through as pure white over the dark page bg.
              The neon glow shows through the transparent areas for depth.
            */}
            <img
              src="/hecaro-h-logo.png"
              alt="HECARO Digital"
              className="relative w-full max-w-[380px] md:max-w-none"
              style={{
                zIndex: 1,
                filter: "invert(1) brightness(1.5)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>

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
