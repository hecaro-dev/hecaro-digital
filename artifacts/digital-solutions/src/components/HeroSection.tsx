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

/*
 * HMark — vector SVG of the HECARO "H" brand glyph.
 * Pure SVG path: 100% sharp on Retina/4K, zero blur, no image loading.
 *
 * viewBox 0 0 300 380
 *   Left stem  : x 0–88   (full height)
 *   Right stem : x 212–300 (full height)
 *   Crossbar   : diagonal, left y 190–245 → right y 138–193
 *   Upper-right accent: subtle cubic curve gives the branded "ear" detail
 */
function HMark({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 300 380"
      width={size}
      height={size}
      aria-hidden="true"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/*
        Main H body — single closed path.
        Crossbar slopes from (left y=190/245) up to (right y=138/193).
        The top-right corner of the right stem uses a cubic bezier that
        creates the characteristic concave "ear" curve visible in the logo.
      */}
      <path d="
        M 0,0
        L 88,0
        L 88,190
        L 212,138
        L 212,0
        C 212,0 270,-4 290,36
        C 308,72 294,110 258,128
        L 212,148
        L 212,193
        L 88,245
        L 88,380
        L 0,380
        Z
      " />
      {/*
        Right stem body — separate rectangle so the upper-right accent
        (encoded in the path above) blends seamlessly at the top.
      */}
      <rect x="212" y="128" width="88" height="252" />
    </svg>
  );
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

      {/* ── 2-column layout ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/*
          flex-col on mobile → H centered above text.
          md:flex-row on desktop → H left, text right, vertically centered.
          gap-20 = 80px desktop gutter.
        */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* LEFT: SVG H watermark — 100% vector sharp */}
          <motion.div
            {...anim(0)}
            className="shrink-0 self-center"
            style={{ opacity: 0.15 }}
          >
            {/* Mobile: 200px · Desktop: 480px */}
            <div className="block md:hidden">
              <HMark size={200} />
            </div>
            <div className="hidden md:block">
              <HMark size={480} />
            </div>
          </motion.div>

          {/* RIGHT: Text block */}
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
