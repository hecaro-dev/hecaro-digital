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
    const contactEmail = process.env.CONTACT_EMAIL ?? smtpUser;

    console.log("Using SMTP User:", smtpUser);
    console.log("Sending to:", contactEmail);

    if (!smtpUser || !smtpPass || !contactEmail) {
      console.error("contact: SMTP_USER, SMTP_PASS or CONTACT_EMAIL not set");
      return NextResponse.json({ error: "Email not configured" }, { status: 503 });
    }

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact API error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
