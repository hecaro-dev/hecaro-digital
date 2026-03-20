/* =============================================
   Services Section
   Change content in: src/i18n/de.ts (services key)
   ============================================= */
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Zap, Search, Monitor, CheckCircle2 } from "lucide-react";
import { useI18n } from "../i18n";

const ICONS = [
  <Zap className="w-6 h-6" aria-hidden="true" />,
  <Search className="w-6 h-6" aria-hidden="true" />,
  <Monitor className="w-6 h-6" aria-hidden="true" />,
];

const ACCENT_COLORS = [
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
  "from-violet-500 to-violet-700",
];

const TEXT_ACCENT = [
  "text-blue-400",
  "text-emerald-400",
  "text-violet-400",
];

export default function ServicesSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 px-4"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
            {t.services.label}
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            {t.services.headline}
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-lg">
            {t.services.sub}
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative group bg-slate-900/60 border border-slate-800/60 rounded-2xl p-7 hover:border-slate-700/80 transition-all duration-300 overflow-hidden"
            >
              {/* Top glow on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${ACCENT_COLORS[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${ACCENT_COLORS[i]} mb-5 text-white`}
              >
                {ICONS[i]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2" aria-label={`Features of ${service.title}`}>
                {service.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${TEXT_ACCENT[i]}`}
                      aria-hidden="true"
                    />
                    <span className="text-slate-300">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
