"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Shield, Monitor, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "../i18n";
import Link from "next/link";

const ICONS = [Shield, Monitor, Zap];

export default function ServicesSection() {
  const { t, lang } = useI18n();
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
          className="mb-20 text-center mx-auto max-w-3xl"
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.services.label}
          </span>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {t.services.headline}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            {t.services.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i];
            const price = service.price;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
                <div className="relative z-10 flex flex-col">
                  {/* ── Zone A: Tag + Icon ── */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                      {service.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* ── Zone B: Title + Description — STRICTLY 240px (Brick Method) ── */}
                  <div className="h-[240px] overflow-hidden flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed min-h-[160px]">
                      {service.description}
                    </p>
                  </div>

                  {/* ── Zone C: Price badge — STRICTLY 80px, badge centred ── */}
                  <div
                    className="h-[80px] flex items-center border-t border-white/[0.06]"
                  >
                    {price && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-bold">
                        {price}
                      </span>
                    )}
                  </div>

                  {/* ── Zone D: Feature list — always starts on identical Y ── */}
                  <ul className="grid gap-2.5 pt-6 border-t border-white/[0.06]" aria-label={`Features of ${service.title}`}>
                    {service.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                        <span className="text-slate-300 leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* KI-Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">{t.services.aiTitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{t.services.aiDesc}</p>
            </div>
          </div>
          <Link
            href={`/${lang}/preview/demo-qualifier`}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/40 hover:border-emerald-500/70 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.qualifier.servicesLink}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
