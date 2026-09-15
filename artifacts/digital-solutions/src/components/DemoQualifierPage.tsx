"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { I18nProvider, type Lang } from "../i18n";
import { useI18n } from "../i18n";
import Link from "next/link";

interface QualifyResult {
  grade: "A" | "B" | "C";
  score: number;
  summary: string;
  recommendation: string;
}

function QualifierUI() {
  const { t, lang, setLang } = useI18n();
  const q = t.qualifier;

  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [enquiryVolume, setEnquiryVolume] = useState("");
  const [timeCost, setTimeCost] = useState("");
  const [result, setResult] = useState<QualifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = 3;

  const canProceed = [
    businessType !== "",
    enquiryVolume !== "",
    timeCost !== "",
  ];

  async function handleAnalyze() {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, enquiryVolume, timeCost, lang }),
      });
      if (!res.ok) throw new Error("API error");
      const data: QualifyResult = await res.json();
      setResult(data);
      setStep(3);
    } catch {
      setErrorMsg(q.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const steps = q.steps as Array<{ label: string; question: string; options: string[] }>;

  const TrafficLightCTA = ({ grade }: { grade: "A" | "B" | "C" }) => (
    <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-3">
        <span className={`w-5 h-5 rounded-full border ${grade === "C" ? "bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-red-500/20 border-red-500/15"}`} />
        <span className={`w-5 h-5 rounded-full border ${grade === "B" ? "bg-yellow-400 border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "bg-yellow-400/20 border-yellow-400/15"}`} />
        <span className={`w-5 h-5 rounded-full border ${grade === "A" ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.7)]" : "bg-emerald-400/20 border-emerald-400/15"}`} />
      </div>
      <span className="text-sm font-semibold text-slate-200">
        {grade === "A" ? t.demoResult.ratingA : grade === "B" ? t.demoResult.ratingB : q.gradeC}
      </span>
      <Link
        href={`/${lang}/preview#contact`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-200"
      >
        {t.demoResult.cta}
      </Link>
    </div>
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
          {step < 3 && (
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
          {step < 3 && (
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

            {/* Step 0: Business type */}
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
                <div className="space-y-3">
                  {steps[0].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBusinessType(opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        businessType === opt
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${businessType === opt ? "border-emerald-500" : "border-slate-600"}`}>
                          {businessType === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(1)}
                    disabled={!canProceed[0]}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {q.next}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 1: Enquiry volume */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[1].question}</h2>
                <div className="space-y-3">
                  {steps[1].options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEnquiryVolume(opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        enquiryVolume === opt
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${enquiryVolume === opt ? "border-emerald-500" : "border-slate-600"}`}>
                          {enquiryVolume === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                    {q.back}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceed[1]}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {q.next}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Time cost */}
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
                      onClick={() => setTimeCost(opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        timeCost === opt
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${timeCost === opt ? "border-emerald-500" : "border-slate-600"}`}>
                          {timeCost === opt && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {errorMsg && (
                  <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                    {q.back}
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={!canProceed[2] || loading}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {q.analyzing}
                      </>
                    ) : (
                      <>{q.analyze}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {step === 3 && result && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {(() => {
                  const localGrade = result.grade;
                  return (
                <div className={`rounded-3xl border p-8 sm:p-10 space-y-7 ${
                  localGrade === "A"
                    ? "border-emerald-500/30 bg-emerald-950/50"
                    : localGrade === "B"
                      ? "border-amber-500/25 bg-amber-950/20"
                      : "border-red-500/25 bg-red-950/20"
                }`}>
                  {/* Traffic light */}
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border ${localGrade === "C" ? "bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-red-500/20 border-red-500/15"}`} />
                    <span className={`w-5 h-5 rounded-full border ${localGrade === "B" ? "bg-yellow-400 border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "bg-yellow-400/20 border-yellow-400/15"}`} />
                    <span className={`w-5 h-5 rounded-full border ${localGrade === "A" ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.7)]" : "bg-emerald-400/20 border-emerald-400/15"}`} />
                  </div>

                  {/* Label + Headline */}
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      localGrade === "A" ? "text-emerald-400" : localGrade === "B" ? "text-amber-400" : "text-red-400"
                    }`}>
                      {q.resultTitle} · {result.score}/100
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {localGrade === "A" ? q.gradeAHeadline : localGrade === "B" ? q.gradeBHeadline : q.gradeCHeadline}
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${
                    localGrade === "A" ? "border-emerald-500/15" : localGrade === "B" ? "border-amber-500/15" : "border-red-500/15"
                  }`} />

                  {/* 3 checkmark bullets */}
                  <div className="space-y-3">
                    {(localGrade === "A"
                      ? [q.gradeABulletEngpass, q.gradeABulletImpact, q.gradeABulletBudget]
                      : localGrade === "B"
                        ? [q.gradeBBullet1, q.gradeBBullet2, q.gradeBBullet3]
                        : [q.gradeCBullet1, q.gradeCBullet2, q.gradeCBullet3]
                    ).map((bullet, i) => (
                      <div key={i} className={`border-l-2 pl-3 ${
                        localGrade === "A" ? "border-emerald-500/50" : localGrade === "B" ? "border-amber-500/50" : "border-red-500/50"
                      }`}>
                        <p className="text-slate-200 text-sm leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>

                  {/* Saving note — only for grade A */}
                  {localGrade === "A" && (
                    <p className="text-emerald-300 text-sm font-bold leading-relaxed">
                      {q.gradeASavingNote}
                    </p>
                  )}

                  {/* Primary CTA */}
                  <Link
                    href={`/${lang}/preview#contact`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {t.demoResult.cta}
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

export default function DemoQualifierPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <QualifierUI />
    </I18nProvider>
  );
}
