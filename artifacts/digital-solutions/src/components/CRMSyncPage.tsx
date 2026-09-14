"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Home, CheckCircle2 } from "lucide-react";
import { I18nProvider, type Lang, useI18n } from "../i18n";
import Link from "next/link";

type Profile = "green" | "yellow" | "red" | "rejection";

function computeProfile(answers: number[]): Profile {
  const [s1, s2, , s4] = answers;
  // s1: 0=1-3, 1=4-10, 2=10+, 3=Kaum/Hardly
  // s2: 0=manuell, 1=Formular, 2=Nichts
  // s4: 0=Weniger Zeit, 1=Mehr Abschlüsse, 2=Alles automatisieren
  if (s1 === 2 && s4 === 2) return "green";
  if (s1 === 1 && s2 === 1) return "yellow";
  return "red";
}

function SystemAuditUI() {
  const { t, lang, setLang } = useI18n();
  const a = t.systemAudit;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1, -1]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const totalSteps = 4;
  const steps = a.steps as Array<{ label: string; question: string; options: string[] }>;

  function setAnswer(stepIdx: number, optionIdx: number) {
    const next = [...answers];
    next[stepIdx] = optionIdx;
    setAnswers(next);
  }

  function handleNext(currentStep: number) {
    if (currentStep === 0 && answers[0] === 3) {
      setProfile("rejection");
      setStep(4);
      return;
    }
    setStep(currentStep + 1);
  }

  function handleAnalyze() {
    setProfile(computeProfile(answers));
    setStep(4);
  }

  const canProceed = answers[step] !== -1;

  const profileColor = {
    green: { border: "border-emerald-500/30", bg: "bg-emerald-950/50", label: "text-emerald-400", divider: "border-emerald-500/15" },
    yellow: { border: "border-amber-500/25", bg: "bg-amber-950/20", label: "text-amber-400", divider: "border-amber-500/15" },
    red: { border: "border-red-500/25", bg: "bg-red-950/20", label: "text-red-400", divider: "border-red-500/15" },
    rejection: { border: "border-white/[0.08]", bg: "bg-white/[0.02]", label: "text-slate-400", divider: "border-white/[0.06]" },
  };

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
            {a.badge}
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
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {a.headline}
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
                {a.sub}
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

            {/* Steps 0–3 */}
            {step < 4 && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">{steps[step].question}</h2>
                <div className="space-y-3">
                  {steps[step].options.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer(step, idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        answers[step] === idx
                          ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.07] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[step] === idx ? "border-emerald-500" : "border-slate-600"}`}>
                          {answers[step] === idx && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className={`flex mt-6 ${step > 0 ? "justify-between" : "justify-end"}`}>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> {a.back}
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={() => handleNext(step)}
                      disabled={!canProceed}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      {a.next} <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleAnalyze}
                      disabled={!canProceed}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      <Sparkles className="w-4 h-4" /> {a.analyze}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 4 && profile && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {profile === "rejection" ? (
                  /* Rejection: no CTAs */
                  <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shrink-0">
                        🔴
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                          {a.resultTitle}
                        </p>
                        <h2 className="text-xl font-bold text-white leading-snug">
                          {a.rejectionTitle}
                        </h2>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.06]" />
                    <p className="text-slate-300 text-sm leading-relaxed">{a.rejectionText}</p>
                  </div>
                ) : (
                  /* Profiles: red / yellow / green */
                  <div className={`rounded-3xl border p-8 sm:p-10 space-y-7 ${profileColor[profile].border} ${profileColor[profile].bg}`}>

                    {/* Traffic light */}
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full border ${
                        profile === "red"
                          ? "bg-red-500 border-red-400/50 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                          : "bg-red-500/20 border-red-500/15"
                      }`} />
                      <span className={`w-5 h-5 rounded-full border ${
                        profile === "yellow"
                          ? "bg-yellow-400 border-yellow-300/50 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
                          : "bg-yellow-400/20 border-yellow-400/15"
                      }`} />
                      <span className={`w-5 h-5 rounded-full border ${
                        profile === "green"
                          ? "bg-emerald-400 border-emerald-300/50 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                          : "bg-emerald-400/20 border-emerald-400/15"
                      }`} />
                    </div>

                    {/* Label + Headline */}
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${profileColor[profile].label}`}>
                        {a.resultTitle}
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {profile === "green" ? a.profileGreenTitle : profile === "yellow" ? a.profileYellowTitle : a.profileRedTitle}
                      </h2>
                    </div>

                    {/* Divider */}
                    <div className={`border-t ${profileColor[profile].divider}`} />

                    {/* Recommendation bullets */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${profileColor[profile].label}`} />
                        <p className="text-slate-200 text-sm leading-relaxed">
                          {profile === "green" ? a.profileGreenText : profile === "yellow" ? a.profileYellowText : a.profileRedText}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${profileColor[profile].label}`} />
                        <p className="text-slate-200 text-sm leading-relaxed">{a.resultBullet1}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${profileColor[profile].label}`} />
                        <p className="text-slate-200 text-sm leading-relaxed">{a.resultBullet2}</p>
                      </div>
                    </div>

                    {/* Primary CTA */}
                    <Link
                      href={`/${lang}/preview#contact`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      {a.ctaPrimary}
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                      href={`/${lang}/preview#services`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      {a.ctaSecondary} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* Back home */}
                <div className="flex justify-center">
                  <Link
                    href={`/${lang}/preview`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                  >
                    <Home className="w-4 h-4" /> {a.backHome}
                  </Link>
                </div>

                <p className="text-center text-slate-600 text-xs leading-relaxed">
                  ✦ {a.demoNote}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function CRMSyncPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <SystemAuditUI />
    </I18nProvider>
  );
}
