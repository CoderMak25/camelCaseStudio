// mailer.js — Nodemailer configuration for Gmail + email helpers.
//
// To use this securely with Gmail:
// 1. Turn on 2‑Step Verification on your Google account.
// 2. In Google Account → Security → App passwords, create a new app password.
// 3. Set these env vars:
//    GMAIL_USER=camelcasestudio@gmail.com
//    GMAIL_APP_PASSWORD=<the 16‑character app password>

const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD;

let emailReady = Boolean(gmailUser && gmailPass);
let transporter = null;

if (emailReady) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailPass,
        },
    });

    transporter.verify((error) => {
        if (error) {
            console.warn('⚠️  Gmail not configured:', error.message);
            console.warn(
                "   Form submissions will save to MongoDB but emails won't be sent."
            );
            emailReady = false;
        } else {
            console.log('✅ Gmail transporter ready');
        }
    });
} else {
    console.warn(
        '⚠️  GMAIL_USER or GMAIL_APP_PASSWORD missing. Emails will not be sent.'
    );
}

/**
 * Sends a single internal email to the studio inbox with the enquiry details.
 * (From = To = studio address; client does not receive an email.)
 * This function MUST NOT throw — caller handles its own try/catch.
 * @param {Object} data - { name, email, projectType, message }
 */
const sendContactEmail = async ({ name, email, projectType, message }) => {
    if (!emailReady || !transporter) {
        console.warn(
            '⚠️  Email not configured. Contact saved to DB but emails were not sent.'
        );
        return;
    }

    const studioAddress = process.env.GMAIL_TO || gmailUser;
    const timestamp = new Date().toISOString();

    // Single email — internal notification to studio (studio mails to itself)
    const internalHtml = `
  <div style="background:#080810;color:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:32px;max-width:640px;margin:0 auto;">
    <h1 style="margin:0 0 16px 0;font-size:22px;color:#E5E7EB;font-family:'JetBrains Mono',monospace;">
      New Project Enquiry — <span style="color:#6366F1;">${name}</span>
    </h1>

    <p style="margin:0 0 16px 0;font-size:13px;color:#9CA3AF;">${timestamp}</p>

    <hr style="border:none;border-top:1px solid rgba(148,163,184,0.25);margin:16px 0;" />

    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#6B7280;">Client Name</p>
    <p style="margin:0 0 12px 0;font-size:16px;color:#F9FAFB;">${name}</p>

    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#6B7280;">Client Email</p>
    <p style="margin:0 0 12px 0;font-size:15px;">
      <a href="mailto:${email}" style="color:#6366F1;text-decoration:none;">${email}</a>
    </p>

    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#6B7280;">Project Type</p>
    <p style="margin:0 0 12px 0;font-size:15px;color:#E5E7EB;">${projectType}</p>

    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#6B7280;">Message</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#D1D5DB;white-space:pre-wrap;">${message}</p>

    <div style="margin:0 0 24px 0;">
      <a href="mailto:${email}?subject=${encodeURIComponent(
          'Re: New Project Enquiry — ' + name
      )}" 
         style="display:inline-block;padding:10px 18px;border-radius:999px;background:#6366F1;color:#F9FAFB;text-decoration:none;font-size:13px;font-family:'JetBrains Mono',monospace;letter-spacing:0.14em;text-transform:uppercase;">
        Reply in Gmail
      </a>
    </div>

    <hr style="border:none;border-top:1px solid rgba(148,163,184,0.25);margin:16px 0;" />
    <p style="margin:0;font-size:11px;color:#6B7280;">Sent from <span style="font-family:'JetBrains Mono',monospace;">camelCase Studio</span> contact form</p>
  </div>
`;

    await transporter.sendMail({
        from: studioAddress,
        to: studioAddress,
        subject: `New Project Enquiry — ${name}`,
        html: internalHtml,
    });
};

module.exports = { sendContactEmail, isEmailReady: () => emailReady };
