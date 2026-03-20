/* =============================================
   Contact Form Section
   Change content in: src/i18n/de.ts (contact key)
   ============================================= */
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

/* Form schema is built dynamically from translations */
function buildSchema(t: ReturnType<typeof useI18n>["t"]) {
  return z.object({
    name: z.string().min(1, t.contact.required),
    email: z.string().email(t.contact.invalidEmail),
    message: z.string().min(10, t.contact.required),
    gdpr: z.boolean().refine((v) => v === true, { message: t.contact.gdprRequired }),
  });
}

type FormValues = { name: string; email: string; message: string; gdpr: boolean };

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { t } = useI18n();
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<Status>("idle");

  const schema = buildSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", gdpr: false },
  });

  /* Simulated form submission – replace with real endpoint */
  async function onSubmit(data: FormValues) {
    setStatus("sending");
    try {
      /* TODO: Replace with your actual form endpoint or email service */
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Form data:", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors";

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase">
            {t.contact.label}
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-white"
          >
            {t.contact.headline}
          </h2>
          <p className="mt-4 text-slate-400">{t.contact.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[rgba(15,20,40,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 shadow-2xl"
        >
          {/* Success state */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-400" aria-hidden="true" />
              <p className="text-lg font-semibold text-white">{t.contact.success}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
            >
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">
                    {t.contact.namePlaceholder}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.contact.namePlaceholder}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${inputClass} ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                    {t.contact.emailPlaceholder}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.contact.emailPlaceholder}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputClass} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="message">
                    {t.contact.messagePlaceholder}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClass} resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* GDPR Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="gdpr"
                    type="checkbox"
                    aria-invalid={!!errors.gdpr}
                    aria-describedby={errors.gdpr ? "gdpr-error" : undefined}
                    className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                    {...register("gdpr")}
                  />
                  <div>
                    <label htmlFor="gdpr" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
                      {t.contact.gdpr}
                    </label>
                    {errors.gdpr && (
                      <p id="gdpr-error" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        {errors.gdpr.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {t.contact.error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {status === "sending" ? t.contact.sending : t.contact.send}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
