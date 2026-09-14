"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import Link from "next/link";

const DEMO_TARGETS = ["portfolio-card-0", "portfolio-card-1", "portfolio-card-2"];

function scrollToCard(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function ServicesSection() {
  const { t, lang } = useI18n();
  const { ref, inView } = useInView();

  function requestSystem() {
    window.dispatchEvent(new CustomEvent("contact-prefill", { detail: t.services.postCtaSubject }));
    const contact = document.getElementById("kontakt");
    if (!contact) return;
    const top = contact.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 px-4"
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

        {/*
          CSS Subgrid: outer grid defines 6 named row tracks (A, B1, B2, C, D, E).
          Each card spans all 6 rows via grid-row:span 6 and inherits those tracks
          via grid-template-rows:subgrid — guaranteeing pixel-perfect zone alignment
          across all 3 cards regardless of content length.
          Mobile: single-column flex-col, subgrid not applied.
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-6 md:gap-y-0 md:[grid-template-rows:auto_auto_1fr_auto_auto_auto]">
          {t.services.items.map((service, i) => {
            const price = service.price;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col md:grid md:[grid-row:span_6] md:[grid-template-rows:subgrid]"
                onClick={() => scrollToCard(DEMO_TARGETS[i])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && scrollToCard(DEMO_TARGETS[i])}
              >
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

                {/* Zone A: Tag */}
                <div className="relative z-10 flex min-h-[30px] items-start justify-between gap-3 mb-6">
                  <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                    {service.tag}
                  </span>
                  {service.badge && (
                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500 border border-emerald-400 text-xs font-bold text-black uppercase tracking-wider">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Zone B1: Title */}
                <div className="relative z-10 mb-3">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                </div>

                {/* Zone B2: Description — flex-1 on mobile / 1fr subgrid row on desktop */}
                <div className="relative z-10 flex-1 mb-3 md:flex-none">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Zone C: Price badge */}
                <div className="relative z-10 h-[100px] flex items-center border-t border-white/[0.06]">
                  {price && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-bold">
                      {price}
                    </span>
                  )}
                </div>

                {/* Zone D: Feature list */}
                <ul className="relative z-10 grid gap-2.5 pt-6 border-t border-white/[0.06]" aria-label={`Features of ${service.title}`}>
                  {service.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <span className="font-bold text-emerald-400" aria-hidden="true">✓</span>
                      <span className="text-slate-300 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Zone E: CTA Button */}
                <div className="relative z-10 pt-6 mt-auto md:mt-0 border-t border-white/[0.06]">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-300 pointer-events-none">
                    {t.services.cta}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Audit Link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href={`/${lang}/preview/crm-sync`}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-emerald-500 transition-colors duration-200">
              {t.services.auditLink}
            </span>
          </Link>
        </motion.div>

        {/* Services Note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="text-center text-slate-400 text-base leading-relaxed italic"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          {t.services.note}
        </motion.p>

        {/* Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]"
        >
          <p className="text-slate-300 text-sm leading-relaxed">{t.services.postCtaText}</p>
          <button
            type="button"
            onClick={requestSystem}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/40 hover:border-emerald-500/70 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
          >
            {t.services.postCtaButton}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
