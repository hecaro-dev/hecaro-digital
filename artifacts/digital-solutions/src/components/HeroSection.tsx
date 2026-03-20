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

      {/* ── 2-column layout ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">

          {/*
            LEFT: Large H icon — watermark.
            The image is square (roughly 1:1). We display it at a fixed WIDTH
            and let height be auto (also same width, since square).
            overflow:hidden on the container clips the bottom portion so that
            the HECAROOO text (starting at ~62% of image height) is never shown.
            Container height = 56% of image width = 56% of displayed height → safe crop.

            Breakpoints:
              mobile:  w=250px → container h=140px  (250×0.56)
              sm:      w=300px → container h=168px  (300×0.56)
              md:      w=420px → container h=235px  (420×0.56)
              lg:      w=480px → container h=269px  (480×0.56)
          */}
          <motion.div
            {...anim(0)}
            className="shrink-0 order-first overflow-hidden"
            style={{ opacity: 0.22 }}
          >
            {/* Outer div sizes the CROP WINDOW (container) */}
            <div className="w-[250px] h-[140px] sm:w-[300px] sm:h-[168px] md:w-[420px] md:h-[235px] lg:w-[480px] lg:h-[269px] overflow-hidden">
              {/* Image width = container width (w-full), height = auto (square → same as width). */}
              <img
                src="/hecaro-source.png"
                alt=""
                aria-hidden="true"
                className="w-full h-auto block pointer-events-none select-none"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </motion.div>

          {/* RIGHT: Text block */}
          <div className="flex-1 min-w-0">

            {/* Headline */}
            <motion.h1
              {...anim(0.15)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
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
              {...anim(0.28)}
              className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed mb-10"
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
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
