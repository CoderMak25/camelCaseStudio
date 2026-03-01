// mailer.js — Nodemailer transporter configuration and email sending utility.

const nodemailer = require('nodemailer');

let emailReady = false;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter connection on startup (non-blocking)
transporter.verify((error) => {
    if (error) {
        console.warn('⚠️  Email not configured:', error.message);
        console.warn('   Form submissions will save to MongoDB but emails won\'t be sent.');
    } else {
        emailReady = true;
        console.log('✅ Email service ready');
    }
});

/**
 * Sends a contact form notification email to the studio
 * @param {Object} data - { name, email, projectType, message }
 */
const sendContactEmail = async ({ name, email, projectType, message }) => {
    const mailOptions = {
        from: `"camelCase Studio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Enquiry from ${name} — ${projectType}`,
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #F0F0F0; padding: 40px; border-radius: 8px;">
        <h2 style="color: #3B82F6; margin-top: 0;">New Project Enquiry 🚀</h2>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
        
        <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Name</p>
        <p style="font-size: 18px; margin-top: 0;">${name}</p>
        
        <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Email</p>
        <p style="font-size: 18px; margin-top: 0;"><a href="mailto:${email}" style="color: #3B82F6;">${email}</a></p>
        
        <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Project Type</p>
        <p style="font-size: 18px; margin-top: 0;">${projectType}</p>
        
        <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Message</p>
        <p style="font-size: 16px; line-height: 1.6; margin-top: 0; white-space: pre-wrap;">${message}</p>
        
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
        <p style="color: #666; font-size: 12px; margin-bottom: 0;">Sent from camelCase Studio contact form</p>
      </div>
    `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmail, isEmailReady: () => emailReady };
