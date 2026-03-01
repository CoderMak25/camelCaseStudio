// mailer.js — Email sending via Promailer HTTP API (Render‑friendly, no SMTP).
//
// Promailer docs: https://promailer.xyz (mailserver.automationlounge.com)
//
// Required env vars:
//   API_MAIL_KEY   = your Promailer API key
//   EMAIL_TO       = where you receive enquiries (e.g. camelcasestudio@gmail.com)
// Optional:
//   MAIL_API_URL   = override API endpoint (default below)
//   EMAIL_FROM     = custom "from" address (defaults to SMTP-configured sender in Promailer)

const axios = require('axios');

const PROMAILER_API_URL =
    process.env.MAIL_API_URL ||
    'https://mailserver.automationlounge.com/api/v1/messages/send';

const apiKey = process.env.API_MAIL_KEY;
const studioAddress = process.env.EMAIL_TO || process.env.EMAIL_USER;
const fromAddress = process.env.EMAIL_FROM || undefined;

const emailReady = Boolean(apiKey && studioAddress);

if (!emailReady) {
    console.warn(
        '⚠️  Promailer email not fully configured. Contacts will save, but emails may not be sent.'
    );
}

/**
 * Sends a single internal email to the studio inbox with the enquiry details.
 * (To = studioAddress; client does not receive an email.)
 * This function MUST NOT throw — caller handles its own try/catch.
 * @param {Object} data - { name, email, projectType, message }
 */
const sendContactEmail = async ({ name, email, projectType, message }) => {
    if (!emailReady) {
        console.warn(
            '⚠️  Promailer not configured. Contact saved to DB but email was not sent.'
        );
        return;
    }

    const timestamp = new Date().toISOString();

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

    const payload = {
        to: studioAddress,
        subject: `New Project Enquiry — ${name}`,
        html: internalHtml,
    };

    if (fromAddress) {
        payload.from = fromAddress;
    }

    try {
        const response = await axios.post(PROMAILER_API_URL, payload, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });

        if (!response.data?.success) {
            console.warn(
                '⚠️  Promailer responded with non-success:',
                response.data
            );
        }
    } catch (error) {
        console.error('Email sending failed (Promailer):', error.message);
    }
};

module.exports = { sendContactEmail, isEmailReady: () => emailReady };
