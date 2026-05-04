"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";

const DEMO_PATHS = ["demo-qualifier", "project-check", "crm-sync"];

const PLACEHOLDERS = [
  {
    gradient: "from-emerald-950/80 via-emerald-900/40 to-emerald-800/20",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 opacity-80">
        <rect x="8" y="12" width="64" height="44" rx="4" stroke="rgba(52,211,153,0.5)" strokeWidth="2" fill="rgba(52,211,153,0.05)" />
        <rect x="8" y="12" width="64" height="10" rx="4" fill="rgba(52,211,153,0.15)" />
        <circle cx="16" cy="17" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="23" cy="17" r="2" fill="rgba(255,255,255,0.2)" />
        <circle cx="30" cy="17" r="2" fill="rgba(255,255,255,0.15)" />
        <rect x="16" y="30" width="28" height="3" rx="1.5" fill="rgba(52,211,153,0.6)" />
        <rect x="16" y="37" width="40" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="16" y="43" width="32" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
        <rect x="16" y="52" width="20" height="8" rx="4" fill="rgba(52,211,153,0.8)" />
        <path d="M56 68 L64 56 L72 62 L80 52" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="70" r="8" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
        <path d="M65 70 L67 72 L71 68" stroke="rgba(52,211,153,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    gradient: "from-cyan-950/80 via-cyan-900/30 to-emerald-900/20",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 opacity-80">
        <circle cx="40" cy="40" r="28" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="rgba(34,211,238,0.04)" />
        <circle cx="40" cy="40" r="18" stroke="rgba(34,211,238,0.3)" strokeWidth="1" fill="none" />
        <circle cx="40" cy="40" r="8" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        <line x1="12" y1="40" x2="68" y2="40" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <line x1="40" y1="12" x2="40" y2="68" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <path d="M18 28 Q40 12 62 28" stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />
        <path d="M18 52 Q40 68 62 52" stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />
        <rect x="30" y="10" width="20" height="10" rx="3" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.5)" strokeWidth="1" />
        <text x="40" y="18" textAnchor="middle" fill="rgba(34,211,238,0.9)" fontSize="7" fontWeight="bold">DE EN ES</text>
        <circle cx="60" cy="22" r="5" fill="rgba(52,211,153,0.8)" />
        <path d="M58 22 L60 24 L63 20" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    gradient: "from-violet-950/80 via-violet-900/30 to-emerald-900/20",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 opacity-80">
        {/* Database cylinder left */}
        <ellipse cx="20" cy="22" rx="10" ry="4" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" fill="rgba(167,139,250,0.08)" />
        <rect x="10" y="22" width="20" height="14" fill="rgba(167,139,250,0.05)" stroke="none" />
        <ellipse cx="20" cy="36" rx="10" ry="4" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" fill="rgba(167,139,250,0.08)" />
        <line x1="10" y1="22" x2="10" y2="36" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
        <line x1="30" y1="22" x2="30" y2="36" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
        {/* Arrow center */}
        <path d="M32 29 L48 29" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arr)" />
        <polygon points="46,26 52,29 46,32" fill="rgba(52,211,153,0.7)" />
        {/* CRM card right */}
        <rect x="52" y="16" width="22" height="26" rx="3" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" fill="rgba(52,211,153,0.05)" />
        <rect x="56" y="21" width="14" height="2" rx="1" fill="rgba(52,211,153,0.5)" />
        <rect x="56" y="26" width="10" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)" />
        <rect x="56" y="30" width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
        <rect x="56" y="34" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
        {/* Score badge */}
        <rect x="55" y="38" width="16" height="6" rx="3" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        <text x="63" y="42.5" textAnchor="middle" fill="rgba(52,211,153,0.95)" fontSize="5" fontWeight="bold">95%</text>
        {/* Check circle */}
        <circle cx="63" cy="58" r="8" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5" />
        <path d="M59.5 58 L62 60.5 L67 55.5" stroke="rgba(52,211,153,0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots flowing */}
        <circle cx="20" cy="55" r="2.5" fill="rgba(167,139,250,0.4)" />
        <circle cx="30" cy="55" r="2" fill="rgba(167,139,250,0.3)" />
        <circle cx="39" cy="55" r="1.5" fill="rgba(167,139,250,0.2)" />
      </svg>
    ),
  },
];

export default function PortfolioSection() {
  const { t, lang } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="py-32 px-4 bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3 inline-block">
            {t.portfolio.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.portfolio.headline}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t.portfolio.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.portfolio.items.map((item, i) => (
            <motion.div
              key={i}
              id={`portfolio-card-${i}`}
              style={{ scrollMarginTop: "100px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden flex flex-col backdrop-blur-md hover:border-emerald-500/20 transition-colors duration-300"
            >
              <div className={`relative h-52 bg-gradient-to-br ${PLACEHOLDERS[i].gradient} border-b border-white/5 flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.08),transparent_70%)]" />
                {PLACEHOLDERS[i].icon}
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 w-max mb-4">
                  {item.tag}
                </span>

                {/* Problem label */}
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-xs text-amber-400/80 font-medium">{item.problem}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.description}</p>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <Link
                    href={`/${lang}/preview/${DEMO_PATHS[i]}`}
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors group/link"
                  >
                    {item.ctaLabel}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
