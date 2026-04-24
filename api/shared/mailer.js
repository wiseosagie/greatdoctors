const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.privateemail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendMail({ subject, html }) {
  return transporter.sendMail({
    from: `"Great Doctors USA" <${process.env.SMTP_USER}>`,
    to: process.env.INTAKE_EMAIL,
    subject,
    html,
  })
}

module.exports = { sendMail }
