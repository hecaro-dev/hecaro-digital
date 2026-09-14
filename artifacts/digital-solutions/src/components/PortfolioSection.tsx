"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import Link from "next/link";

const DEMO_PATHS = ["demo-qualifier", "anfragen-filter"];

const PLACEHOLDER_GRADIENTS = [
  "from-emerald-950/80 via-emerald-900/40 to-emerald-800/20",
  "from-cyan-950/80 via-cyan-900/30 to-emerald-900/20",
  "from-violet-950/80 via-violet-900/30 to-emerald-900/20",
];

export default function PortfolioSection() {
  const { t, lang } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section id="demos" className="py-24 px-4 bg-black" ref={ref}>
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

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
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
              <div className={`relative h-28 bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[i]} border-b border-white/5 overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.08),transparent_70%)]" />
                {"statBadge" in item && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    {(item as typeof item & { statBadge: string }).statBadge}
                  </span>
                )}
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 w-max mb-4">
                  {item.tag}
                </span>

                {/* Problem label */}
                <div className="mb-4">
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
