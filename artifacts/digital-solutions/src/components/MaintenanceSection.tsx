"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function MaintenanceSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  function requestPackage(subject: string) {
    window.dispatchEvent(new CustomEvent("contact-prefill", { detail: subject }));
    const contact = document.getElementById("contact");
    if (!contact) return;
    const top = contact.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="wartung"
      ref={ref}
      className="relative overflow-hidden bg-[#090d12] px-4 py-24"
      aria-labelledby="maintenance-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(16,185,129,0.08),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-emerald-400">
            {t.maintenance.label}
          </span>
          <h2
            id="maintenance-heading"
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {t.maintenance.headline}
          </h2>
          <p className="text-lg leading-relaxed text-slate-400 md:text-xl">
            {t.maintenance.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.maintenance.items.map((plan, index) => (
            <motion.article
              key={plan.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:border-emerald-500/50 sm:p-9 ${
                plan.badge
                  ? "border-emerald-500/50 bg-emerald-500/[0.07] shadow-2xl shadow-emerald-950/30"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/10 to-indigo-500/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative z-10 mb-6 flex min-h-7 items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                {plan.badge && (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="relative z-10 mb-2 text-3xl font-bold text-emerald-300">{plan.price}</p>
              <p className="relative z-10 mb-7 text-sm leading-relaxed text-slate-400">{plan.terms}</p>

              <ul className="relative z-10 mb-9 flex-1 space-y-3 border-t border-white/[0.08] pt-7">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                    <span className="font-bold text-emerald-400" aria-hidden="true">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => requestPackage(plan.subject)}
                className={`relative z-10 w-full rounded-full px-7 py-4 text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  plan.badge
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "border border-white/15 bg-white/[0.04] text-white hover:border-emerald-500/50 hover:text-emerald-300"
                }`}
              >
                {plan.cta}
              </button>
            </motion.article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center text-sm leading-relaxed text-slate-500">
          {t.maintenance.exclusion}
        </p>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg font-medium leading-relaxed text-slate-200">
          {t.maintenance.personal}
        </p>
      </div>
    </section>
  );
}