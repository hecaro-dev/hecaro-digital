"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function FAQSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  return (
    <section id="faq" className="py-32 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            {t.faq.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t.faq.headline}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openSet.has(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className={`rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "bg-[rgba(16,185,129,0.04)] border-emerald-500/20"
                    : "bg-[rgba(255,255,255,0.02)] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset rounded-2xl min-h-[64px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-white pr-6 leading-snug">
                    {item.question}
                  </span>
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? "bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                      : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-300 leading-relaxed text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
