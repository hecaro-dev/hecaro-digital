import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);
    const contactEmail = process.env.CONTACT_EMAIL ?? smtpUser;

    if (!smtpUser || !smtpPass || !contactEmail) {
      console.error("contact: SMTP not configured — SMTP_USER, SMTP_PASS, CONTACT_EMAIL required");
      return NextResponse.json({ error: "Email not configured" }, { status: 503 });
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact API error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
