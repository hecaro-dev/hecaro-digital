"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function TargetGroupSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="target-group"
      ref={ref}
      className="py-20 px-4"
      aria-labelledby="target-group-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.targetGroup.label}
          </span>
          <h2
            id="target-group-heading"
            className="text-3xl sm:text-4xl text-white mb-6 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {t.targetGroup.headline}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t.targetGroup.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
