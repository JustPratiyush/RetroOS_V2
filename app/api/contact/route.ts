import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, subject, message, name } = body;

    // Validation
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Transporter (Use your .env variables)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email Template (Ported from server.js)
    const htmlContent = `
      <div style="font-family: 'Courier New', monospace; padding: 20px; background: #f0f0f0;">
        <div style="background: #fff; border: 2px solid #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #333; color: #fff; padding: 15px; text-align: center;">
            <h2>📧 New Message from RetroOS</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>From:</strong> ${name || "Anonymous"} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f8f8f8; padding: 15px; border: 1px solid #ddd; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"RetroOS" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `[RetroOS] ${subject}`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
