import { NextRequest, NextResponse } from "next/server";
import { consumeDemoEmailLimits } from "@workspace/db";
import nodemailer from "nodemailer";

type Lang = "de" | "en" | "es";
type DemoType = "qualifier" | "firstContact";
type Grade = "A" | "B" | "C";

const CONTACT_URL_BASE = "https://hecaro-digital.vercel.app";
const copy = {
  de: {
    subject: "Ihre Anfrage-Auswertung von HECARO Digital",
    intro: "Unser System hat Ihre Test-Anfrage analysiert.",
    result: "Ergebnis",
    score: "Score",
    colors: { A: "Grün", B: "Gelb", C: "Rot" },
    headlines: {
      A: "Vielversprechende Anfrage erkannt — Ihr System würde diesen Lead sofort priorisieren und innerhalb von Minuten kontaktieren.",
      B: "Mittleres Potenzial erkannt — Ihr System würde antworten, aber mit angepasstem Ton. Kein verschwendetes Gespräch, kein verlorener Lead.",
      C: "Schwache Anfrage erkannt — Ihr System hätte diese automatisch aussortiert und Ihnen wertvolle Zeit gespart. Genau dafür ist es da.",
    },
    outro: "Genau so würde Ihr System ab sofort jede eingehende Anfrage behandeln — automatisch, in Sekunden, ohne Ihren Aufwand.",
    cta: "Ich will das für mein Unternehmen",
  },
  en: {
    subject: "Your enquiry analysis from HECARO Digital",
    intro: "Our system has analysed your test enquiry.",
    result: "Result",
    score: "Score",
    colors: { A: "Green", B: "Yellow", C: "Red" },
    headlines: {
      A: "High-potential enquiry detected — your system would prioritise this lead immediately and reach out within minutes.",
      B: "Medium potential detected — your system would respond, but with an adjusted tone. No wasted conversation, no lost lead.",
      C: "Weak enquiry detected — your system would have filtered this out automatically, saving you valuable time. That is exactly what it is built for.",
    },
    outro: "This is exactly how your system would handle every incoming enquiry — automatically, within seconds, without any effort on your part.",
    cta: "I want this for my business",
  },
  es: {
    subject: "Su análisis de solicitud de HECARO Digital",
    intro: "Nuestro sistema ha analizado su solicitud de prueba.",
    result: "Resultado",
    score: "Puntuación",
    colors: { A: "Verde", B: "Amarillo", C: "Rojo" },
    headlines: {
      A: "Solicitud prometedora detectada — su sistema priorizaría este contacto de inmediato y respondería en minutos.",
      B: "Potencial medio detectado — su sistema respondería, pero con un tono adaptado. Sin conversaciones perdidas, sin leads olvidados.",
      C: "Solicitud débil detectada — su sistema la habría descartado automáticamente, ahorrándole tiempo valioso. Para eso está diseñado.",
    },
    outro: "Así es exactamente como su sistema gestionaría cada solicitud entrante — de forma automática, en segundos, sin ningún esfuerzo por su parte.",
    cta: "Quiero esto para mi empresa",
  },
} satisfies Record<Lang, {
  subject: string;
  intro: string;
  result: string;
  score: string;
  colors: Record<Grade, string>;
  headlines: Record<Grade, string>;
  outro: string;
  cta: string;
}>;

function gradeFor(demo: DemoType, score: number): Grade {
  if (score >= 60) return "A";
  if (score >= (demo === "qualifier" ? 35 : 45)) return "B";
  return "C";
}

function isEmail(value: unknown): value is string {
  return typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isDemoType(value: unknown): value is DemoType {
  return value === "qualifier" || value === "firstContact";
}

function isLang(value: unknown): value is Lang {
  return value === "de" || value === "en" || value === "es";
}

function isScore(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0 && (value as number) <= 100;
}

function createEmailHtml(lang: Lang, grade: Grade, score: number, contactUrl: string) {
  const text = copy[lang];
  const accent = grade === "A" ? "#10b981" : grade === "B" ? "#f59e0b" : "#ef4444";

  return `<!doctype html>
<html lang="${lang}">
  <body style="margin:0;background:#020617;color:#e2e8f0;font-family:Arial,sans-serif;">
    <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
      <div style="border:1px solid #1e293b;border-radius:20px;background:#07111f;padding:32px;">
        <div style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:28px;">HECARO Digital</div>
        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">${text.intro}</p>
        <div style="border-left:4px solid ${accent};background:#0f172a;border-radius:10px;padding:18px 20px;margin-bottom:24px;">
          <div style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:${accent};font-weight:700;">${text.result}: ${text.colors[grade]} · ${text.score} ${score}/100</div>
          <p style="font-size:18px;line-height:1.55;color:#ffffff;font-weight:700;margin:12px 0 0;">${text.headlines[grade]}</p>
        </div>
        <p style="font-size:16px;line-height:1.7;margin:0 0 28px;">${text.outro}</p>
        <a href="${contactUrl}" style="display:inline-block;background:#10b981;color:#020617;text-decoration:none;font-size:14px;font-weight:700;padding:14px 22px;border-radius:999px;">${text.cta}</a>
      </div>
    </div>
  </body>
</html>`;
}

function createEmailText(lang: Lang, grade: Grade, score: number, contactUrl: string) {
  const text = copy[lang];
  return [
    "HECARO Digital",
    "",
    text.intro,
    "",
    `${text.result}: ${text.colors[grade]} · ${text.score} ${score}/100`,
    "",
    text.headlines[grade],
    "",
    text.outro,
    "",
    `${text.cta}: ${contactUrl}`,
  ].join("\n");
}

function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

async function verifyBotChallenge(token: unknown, ip: string, hostname: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (Boolean(secret) !== Boolean(siteKey)) return "misconfigured" as const;
  if (!secret) return "passed" as const;
  if (typeof token !== "string" || !token) return "failed" as const;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    },
  );
  if (!response.ok) return "failed" as const;
  const result = (await response.json()) as {
    success?: boolean;
    action?: string;
    hostname?: string;
  };
  return result.success === true &&
    result.action === "demo-email" &&
    result.hostname === hostname
    ? "passed" as const
    : "failed" as const;
}
function smtpErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") return { type: typeof error };
  const value = error as {
    name?: unknown;
    code?: unknown;
    command?: unknown;
    responseCode?: unknown;
  };
  return {
    name: typeof value.name === "string" ? value.name : undefined,
    code: typeof value.code === "string" ? value.code : undefined,
    command: typeof value.command === "string" ? value.command : undefined,
    responseCode: typeof value.responseCode === "number" ? value.responseCode : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { email, consent, demo, score, lang, challengeToken } = body as Record<string, unknown>;

    if (
      !isEmail(email) ||
      consent !== true ||
      !isDemoType(demo) ||
      !isScore(score) ||
      !isLang(lang)
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const forwardedFor =
      req.headers.get("x-vercel-forwarded-for") ??
      req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const challenge = await verifyBotChallenge(
      challengeToken,
      ip,
      req.nextUrl.hostname,
    );
    if (challenge === "misconfigured") {
      console.error("demo-email: Turnstile configuration is incomplete");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    if (challenge === "failed") {
      return NextResponse.json({ error: "Challenge failed" }, { status: 403 });
    }

    let limit: Awaited<ReturnType<typeof consumeDemoEmailLimits>>;
    try {
      limit = await consumeDemoEmailLimits(ip, normalizedEmail);
    } catch (error) {
      console.error("demo-email: persistent rate limit unavailable", error);
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);

    if (!smtpUser || !smtpPass || !Number.isInteger(smtpPort) || smtpPort <= 0) {
      console.error("demo-email: SMTP not configured");
      return NextResponse.json({ error: "Email not configured" }, { status: 503 });
    }

    const grade = gradeFor(demo, score);
    const contactUrl = new URL(`/${lang}/preview#contact`, CONTACT_URL_BASE).toString();
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    try {
      await transporter.sendMail({
        from: `"HECARO Digital" <${smtpUser}>`,
        to: normalizedEmail,
        subject: copy[lang].subject,
        html: createEmailHtml(lang, grade, score, contactUrl),
        text: createEmailText(lang, grade, score, contactUrl),
      });
    } catch (smtpError) {
      console.error("demo-email: SMTP delivery failed", smtpErrorDetails(smtpError));
      return NextResponse.json({ error: "SMTP delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("demo-email API error:", error);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
