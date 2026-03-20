/* =============================================
   Hero Section
   Change content in: src/i18n/de.ts (hero key)
   ============================================= */
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "../i18n";

interface HeroSectionProps {
  onNav: (section: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection({ onNav }: HeroSectionProps) {
  const { t } = useI18n();

  const headlineParts = t.hero.headline.split("\n");

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-wide mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          {headlineParts.map((line, i) => (
            <span key={i}>
              {i === 1 ? (
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {line}
                </span>
              ) : (
                line
              )}
              {i < headlineParts.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onNav("contact")}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          <button
            onClick={() => onNav("services")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.45}
        className="relative z-10 mt-20 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-800/60"
      >
        {t.stats.map((stat, i) => (
          <div
            key={i}
            className="bg-slate-900/80 px-6 py-5 text-center"
          >
            <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => onNav("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors focus:outline-none"
        aria-label="Scroll down"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
