import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

export default function FAQSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="space-y-4">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-b border-white/[0.08] last:border-0 pb-4"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white pr-8">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-slate-400 leading-relaxed text-base">
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
