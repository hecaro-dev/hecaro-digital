import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import { ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="process"
      ref={ref}
      className="py-32 px-4"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-2xl"
        >
          <span className="inline-block text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t.process.label}
          </span>
          <h2
            id="process-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            {t.process.headline}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            {t.process.sub}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.06]">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group bg-[#020617] p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-300 flex flex-col"
            >
              {/* Step number */}
              <div className="text-5xl font-black tracking-tighter mb-6 leading-none select-none">
                <span className="bg-gradient-to-br from-emerald-400/40 to-emerald-600/10 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Arrow connector (not on last) */}
              {i < t.process.steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-[#020617] border border-white/[0.08]">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                </div>
              )}

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Bottom indicator line */}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
