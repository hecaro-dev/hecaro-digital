"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function ReferenceSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="referenzen"
      ref={ref}
      className="py-16 md:py-24 px-4 bg-[#05070a]"
      aria-labelledby="reference-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 text-center mx-auto"
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.reference.label}
          </span>
          <h2
            id="reference-heading"
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {t.reference.headline}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t.reference.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#020617] shadow-2xl transition-all duration-500 hover:border-emerald-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10 overflow-hidden border-b border-white/[0.08] bg-white">
            <img
              src="/ajk-koelsch-showcase.png"
              alt={t.reference.card.imageAlt}
              className="block aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">{t.reference.card.company}</h3>
                <p className="text-slate-400">{t.reference.card.location}</p>
              </div>
              <a
                href={t.reference.card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {t.reference.card.cta}
              </a>
            </div>

            <p className="text-slate-300 leading-relaxed mb-8 text-base md:text-lg max-w-3xl">
              {t.reference.card.description}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {t.reference.card.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
