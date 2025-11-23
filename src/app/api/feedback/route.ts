import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email de destination (caché côté serveur)
const DESTINATION_EMAIL = "lorisdcxpro@gmail.com";

type MessageType = "idea" | "support" | "complaint";

interface FeedbackRequest {
  name: string;
  email: string;
  type: MessageType;
  message: string;
}

const messageTypeLabels: Record<MessageType, string> = {
  idea: "💡 Idée",
  support: "🤝 Support",
  complaint: "⚠️ Réclamation",
};

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { name, email, type, message } = body;

    // Validation
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Récupération des credentials SMTP
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    // Si les credentials ne sont pas configurés en développement, log le message
    if (!smtpUser || !smtpPass) {
      console.log("\n========== FEEDBACK REÇU (Mode Développement) ==========");
      console.log(`Type: ${messageTypeLabels[type]}`);
      console.log(`De: ${name} <${email}>`);
      console.log(`Date: ${new Date().toLocaleString("fr-FR")}`);
      console.log(`Message:\n${message}`);
      console.log("=======================================================\n");
      
      console.warn(
        "⚠️  SMTP credentials non configurés. Le message a été loggé mais pas envoyé par email."
      );
      console.warn(
        "💡 Pour activer l'envoi d'emails, configurez SMTP_USER et SMTP_PASS dans .env.local"
      );
      
      return NextResponse.json(
        { 
          message: "Message reçu et enregistré (mode développement - email non envoyé)",
          devMode: true
        },
        { status: 200 }
      );
    }

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Construction du contenu de l'email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; margin-bottom: 20px; }
            .info-row { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6b7280; }
            .value { color: #1f2937; }
            .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">SubScanner Feedback</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Nouveau message reçu</p>
            </div>
            <div class="content">
              <div class="badge">${messageTypeLabels[type]}</div>
              
              <div class="info-row">
                <span class="label">De:</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              
              <div class="info-row">
                <span class="label">Date:</span>
                <span class="value">${new Date().toLocaleString("fr-FR")}</span>
              </div>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de feedback SubScanner</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Nouveau message SubScanner - ${messageTypeLabels[type]}

De: ${name}
Email: ${email}
Date: ${new Date().toLocaleString("fr-FR")}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de feedback SubScanner
    `;

    // Envoi de l'email
    await transporter.sendMail({
      from: `"SubScanner Feedback" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
      to: DESTINATION_EMAIL,
      replyTo: email,
      subject: `[SubScanner] ${messageTypeLabels[type]} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du feedback:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
