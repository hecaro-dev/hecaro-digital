"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

const DEMO_TARGETS = ["portfolio-card-0", "portfolio-card-1"];

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

  function handleCardAction(index: number) {
    const demoTarget = DEMO_TARGETS[index];
    if (demoTarget) {
      scrollToCard(demoTarget);
      return;
    }
    requestSystem();
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

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {t.services.items.map((service, i) => {
            const price = service.price;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group h-full bg-[rgba(255,255,255,0.03)] backdrop-blur-md border ${service.badge ? 'border-emerald-500/30' : 'border-[rgba(255,255,255,0.08)]'} rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-start`}
                onClick={() => handleCardAction(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleCardAction(i)}
              >
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

                {/* Zone A: Tag */}
                <div className="relative z-10 flex min-h-[30px] items-start justify-end gap-3 mb-6">
                  {service.badge ? (
                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500 border border-emerald-400 text-xs font-bold text-black uppercase tracking-wider">
                      {service.badge}
                    </span>
                  ) : (
                    <span className="inline-block"></span>
                  )}
                </div>

                {/* Zone B1: Title */}
                <div className="relative z-10 mb-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                </div>

                {/* Zone B2: Subtitle */}
                <div className="relative z-10 mb-5 min-h-[72px]">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.subtitle}
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
                    <li key={j} className="border-l-2 border-emerald-500/40 pl-3 text-sm">
                      <span className="text-slate-300 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Zone E: CTA Button */}
                <div className="relative z-10 pt-6 mt-auto border-t border-white/[0.06]">
                  <span className="flex items-center justify-center w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors group-hover:border-emerald-500/50 group-hover:text-emerald-300">
                    {i < DEMO_TARGETS.length ? t.services.demoCta : t.services.cta}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm font-medium text-slate-400">
          {t.services.supportLine}
        </p>

        {/* Call to action below cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          <p className="text-slate-300 text-base md:text-lg font-medium">{t.services.postCtaText}</p>
          <button
            onClick={() => requestSystem()}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {t.services.postCtaButton}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
