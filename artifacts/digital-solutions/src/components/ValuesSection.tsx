"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Target, ShieldCheck, Fingerprint, Gem } from "lucide-react";
import { useI18n } from "../i18n";

const ICONS = [Target, ShieldCheck, Fingerprint, Gem];

export default function ValuesSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3 inline-block">
            {t.values.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {t.values.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.values.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 backdrop-blur-md hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            {t.quality.p1}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
