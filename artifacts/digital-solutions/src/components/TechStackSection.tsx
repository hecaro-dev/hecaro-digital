"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function TechStackSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            {t.techstack.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {t.techstack.headline}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {t.techstack.items.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-slate-200 font-medium tracking-wide">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
