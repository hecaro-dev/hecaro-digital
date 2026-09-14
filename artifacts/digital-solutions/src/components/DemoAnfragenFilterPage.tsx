"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { I18nProvider, type Lang, useI18n } from "../i18n";
import Link from "next/link";

interface FilterResult {
  score: number;
  summary: string;
  nextStep: string;
}

function AnfragenFilterUI() {
  const { t, lang, setLang } = useI18n();
  const q = t.anfragenFilter;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""]);
  const [result, setResult] = useState<FilterResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = 5;

  const canProceed = answers[step].trim().length > 0;

  function updateAnswer(val: string) {
    const newAnswers = [...answers];
    newAnswers[step] = val;
    setAnswers(newAnswers);
  }

  async function handleAnalyze() {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/anfragen-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          answerIndexes: answers.map((answer, index) =>
            steps[index].options?.indexOf(answer) ?? -1
          ),
          lang,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data: FilterResult = await res.json();
      setResult(data);
      setStep(5);
    } catch {
      setErrorMsg(q.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const baseSteps = q.steps as Array<{ label: string; question: string; placeholder?: string; options?: string[] }>;
  const processIndex = baseSteps[3].options?.indexOf(answers[3]) ?? -1;
  const steps = baseSteps.map((stepConfig, index) =>
    index === 4 && processIndex >= 0
      ? { ...stepConfig, question: q.dynamicProblemQuestions[processIndex] }
      : stepConfig
  );

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
          <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wider">
            {q.badge}
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
          {step < totalSteps && (
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
          {step < totalSteps && (
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
            {step < totalSteps && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[step].question}</h2>
                
                {steps[step].options ? (
                  <div className="space-y-3">
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer(opt)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                          answers[step] === opt
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                            : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[step] === opt ? "border-emerald-500" : "border-slate-600"}`}>
                            {answers[step] === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                          </div>
                          <span className="text-sm font-medium">{opt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={answers[step]}
                    onChange={(e) => updateAnswer(e.target.value)}
                    placeholder={steps[step].placeholder}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all text-base resize-none"
                    autoFocus
                  />
                )}

                {errorMsg && (
                  <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  {step > 0 ? (
                    <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                      {q.back}
                    </button>
                  ) : <div></div>}

                  <button
                    onClick={() => step === totalSteps - 1 ? handleAnalyze() : setStep(step + 1)}
                    disabled={!canProceed || loading}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {q.analyzing}
                      </>
                    ) : (
                      <>{step === totalSteps - 1 ? q.analyze : q.next}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Result Step */}
            {step === totalSteps && result && (
              <motion.div
                key="step-result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {(() => {
                  const localGrade = result.score >= 60 ? "A" : result.score >= 45 ? "B" : "C";
                  return (
                    <div className={`rounded-3xl border p-8 sm:p-10 space-y-7 ${
                      localGrade === "A"
                        ? "border-emerald-500/30 bg-emerald-950/50"
                        : localGrade === "B"
                          ? "border-amber-500/25 bg-amber-950/20"
                          : "border-red-500/25 bg-red-950/20"
                    }`}>
                      
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full border ${localGrade === "C" ? "bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-red-500/20 border-red-500/15"}`} />
                        <span className={`w-5 h-5 rounded-full border ${localGrade === "B" ? "bg-yellow-400 border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "bg-yellow-400/20 border-yellow-400/15"}`} />
                        <span className={`w-5 h-5 rounded-full border ${localGrade === "A" ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.7)]" : "bg-emerald-400/20 border-emerald-400/15"}`} />
                      </div>

                      <div>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                          localGrade === "A" ? "text-emerald-400" : localGrade === "B" ? "text-amber-400" : "text-red-400"
                        }`}>
                          {q.resultTitle}
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
                          {q.scoreLabel}: {result.score} / 100
                        </h2>
                      </div>

                      <div className={`border-t ${
                        localGrade === "A" ? "border-emerald-500/15" : localGrade === "B" ? "border-amber-500/15" : "border-red-500/15"
                      }`} />

                      <div>
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">{q.summaryLabel}</h3>
                        <p className="text-slate-200 text-base leading-relaxed">{result.summary}</p>
                      </div>
                      
                      <div className={`p-5 rounded-2xl ${
                        localGrade === "A" ? "bg-emerald-500/10 border border-emerald-500/20" : localGrade === "B" ? "bg-amber-500/10 border border-amber-500/20" : "bg-red-500/10 border border-red-500/20"
                      }`}>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${
                          localGrade === "A" ? "text-emerald-400" : localGrade === "B" ? "text-amber-400" : "text-red-400"
                        }`}>{q.nextStepLabel}</h3>
                        <p className="text-slate-200 text-sm leading-relaxed">{result.nextStep}</p>
                      </div>

                      {/* Primary CTA */}
                      <Link
                        href={`/${lang}/preview#contact`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest transition-all"
                      >
                        {q.cta}
                      </Link>

                    </div>
                  );
                })()}

                {/* Back home */}
                <div className="flex justify-center">
                  <Link
                    href={`/${lang}/preview`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                  >
                    {q.backHome}
                  </Link>
                </div>
                
                <p className="text-center text-slate-600 text-xs leading-relaxed">{q.demoNote}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function DemoAnfragenFilterPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <AnfragenFilterUI />
    </I18nProvider>
  );
}
