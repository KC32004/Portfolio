const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const sendContactNotification = async ({ fullName, email, subject, message }) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <div style="background:#1e3a5f;padding:24px;color:white;">
            <h2 style="margin:0;">New Contact Form Submission</h2>
            <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Chandana K — Portfolio</p>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;width:100px;">From</td><td style="padding:8px 0;font-weight:600;">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Subject</td><td style="padding:8px 0;">${subject}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:6px;border-left:4px solid #3b82f6;">
              <p style="margin:0;color:#334155;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="margin-top:20px;font-size:12px;color:#94a3b8;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Email notification failed:', error.message);
  }
};

module.exports = { sendContactNotification };
