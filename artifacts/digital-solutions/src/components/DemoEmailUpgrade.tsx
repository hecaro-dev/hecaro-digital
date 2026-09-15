"use client";

import Script from "next/script";
import { useEffect, useId, useState } from "react";
import { useI18n } from "../i18n";

type DemoType = "qualifier" | "firstContact";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
    [key: `demoEmailTurnstile${string}`]:
      | ((token: string) => void)
      | undefined;
  }
}

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
  const [challengeToken, setChallengeToken] = useState("");
  const callbackId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const callbackName = `demoEmailTurnstile${callbackId}` as const;
  const expiredCallbackName = `demoEmailTurnstileExpired${callbackId}` as const;

  useEffect(() => {
    if (!turnstileSiteKey) return;
    window[callbackName] = setChallengeToken;
    window[expiredCallbackName] = () => setChallengeToken("");
    return () => {
      delete window[callbackName];
      delete window[expiredCallbackName];
    };
  }, [callbackName, expiredCallbackName]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !email.trim() ||
      !consent ||
      sending ||
      sent ||
      (turnstileSiteKey && !challengeToken)
    ) return;

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
          challengeToken,
        }),
      });

      if (!response.ok) {
        const payload: unknown = await response.json().catch(() => null);
        const apiError =
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error: unknown }).error)
            : "Unknown API error";
        console.error("Demo email delivery failed", {
          status: response.status,
          error: apiError,
        });
        throw new Error(apiError);
      }
      setSent(true);
    } catch (submitError) {
      console.error("Demo email submission failed", submitError);
      setError(copy.error);
      if (turnstileSiteKey) {
        setChallengeToken("");
        window.turnstile?.reset(document.getElementById(`turnstile-${callbackId}`) ?? undefined);
      }
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
          disabled={
            !email.trim() ||
            !consent ||
            sending ||
            sent ||
            Boolean(turnstileSiteKey && !challengeToken)
          }
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

      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            id={`turnstile-${callbackId}`}
            className="cf-turnstile mt-4"
            data-sitekey={turnstileSiteKey}
            data-action="demo-email"
            data-callback={callbackName}
            data-expired-callback={expiredCallbackName}
            data-error-callback={expiredCallbackName}
          />
        </>
      )}

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

  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
    [key: `demoEmailTurnstile${string}`]:
      | ((token: string) => void)
      | undefined;
  }
