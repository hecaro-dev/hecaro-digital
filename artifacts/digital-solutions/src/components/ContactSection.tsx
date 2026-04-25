"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

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
  const { t, lang } = useI18n();
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<Status>("idle");

  const schema = buildSchema(t);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", gdpr: false },
  });

  async function onSubmit(data: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          lang,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all";

  return (
    <section id="contact" ref={ref} className="py-32 px-4 bg-black relative" aria-labelledby="contact-heading">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            {t.contact.label}
          </span>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.headline}
          </h2>
          <p className="text-slate-400 text-lg">{t.contact.sub}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-center text-emerald-300 font-semibold text-xl mb-10 tracking-wide"
        >
          {t.contact.cta}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 sm:p-10 shadow-2xl"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white">{t.contact.success}</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                {t.contact.send}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-6">
                <div>
                  <input id="name" type="text" placeholder={t.contact.namePlaceholder} className={`${inputClass} ${errors.name ? "border-red-500" : ""}`} {...register("name")} />
                  {errors.name && <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1"><AlertCircle className="w-4 h-4" />{errors.name.message}</p>}
                </div>
                <div>
                  <input id="email" type="email" placeholder={t.contact.emailPlaceholder} className={`${inputClass} ${errors.email ? "border-red-500" : ""}`} {...register("email")} />
                  {errors.email && <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1"><AlertCircle className="w-4 h-4" />{errors.email.message}</p>}
                </div>
                <div>
                  <textarea id="message" rows={5} placeholder={t.contact.messagePlaceholder} className={`${inputClass} resize-none ${errors.message ? "border-red-500" : ""}`} {...register("message")} />
                  {errors.message && <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1"><AlertCircle className="w-4 h-4" />{errors.message.message}</p>}
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
                  <input id="gdpr" type="checkbox" className="mt-1 w-5 h-5 rounded border-white/20 bg-black text-emerald-500 focus:ring-emerald-500 cursor-pointer" {...register("gdpr")} />
                  <div>
                    <label htmlFor="gdpr" className="text-sm text-slate-400 cursor-pointer leading-relaxed block">{t.contact.gdpr}</label>
                    {errors.gdpr && <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{errors.gdpr.message}</p>}
                  </div>
                </div>
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />{t.contact.error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black text-lg font-bold transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  <Send className="w-5 h-5" />
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
