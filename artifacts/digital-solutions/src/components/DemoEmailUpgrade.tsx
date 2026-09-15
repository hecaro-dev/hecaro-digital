"use client";

import { useState } from "react";
import { useI18n } from "../i18n";

type DemoType = "qualifier" | "firstContact";

export default function DemoEmailUpgrade({
  demo,
  score,
}: {
  demo: DemoType;
  score: number;
}) {
  const { t, lang } = useI18n();
  const copy = t.demoEmail;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !consent || sending || sent) return;

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/demo-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consent,
          demo,
          score,
          lang,
        }),
      });

      if (!response.ok) throw new Error("Email delivery failed");
      setSent(true);
    } catch {
      setError(copy.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-black/15 p-5 sm:p-6"
    >
      <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
        {copy.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {copy.description}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder={copy.placeholder}
          required
          disabled={sending || sent}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!email.trim() || !consent || sending || sent}
          className="rounded-xl bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {sending ? copy.sending : copy.button}
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-400">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setError("");
          }}
          disabled={sending || sent}
          className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500"
        />
        <span>{copy.consent}</span>
      </label>

      {sent && (
        <p className="mt-4 text-sm font-semibold text-emerald-400" role="status">
          {copy.success}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm font-semibold text-red-400" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}