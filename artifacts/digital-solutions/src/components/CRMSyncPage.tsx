"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Cpu,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Home,
  Zap,
  FileCode,
  X,
  TrendingUp,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { I18nProvider, type Lang, useI18n } from "../i18n";
import Link from "next/link";
import DemoResultBlock from "./DemoResultBlock";

type Phase = "idle" | "s1" | "s2" | "done";

/* ─────────────────────────────────────────────────────────────
   Simulated API payload shown in the Audit overlay
───────────────────────────────────────────────────────────── */
const AUDIT_PAYLOAD = {
  lead_id: "crm_2604_maxmueller",
  timestamp: "2026-04-21T14:32:00Z",
  source: "Website-Formular",
  payload: {
    name: "Max Müller",
    budget_eur: 5000,
    goal: "Mehr qualifizierte Leads",
    bottleneck: "Unqualifizierte Erstgespräche",
  },
  scoring_result: {
    priority: "HIGH",
    status: "QUALIFIED",
    match_score: 95,
    intent: "READY_TO_BUY",
    category: "ENTERPRISE",
    rule_applied: "budget_gte_5k → priority_high",
  },
  crm_action: {
    type: "CREATE_CONTACT",
    destination: "HubSpot / Pipedrive",
    next_step: "SEND_PROPOSAL",
  },
};

/* ─────────────────────────────────────────────────────────────
   Syntax-highlighted JSON renderer (no external deps)
───────────────────────────────────────────────────────────── */
function JsonLine({ text }: { text: string }) {
  const keyMatch = text.match(/^(\s*)("[\w_]+")(\s*:\s*)(.*)$/);
  if (keyMatch) {
    const [, indent, key, colon, rest] = keyMatch;
    const isStr = rest.startsWith('"');
    const isNum = /^\d/.test(rest.trim());
    const valColor = isStr
      ? "text-amber-300"
      : isNum
      ? "text-sky-300"
      : "text-purple-300";
    return (
      <div>
        <span className="text-white/20">{indent}</span>
        <span className="text-emerald-300">{key}</span>
        <span className="text-white/40">{colon}</span>
        <span className={valColor}>{rest}</span>
      </div>
    );
  }
  if (text.trim() === "{" || text.trim() === "}" || text.trim() === "}," || text.trim() === "{,") {
    return <div className="text-white/40">{text}</div>;
  }
  return <div className="text-white/50">{text}</div>;
}

function AuditOverlay({ open, onClose, title, note }: { open: boolean; onClose: () => void; title: string; note: string }) {
  const lines = JSON.stringify(AUDIT_PAYLOAD, null, 2).split("\n");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0d12] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">{title}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">POST /api/crm/inject</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Code block */}
              <div className="flex-1 overflow-y-auto p-5">
                <pre className="font-mono text-xs leading-6 select-text">
                  {lines.map((line, i) => (
                    <JsonLine key={i} text={line} />
                  ))}
                </pre>
              </div>

              {/* Modal footer note */}
              <div className="px-5 py-3 border-t border-white/[0.05] bg-white/[0.01]">
                <p className="text-[11px] text-slate-600">{note}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated flow-dot connector arrow
───────────────────────────────────────────────────────────── */
function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-12 relative">
      <div className="w-full h-px bg-white/10 relative overflow-visible">
        <AnimatePresence>
          {active && (
            <motion.div
              key="dot"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
              style={{ position: "absolute" }}
            />
          )}
        </AnimatePresence>
      </div>
      <ArrowRight className="w-3 h-3 text-white/20 absolute" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Step progress badge
───────────────────────────────────────────────────────────── */
function StepBadge({ number, label, state }: { number: number; label: string; state: "idle" | "active" | "done" }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={
          state === "active"
            ? { boxShadow: ["0 0 0 0 rgba(52,211,153,0.4)", "0 0 0 8px rgba(52,211,153,0)", "0 0 0 0 rgba(52,211,153,0.4)"] }
            : { boxShadow: "0 0 0 0 rgba(52,211,153,0)" }
        }
        transition={{ duration: 1.4, repeat: Infinity }}
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors duration-300 ${
          state === "done"
            ? "bg-emerald-500 border-emerald-500 text-black"
            : state === "active"
            ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
            : "border-white/10 text-slate-500 bg-transparent"
        }`}
      >
        {state === "done" ? <CheckCircle2 className="w-4 h-4" /> : number}
      </motion.div>
      <span className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 hidden sm:block ${state === "done" ? "text-emerald-400" : state === "active" ? "text-white" : "text-slate-600"}`}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main UI
───────────────────────────────────────────────────────────── */
function CRMSyncUI() {
  const { t, lang } = useI18n();
  const c = t.crmSync;

  const [phase, setPhase] = useState<Phase>("idle");
  const [auditOpen, setAuditOpen] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function startSync() {
    clearTimers();
    setPhase("s1");
    timersRef.current.push(setTimeout(() => setPhase("s2"), 1800));
    timersRef.current.push(setTimeout(() => setPhase("done"), 4400));
  }

  function restart() {
    clearTimers();
    setPhase("idle");
  }

  useEffect(() => () => clearTimers(), []);

  const stepState = (n: number): "idle" | "active" | "done" => {
    if (n === 1) return phase === "idle" ? "idle" : phase === "s1" ? "active" : "done";
    if (n === 2) return phase === "s2" ? "active" : phase === "done" ? "done" : "idle";
    if (n === 3) return phase === "done" ? "active" : "idle";
    return "idle";
  };

  const statusText =
    phase === "idle" ? c.idleStatus : phase === "done" ? c.successStatus : c.processingStatus;

  const panelActive = (n: number) =>
    (n === 1 && (phase === "s1" || phase === "s2" || phase === "done")) ||
    (n === 2 && (phase === "s2" || phase === "done")) ||
    (n === 3 && phase === "done");

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex flex-col">
      {/* ── Audit overlay (portal-like fixed modal) ── */}
      <AuditOverlay
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
        title={c.auditTitle}
        note={c.auditNote}
      />

      {/* ── Top bar ── */}
      <div className="border-b border-white/[0.06] px-5 py-3.5 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={`/${lang}/preview`}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors shrink-0"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">{c.backHome}</span>
        </Link>

        {/* Right-side badges */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Sandbox trust badge */}
          <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-slate-700/60 text-slate-500 bg-slate-900/50">
            🔒 {c.sandboxBadge}
          </span>
          {/* Demo badge */}
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
            {c.badge}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-10">

        {/* ── Header ── */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight"
          >
            {c.headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <>
                    {line.split("–")[0]}
                    {line.includes("–") && (
                      <span className="text-emerald-400">–{line.split("–")[1]}</span>
                    )}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            {c.sub}
          </motion.p>
        </div>

        {/* ── Step progress ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <StepBadge number={1} label={c.step1Label} state={stepState(1)} />
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
          <StepBadge number={2} label={c.step2Label} state={stepState(2)} />
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
          <StepBadge number={3} label={c.step3Label} state={stepState(3)} />
        </motion.div>

        {/* ── 3-Panel Visualizer ── */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">

          {/* Panel 1: Raw Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`flex-1 rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-500 ${
              panelActive(1)
                ? "border-emerald-500/30 bg-emerald-500/[0.03] shadow-[0_0_30px_rgba(52,211,153,0.06)]"
                : "border-white/[0.07] bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 ${panelActive(1) ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-slate-500"}`}>
                <Database className="w-4 h-4" />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${panelActive(1) ? "text-emerald-400" : "text-slate-600"}`}>
                {c.rawDataTitle}
              </p>
            </div>

            <div className="font-mono text-xs space-y-2 flex-1">
              {c.rawFields.map((field, i) => (
                <AnimatePresence key={i}>
                  {(phase === "s1" || phase === "s2" || phase === "done") && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-slate-600 shrink-0 w-24 truncate">{field.key}:</span>
                      <span className="text-emerald-300/90 font-medium truncate">&quot;{field.value}&quot;</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              {phase === "idle" && (
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="inline-block w-2 h-4 bg-slate-700 animate-pulse rounded-sm" />
                  <span>awaiting input...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Flow arrow 1→2 */}
          <FlowArrow active={phase === "s1" || phase === "s2" || phase === "done"} />

          {/* Panel 2: AI Processing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`flex-1 rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-500 ${
              panelActive(2)
                ? "border-emerald-500/30 bg-emerald-500/[0.03] shadow-[0_0_30px_rgba(52,211,153,0.06)]"
                : "border-white/[0.07] bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 ${panelActive(2) ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-slate-500"}`}>
                <Cpu className="w-4 h-4" />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${panelActive(2) ? "text-emerald-400" : "text-slate-600"}`}>
                {c.processingTitle}
              </p>
            </div>

            {/* Pulse ring */}
            <div className="flex items-center justify-center py-1">
              <div className="relative">
                <AnimatePresence>
                  {phase === "s2" && (
                    <>
                      <motion.div
                        key="ring1"
                        initial={{ scale: 0.8, opacity: 0.7 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-emerald-500/30"
                      />
                      <motion.div
                        key="ring2"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                        className="absolute inset-0 rounded-full bg-emerald-400/20"
                      />
                    </>
                  )}
                </AnimatePresence>
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${panelActive(2) ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-white/10 bg-white/5 text-slate-600"}`}>
                  <Zap className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* ── Rule Engine display (Step 2 logic) ── */}
            <AnimatePresence>
              {(phase === "s2" || phase === "done") && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] px-3 py-2"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/70 mb-1">
                    {c.logicLabel}
                  </p>
                  <p className="font-mono text-xs text-amber-300/80">{c.logicRule}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI category tags */}
            <div className="space-y-2 flex-1">
              {c.aiCategories.map((cat, i) => (
                <AnimatePresence key={i}>
                  {(phase === "s2" || phase === "done") && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.22 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-100/80 font-medium">{cat}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              {(phase === "idle" || phase === "s1") && (
                <div className="text-xs text-slate-700 italic">
                  {phase === "s1" ? (
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"
                      />
                      processing...
                    </span>
                  ) : (
                    "—"
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Flow arrow 2→3 */}
          <FlowArrow active={phase === "s2" || phase === "done"} />

          {/* Panel 3: CRM Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`flex-1 rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-500 ${
              panelActive(3)
                ? "border-emerald-500/40 bg-emerald-500/[0.04] shadow-[0_0_40px_rgba(52,211,153,0.1)]"
                : "border-white/[0.07] bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 ${panelActive(3) ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-slate-500"}`}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <p className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${panelActive(3) ? "text-emerald-400" : "text-slate-600"}`}>
                  {c.crmTitle}
                </p>
              </div>
              <AnimatePresence>
                {phase === "done" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  >
                    ✓ Live
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3 flex-1">
              {c.crmFields.map((field, i) => {
                const isScore = i === 3;
                const isNextStep = i === 4;
                return (
                  <AnimatePresence key={i}>
                    {phase === "done" && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.15 }}
                        className={`flex items-start justify-between gap-3 py-2.5 border-b border-white/[0.05] last:border-0 ${isNextStep ? "pt-3" : ""}`}
                      >
                        <span className="text-xs text-slate-500 shrink-0 w-28">{field.key}</span>
                        <span
                          className={`text-xs font-semibold text-right ${
                            isScore
                              ? "text-emerald-400 text-sm"
                              : isNextStep
                              ? "text-white bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px]"
                              : "text-slate-200"
                          }`}
                        >
                          {field.value}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
              {phase !== "done" && (
                <div className="text-xs text-slate-700 italic py-2">—</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Technical Audit button ── */}
        <div className="flex justify-end">
          <button
            onClick={() => setAuditOpen(true)}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-200 border border-white/[0.07] hover:border-white/20 rounded-lg px-4 py-2 transition-all duration-200"
          >
            <FileCode className="w-3.5 h-3.5" />
            {c.auditBtn}
          </button>
        </div>

        {/* ── Status bar + CTA ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <motion.div
              animate={
                phase !== "idle" && phase !== "done"
                  ? { opacity: [1, 0.3, 1] }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.9, repeat: Infinity }}
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                phase === "done"
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  : phase === "idle"
                  ? "bg-slate-600"
                  : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              }`}
            />
            <span className={`text-sm font-medium transition-colors duration-300 ${phase === "done" ? "text-emerald-300" : "text-slate-400"}`}>
              {statusText}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.button
                key="trigger"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={startSync}
                style={{ boxShadow: "0 0 30px rgba(52,211,153,0.3)" }}
                className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {c.triggerBtn}
              </motion.button>
            )}
            {(phase === "s1" || phase === "s2") && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/10 text-slate-500 text-xs uppercase tracking-widest font-bold"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.div>
                {c.processingStatus.split(" ")[0]}...
              </motion.div>
            )}
            {phase === "done" && (
              <motion.button
                key="restart"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={restart}
                className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-emerald-500/40 hover:border-emerald-500/70 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 text-xs uppercase tracking-widest font-bold transition-all duration-200 focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {c.restartBtn}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Business Impact Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 mb-0.5">
                {c.impactTitle}
              </p>
              <p className="text-sm text-slate-300 font-medium">{c.impactText}</p>
            </div>
          </div>

          {/* CTA: CRM-Audit anfragen */}
          <Link
            href={`/${lang}/preview#contact`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 hover:bg-emerald-500/10 hover:border-emerald-500/70 text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
          >
            <ExternalLink className="w-3 h-3" />
            {c.ctaAudit}
          </Link>
        </motion.div>

        {phase === "done" && <DemoResultBlock />}

        {/* ── Demo note ── */}
        <p className="text-center text-xs text-slate-600 border-t border-white/[0.04] pt-6">
          {c.demoNote}
        </p>
      </main>
    </div>
  );
}

export default function CRMSyncPage({ lang }: { lang: string }) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <CRMSyncUI />
    </I18nProvider>
  );
}
