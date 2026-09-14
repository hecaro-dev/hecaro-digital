"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function TargetGroupSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="target-group"
      ref={ref}
      className="py-12 px-4"
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
            className="text-3xl sm:text-4xl text-white mb-8 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {t.targetGroup.headline}
          </h2>

          <div className="space-y-4 mb-8 inline-flex flex-col items-start text-left">
            {t.targetGroup.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-lg leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-emerald-400 font-semibold text-base leading-relaxed mb-8">
            {t.targetGroup.closing}
          </p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-colors duration-200"
          >
            {t.contact.send}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
