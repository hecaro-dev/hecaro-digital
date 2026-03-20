"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Zap, Search, Monitor, CheckCircle2 } from "lucide-react";
import { useI18n } from "../i18n";

const ICONS = [Zap, Search, Monitor];

export default function ServicesSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 px-4"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-2xl"
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.services.label}
          </span>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            {t.services.headline}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            {t.services.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((service, i) => {
            const isLarge = i === 0;
            const Icon = ICONS[i];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 sm:p-12 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden ${
                  isLarge ? "md:col-span-2" : "col-span-1"
                }`}
              >
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                      {service.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className={`font-bold text-white mb-4 ${isLarge ? "text-3xl" : "text-2xl"}`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
                    {service.description}
                  </p>
                  <ul className={`mt-auto grid gap-3 ${isLarge ? "sm:grid-cols-2" : "grid-cols-1"}`} aria-label={`Features of ${service.title}`}>
                    {service.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                        <span className="text-slate-300 leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
