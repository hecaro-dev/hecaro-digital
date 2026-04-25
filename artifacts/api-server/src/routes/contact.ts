import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const autoResponderSubject: Record<string, string> = {
  de: "Anfrage erhalten – HECARO Digital",
  en: "Inquiry received – HECARO Digital",
  es: "Consulta recibida – HECARO Digital",
};

const autoResponderBody: Record<string, string> = {
  de: [
    "Vielen Dank für Ihre Anfrage.",
    "",
    "Ich habe Ihre Nachricht erhalten und werde diese persönlich sichten.",
    "Sie erhalten innerhalb der nächsten 24 Stunden eine Rückmeldung.",
    "",
    "Beste Grüße,",
    "HECARO Digital",
  ].join("\n"),
  en: [
    "Thank you for your inquiry.",
    "",
    "I have received your message and will review it personally.",
    "You will receive a response within the next 24 hours.",
    "",
    "Best regards,",
    "HECARO Digital",
  ].join("\n"),
  es: [
    "Gracias por su consulta.",
    "",
    "He recibido su mensaje y lo revisaré personalmente.",
    "Recibirá una respuesta en las próximas 24 horas.",
    "",
    "Saludos cordiales,",
    "HECARO Digital",
  ].join("\n"),
};

router.post("/contact", async (req, res) => {
  const { name, email, message, lang } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL ?? smtpUser;

  console.log("Using SMTP User:", smtpUser);
  console.log("Sending to:", contactEmail);

  if (!smtpUser || !smtpPass || !contactEmail) {
    console.error("contact: SMTP_USER, SMTP_PASS or CONTACT_EMAIL not set");
    res.status(503).json({ ok: false, error: "Email not configured" });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // ── MAIN EMAIL (priority — must succeed) ────────────────────────────
    await transporter.sendMail({
      from: smtpUser,
      to: contactEmail,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: [
        "Neue Kontaktanfrage über HECARO Digital:",
        "",
        `Name:  ${name}`,
        `Email: ${email}`,
        `Sprache: ${lang ?? "—"}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    // ── AUTO-RESPONDER (non-blocking — failure never affects the response)
    const resolvedLang = lang && autoResponderSubject[lang] ? lang : "de";
    try {
      await transporter.sendMail({
        from: smtpUser,
        to: email,
        subject: autoResponderSubject[resolvedLang],
        text: autoResponderBody[resolvedLang],
      });
      console.log("Auto-responder sent to:", email);
    } catch (autoErr) {
      console.error("contact: auto-responder failed (non-fatal):", autoErr);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact SMTP error:", err);
    res.status(500).json({ ok: false, error: "Send failed" });
  }
});

export default router;
