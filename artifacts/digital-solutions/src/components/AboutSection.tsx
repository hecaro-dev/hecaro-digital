/* =============================================
   About Section
   Change content in: src/i18n/de.ts (about key)
   ============================================= */
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { ShieldCheck, BarChart2, Star } from "lucide-react";
import { useI18n } from "../i18n";

const VALUE_ICONS = [ShieldCheck, BarChart2, Star];

export default function AboutSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  const headlineParts = t.about.headline.split("\n");

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 bg-white/[0.01]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">
              {t.about.label}
            </span>
            <h2
              id="about-heading"
              className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {headlineParts[0]}
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                {headlineParts[1]}
              </span>
            </h2>

            <p className="mt-6 text-slate-400 leading-relaxed">{t.about.p1}</p>
            <p className="mt-4 text-slate-400 leading-relaxed">{t.about.p2}</p>

            {/* Divider with quote */}
            <blockquote className="mt-8 border-l-2 border-indigo-500 pl-5 italic text-slate-300">
              „Verlässlichkeit ist keine Eigenschaft – sie ist mein Standard."
            </blockquote>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {t.about.values.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={i}
                  className="flex items-start gap-5 bg-[rgba(15,20,40,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.06)] rounded-xl p-5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{value.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* Profile placeholder card */}
            <div className="mt-6 flex items-center gap-5 bg-[rgba(15,20,40,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-indigo-500/20 border-2 border-white/10 relative z-10">
                DS
              </div>
              <div className="relative z-10">
                <p className="font-semibold text-white text-lg tracking-tight">Digital Solutions</p>
                <p className="text-indigo-300 text-xs uppercase tracking-wider font-medium mt-1">
                  Inhaber
                </p>
                <p className="text-slate-400 text-xs mt-1.5 italic">
                  Profi-Foto folgt
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
