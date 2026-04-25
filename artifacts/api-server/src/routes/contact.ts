import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

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
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact SMTP error:", err);
    res.status(500).json({ ok: false, error: "Send failed" });
  }
});

export default router;
