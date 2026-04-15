"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

const TECH_META: Record<string, { icon: string }> = {
  "Next.js":          { icon: "▲" },
  "React":            { icon: "⚛" },
  "TypeScript":       { icon: "TS" },
  "Tailwind CSS":     { icon: "✦" },
  "Figma":            { icon: "✏" },
  "Performance Hosting": { icon: "⚡" },
};

export default function TechStackSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-4 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            {t.techstack.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.techstack.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.techstack.items.map((tech, i) => {
            const meta = TECH_META[tech];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] hover:border-emerald-500/30 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg group-hover:bg-emerald-500/15 transition-colors duration-300">
                  {meta?.icon ?? "◆"}
                </div>
                <span className="text-slate-300 font-medium text-sm text-center leading-tight tracking-wide">
                  {tech}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
