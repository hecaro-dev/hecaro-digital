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
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-24 pb-16 overflow-hidden"
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

      {/* Decorative large H mark — left watermark */}
      <div
        aria-hidden="true"
        className="absolute hidden lg:block pointer-events-none"
        style={{
          left: "3%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.10,
          zIndex: 0,
          overflow: "hidden",
          height: 420,
        }}
      >
        <img
          src="/hecaro-mark.png"
          alt=""
          style={{
            height: Math.round(420 / 0.50),
            width: "auto",
            display: "block",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto mt-8">

        {/* Headline */}
        <motion.h1
          {...anim(0.1)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8"
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

        {/* Sub-headline */}
        <motion.p
          {...anim(0.25)}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...anim(0.4)}
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
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
