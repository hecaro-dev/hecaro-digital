"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, Sparkles } from "lucide-react";
import { I18nProvider, type Lang } from "../i18n";
import { useI18n } from "../i18n";
import Link from "next/link";
import DemoResultBlock from "./DemoResultBlock";

function ProjectCheckUI() {
  const { t, lang } = useI18n();
  const p = t.projectCheck;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, desc: false });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 1 && emailValid && desc.trim().length > 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, desc: true });
    if (!canSubmit) return;

    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/project-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, description: desc }),
      });

      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
    } catch {
      setFormError(p.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #020617 0%, #050f1e 60%, #020617 100%)" }}
    >
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link href={`/${lang}/preview`} className="flex items-center gap-2.5 text-white hover:text-emerald-400 transition-colors">
          <img
            src="/hecaro-h-logo.png"
            alt="HECARO Digital"
            style={{ height: 32, width: "auto", filter: "invert(1) brightness(1.5)", mixBlendMode: "screen" as const }}
          />
          <span className="font-bold text-base tracking-wide">HECARO Digital</span>
        </Link>
        <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          {p.badge}
        </span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">

            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {/* Headline block */}
                <div className="mb-10">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5">
                    {p.headline}
                  </h1>
                  <p className="text-slate-400 text-sm mb-3">{p.sub}</p>
                  <ul className="space-y-2">
                    {(p.bullets as string[]).map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10 space-y-5">

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {p.nameLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder={p.namePlaceholder}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${
                          touched.name && name.trim().length < 2
                            ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                            : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/25"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {p.emailLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        placeholder={p.emailPlaceholder}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${
                          touched.email && !emailValid
                            ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                            : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/25"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {p.websiteLabel}
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={p.websitePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {p.descLabel} <span className="text-emerald-500">*</span>
                    </label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, desc: true }))}
                      placeholder={p.descPlaceholder}
                      rows={5}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all text-sm resize-none ${
                        touched.desc && desc.trim().length < 10
                          ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                          : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/25"
                      }`}
                    />
                  </div>

                  {/* Error */}
                  {formError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <span className="shrink-0">⚠</span>
                      {formError}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          {p.submitting}
                        </>
                      ) : (
                        <>{p.cta} <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/50 p-10 sm:p-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                      {p.badge}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {p.successHeadline}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                      {p.successText}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    href={`/${lang}/preview`}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                  >
                    <Home className="w-4 h-4" /> {p.backHome}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <DemoResultBlock />
        </div>
      </main>
    </div>
  );
}

export default function ProjectCheckPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <ProjectCheckUI />
    </I18nProvider>
  );
}
