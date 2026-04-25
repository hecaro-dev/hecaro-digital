import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

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

    const body = [
      "Neue Kontaktanfrage über HECARO Digital:",
      "",
      `Name:  ${name}`,
      `Email: ${email}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `"HECARO Digital" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: body,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    res.status(500).json({ error: "Send failed" });
  }
});

export default router;
