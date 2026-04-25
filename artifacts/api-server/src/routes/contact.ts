import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const AUTO_RESPONDER: Record<string, { subject: string; body: (name: string) => string }> = {
  de: {
    subject: "Anfrage erhalten – HECARO Digital",
    body: (name) =>
      [
        `Guten Tag ${name},`,
        "",
        "vielen Dank für Ihre Anfrage bei HECARO Digital.",
        "",
        "Ich habe Ihre Nachricht erhalten und werde diese persönlich sichten.",
        "Sie erhalten innerhalb der nächsten 24 Stunden eine Rückmeldung zu Ihrem Anliegen.",
        "",
        "Beste Grüße",
        "HECARO Digital",
      ].join("\n"),
  },
  en: {
    subject: "Inquiry received – HECARO Digital",
    body: (name) =>
      [
        `Dear ${name},`,
        "",
        "thank you for reaching out to HECARO Digital.",
        "",
        "I have received your message and will review it personally.",
        "You can expect a reply within the next 24 hours.",
        "",
        "Best regards,",
        "HECARO Digital",
      ].join("\n"),
  },
  es: {
    subject: "Consulta recibida – HECARO Digital",
    body: (name) =>
      [
        `Estimado/a ${name},`,
        "",
        "gracias por ponerse en contacto con HECARO Digital.",
        "",
        "He recibido su mensaje y lo revisaré personalmente.",
        "Recibirá una respuesta en las próximas 24 horas.",
        "",
        "Atentamente,",
        "HECARO Digital",
      ].join("\n"),
  },
};

router.post("/contact", async (req, res) => {
  const { name, email, message, lang } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const contactEmail = process.env.CONTACT_EMAIL ?? smtpUser;

  if (!smtpUser || !smtpPass || !contactEmail) {
    console.error("contact: SMTP not configured — SMTP_USER, SMTP_PASS, CONTACT_EMAIL required");
    res.status(503).json({ error: "Email not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  // ── 1. Main email to owner ── must succeed for the request to succeed
  try {
    await transporter.sendMail({
      from: `"HECARO Digital" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: [
        "Neue Kontaktanfrage über HECARO Digital:",
        "",
        `Name:  ${name}`,
        `Email: ${email}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("contact main mail error:", err);
    res.status(500).json({ error: "Send failed" });
    return;
  }

  // ── 2. Respond to client immediately ── auto-responder must not block this
  res.json({ ok: true });

  // ── 3. Auto-responder — fully isolated, never throws into main handler ──
  void (async () => {
    try {
      const locale = lang === "en" ? "en" : lang === "es" ? "es" : "de";
      const responder = AUTO_RESPONDER[locale];
      await transporter.sendMail({
        from: `"HECARO Digital" <${smtpUser}>`,
        to: email,
        subject: responder.subject,
        text: responder.body(name),
      });
    } catch (err) {
      console.error("contact auto-responder error (non-critical):", err);
    }
  })();
});

export default router;
