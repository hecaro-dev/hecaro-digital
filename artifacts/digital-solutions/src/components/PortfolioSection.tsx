"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import { ArrowRight } from "lucide-react";

const GRADIENTS = [
  "from-emerald-500/15 to-emerald-700/10",
  "from-emerald-500/20 to-cyan-600/20",
  "from-violet-500/20 to-pink-600/20",
];

export default function PortfolioSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="py-32 px-4 bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3 inline-block">
              {t.portfolio.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.portfolio.headline}
            </h2>
            <p className="text-slate-400 text-lg">{t.portfolio.sub}</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold transition-all">
            {t.portfolio.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.portfolio.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden flex flex-col backdrop-blur-md"
            >
              <div className={`relative h-56 bg-gradient-to-br ${GRADIENTS[i]} border-b border-white/5 p-6 flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-md border border-white/20">
                    Coming Soon
                  </span>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700 border border-white/10" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 w-max mb-5">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold transition-all">
            {t.portfolio.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
