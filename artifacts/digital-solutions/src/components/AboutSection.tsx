"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function AboutSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();
  const lines = t.quality.headline.split("\n");

  return (
    <section className="py-32 px-4 bg-black border-y border-white/[0.04]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-16">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-8 text-center">
              {t.quality.label}
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 text-center">
              {lines.map((line, i) => (
                <span key={i} className="block leading-[1.15] mb-2 text-center">
                  {i >= 1 ? (
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">{line}</span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </span>
              ))}
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              <p>{t.quality.p1}</p>
              <p>{t.quality.p2}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {t.quality.stats.map((stat, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col items-center text-center justify-center backdrop-blur-md">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
