"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Home, CheckCircle2 } from "lucide-react";
import { I18nProvider, type Lang, useI18n } from "../i18n";
import Link from "next/link";

function parseSteps(text: string): string[] {
  return text
    .split(/(?=[①②③④])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ProjectCheckUI() {
  const { t, lang, setLang } = useI18n();
  const p = t.projectCheck;

  const [step, setStep] = useState(0);
  const [step1Answer, setStep1Answer] = useState(-1);
  const [step2Text, setStep2Text] = useState("");
  const [step3Answer, setStep3Answer] = useState(-1);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const totalSteps = 3;

  const canProceed =
    step === 0 ? step1Answer !== -1 :
    step === 1 ? step2Text.trim().length > 10 :
    step3Answer !== -1;

  async function handleAnalyze() {
    setGenerating(true);
    setError("");
    setResult(null);
    setStep(3);
    try {
      const res = await fetch("/api/generate-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profession: (p.step1Options as string[])[step1Answer],
          problem: step2Text,
          goal: (p.step3Options as string[])[step3Answer],
          lang,
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setResult(data.text);
    } catch {
      setError(p.errorMsg);
    } finally {
      setGenerating(false);
    }
  }

  function handleBack() {
    if (step === 3) {
      setStep(2);
      setResult(null);
      setError("");
    } else {
      setStep(step - 1);
    }
  }

  const resultSteps = result ? parseSteps(result) : [];

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
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {p.badge}
          </span>
          <div className="flex items-center gap-1">
            {(["de", "en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs font-bold uppercase px-2 py-1 rounded transition-colors ${
                  lang === l ? "text-white bg-white/10" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Hero text */}
          {step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {p.headline}
              </h1>
            </motion.div>
          )}

          {/* Progress bar */}
          {step < 3 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">{step + 1} / {totalSteps}</span>
                <span className="text-xs text-slate-500">{step + 1} / {totalSteps}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* Step 0 — single choice */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{p.step1Question}</h2>
                <div className="space-y-3">
                  {(p.step1Options as string[]).map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => setStep1Answer(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        step1Answer === idx
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${step1Answer === idx ? "border-emerald-500" : "border-slate-600"}`}>
                          {step1Answer === idx && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(1)}
                    disabled={!canProceed}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {p.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 1 — textarea */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{p.step2Question}</h2>
                <textarea
                  value={step2Text}
                  onChange={(e) => setStep2Text(e.target.value)}
                  placeholder={p.step2Placeholder}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm resize-none"
                />
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> {p.back}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceed}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {p.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — single choice */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{p.step3Question}</h2>
                <div className="space-y-3">
                  {(p.step3Options as string[]).map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => setStep3Answer(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        step3Answer === idx
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${step3Answer === idx ? "border-emerald-500" : "border-slate-600"}`}>
                          {step3Answer === idx && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> {p.back}
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={!canProceed}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    <Sparkles className="w-4 h-4" /> {p.analyze}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 — result */}
            {step === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/30 p-8 sm:p-10 space-y-7">

                  {generating ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                      <span className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                      <p className="text-slate-400 text-sm">{p.resultLoading}</p>
                    </div>
                  ) : error ? (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <span className="shrink-0">⚠</span>
                      {error}
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                          {p.resultLabel}
                        </p>
                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-5">
                          {p.resultHeadline}
                        </h2>
                        <div className="space-y-4">
                          {resultSteps.map((s, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
                              <p className="text-slate-200 text-sm leading-relaxed">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-emerald-500/15" />

                      <Link
                        href={`/${lang}/preview#contact`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest transition-all"
                      >
                        {p.ctaPrimary}
                      </Link>

                      <Link
                        href={`/${lang}/preview#services`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-bold text-sm uppercase tracking-widest transition-all"
                      >
                        {p.ctaSecondary} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex justify-center">
                  <Link
                    href={`/${lang}/preview`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                  >
                    <Home className="w-4 h-4" /> {p.backHome}
                  </Link>
                </div>

                <p className="text-center text-slate-600 text-xs leading-relaxed">
                  ✦ {p.demoNote}
                </p>
              </motion.div>
            )}

          </AnimatePresence>
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
