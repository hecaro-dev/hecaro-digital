"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Home } from "lucide-react";
import { I18nProvider, type Lang } from "../i18n";
import { useI18n } from "../i18n";
import Link from "next/link";

interface QualifyResult {
  grade: "A" | "B";
  summary: string;
  recommendation: string;
}

function QualifierUI() {
  const { t, lang } = useI18n();
  const q = t.qualifier;

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [impact, setImpact] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<QualifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = 4;

  const canProceed = [
    name.trim().length > 1,
    bottleneck.trim().length > 8,
    impact !== "",
    budget !== "",
  ];

  async function handleAnalyze() {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bottleneck, impact, budget, lang }),
      });
      if (!res.ok) throw new Error("API error");
      const data: QualifyResult = await res.json();
      setResult(data);
      setStep(4);
    } catch {
      setErrorMsg(q.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const steps = q.steps as Array<{ label: string; question: string; placeholder?: string; options?: string[] }>;

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
          {q.badge}
        </span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Hero text */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {q.headline}
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
                {q.sub}
              </p>
            </motion.div>
          )}

          {/* Progress bar */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">{steps[step]?.label}</span>
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

          {/* Step cards */}
          <AnimatePresence mode="wait">

            {/* Step 0: Name */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[0].question}</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={steps[0].placeholder}
                  onKeyDown={(e) => e.key === "Enter" && canProceed[0] && setStep(1)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all text-base"
                  autoFocus
                />
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(1)}
                    disabled={!canProceed[0]}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {q.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 1: Bottleneck */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-2">{steps[1].question}</h2>
                <p className="text-slate-500 text-sm mb-6">{name ? `Hallo ${name} 👋` : ""}</p>
                <textarea
                  value={bottleneck}
                  onChange={(e) => setBottleneck(e.target.value)}
                  placeholder={steps[1].placeholder}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all text-base resize-none"
                  autoFocus
                />
                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {q.back}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceed[1]}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {q.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Impact */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[2].question}</h2>
                <div className="space-y-3">
                  {steps[2].options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setImpact(opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        impact === opt
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${impact === opt ? "border-emerald-500" : "border-slate-600"}`}>
                          {impact === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {q.back}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceed[2]}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {q.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[3].question}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {steps[3].options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`text-center px-4 py-4 rounded-xl border transition-all duration-200 ${
                        budget === opt
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span className="text-sm font-semibold">{opt}</span>
                    </button>
                  ))}
                </div>

                {errorMsg && (
                  <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {q.back}
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={!canProceed[3] || loading}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {q.analyzing}
                      </>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> {q.analyze}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && result && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {result.grade === "A" ? (
                  /* ── GRADE A: Ampel-Result ── */
                  <>
                    <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/50 p-8 sm:p-10 space-y-7">
                      {/* Header — traffic light icon */}
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-emerald-500/20">
                          🟢
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                            {q.resultTitle}
                          </p>
                          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                            {q.gradeAHeadline}
                          </h2>
                        </div>
                      </div>

                      {/* 3 fixed Bullets: Budget / Entscheider / Dringlichkeit */}
                      <div className="space-y-3">
                        {[q.gradeABulletEngpass, q.gradeABulletImpact, q.gradeABulletBudget].map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                            <p className="text-slate-200 text-sm leading-relaxed">{bullet}</p>
                          </div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-emerald-500/15" />

                      {/* Recommendation */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                          {q.gradeAFitTitle}
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed">{q.gradeARecommendation}</p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/${lang}/preview/project-check`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest transition-all"
                      >
                        {q.ctaA} <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/${lang}/preview`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                      >
                        <Home className="w-4 h-4" /> {q.backHome}
                      </Link>
                    </div>
                  </>
                ) : (
                  /* ── GRADE B: Ehrliche Einschätzung ── */
                  <>
                    <div className="rounded-3xl border border-amber-500/25 bg-amber-950/20 p-8 sm:p-10 space-y-7">
                      {/* Header */}
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 bg-amber-500/15 text-amber-400">
                          B
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                            {q.resultTitle}
                          </p>
                          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                            {q.gradeBHeadline}
                          </h2>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                          {q.summary}
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-amber-500/15" />

                      {/* Honest explanation */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                          {q.gradeBExplanationTitle}
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed">{q.gradeBExplanation}</p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/${lang}#contact`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/5 text-amber-300 hover:text-amber-200 font-semibold text-sm transition-all"
                      >
                        {q.ctaB}
                      </Link>
                      <Link
                        href={`/${lang}/preview`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                      >
                        <Home className="w-4 h-4" /> {q.backHome}
                      </Link>
                    </div>
                  </>
                )}

                {/* Demo note */}
                <p className="text-center text-slate-600 text-xs pt-2 leading-relaxed">
                  ✦ {q.demoNote}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function DemoQualifierPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <QualifierUI />
    </I18nProvider>
  );
}
 