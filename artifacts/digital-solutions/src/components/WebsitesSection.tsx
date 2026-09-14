"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function WebsitesSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  function scrollToContact(subject?: string) {
    if (subject) {
      window.dispatchEvent(new CustomEvent("contact-prefill", { detail: subject }));
    }
    const el = document.getElementById("kontakt");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="websites"
      ref={ref}
      className="py-24 px-4 bg-[#05070a]"
      aria-labelledby="websites-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center mx-auto max-w-3xl"
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.websites.label}
          </span>
          <h2
            id="websites-heading"
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {t.websites.headline}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            {t.websites.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-6 md:gap-y-0 md:[grid-template-rows:auto_auto_auto_1fr_auto_auto_auto]">
          {t.websites.items.map((pkg, i) => {
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group bg-[rgba(255,255,255,0.03)] backdrop-blur-md border ${pkg.tag ? 'border-emerald-500/30' : 'border-[rgba(255,255,255,0.08)]'} rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden flex flex-col md:grid md:[grid-row:span_6] md:[grid-template-rows:subgrid]`}
              >
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

                {/* Zone A: Tag (Beliebt) */}
                <div className="relative z-10 flex items-start justify-end mb-4 min-h-[30px]">
                  {pkg.tag ? (
                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500 border border-emerald-400 text-xs font-bold text-black uppercase tracking-wider">
                      {pkg.tag}
                    </span>
                  ) : (
                    <span className="inline-block"></span>
                  )}
                </div>

                {/* Zone B1: Title */}
                <div className="relative z-10 mb-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.title}
                  </h3>
                </div>

                <div className="relative z-10 mb-5 min-h-[48px]">
                  <p className="text-sm leading-relaxed text-slate-400">{pkg.subtitle}</p>
                </div>

                {/* Zone C: Price badge */}
                <div className="relative z-10 h-[80px] flex items-center border-t border-white/[0.06]">
                  {pkg.price && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-bold">
                      {pkg.price}
                    </span>
                  )}
                </div>

                {/* Zone D: Feature list */}
                <ul className="relative z-10 grid gap-2.5 pt-6 border-t border-white/[0.06]" aria-label={`Features of ${pkg.title}`}>
                  {pkg.bullets.map((bullet: string, j: number) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <span className="font-bold text-emerald-400" aria-hidden="true">✓</span>
                      <span className="text-slate-300 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 pt-6 mt-auto md:mt-0 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => scrollToContact(pkg.subject)}
                    className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-emerald-500/50 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    {pkg.cta}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Call to action below cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          <p className="text-slate-300 text-base md:text-lg font-medium">{t.websites.ctaText}</p>
          <button
            onClick={() => scrollToContact()}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {t.websites.ctaButton}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
