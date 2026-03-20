import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  const lines = t.quality.headline.split("\n");

  return (
    <section className="py-32 px-4 bg-black border-y border-white/[0.04]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-8">
              {t.quality.label}
            </span>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8">
              {lines.map((line, i) => (
                <span key={i} className="block leading-[1.15] mb-2">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">{line}</span>
                  ) : i === 2 ? (
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">{line}</span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </span>
              ))}
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>{t.quality.p1}</p>
              <p>{t.quality.p2}</p>
            </div>
            
            <blockquote className="mt-10 border-l-2 border-indigo-500 pl-6 italic text-slate-300 text-lg">
              „Kein Outsourcing. Kein Agentur-Overhead. Nur direkte, ehrliche und messbare Ergebnisse.“
            </blockquote>
          </motion.div>

          {/* Right: Stats and extra */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {t.quality.stats.map((stat, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col items-center text-center justify-center backdrop-blur-md">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Profile / Values wrap */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-3xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6">Das Fundament</h3>
              <ul className="space-y-5">
                {t.values.items.map((val, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{val.title}</h4>
                      <p className="text-slate-400 text-sm">{val.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
