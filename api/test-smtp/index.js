const nodemailer = require('nodemailer')

module.exports = async function (context, req) {
  const results = {
    env: {
      SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
      SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
      SMTP_USER: process.env.SMTP_USER || 'NOT SET',
      SMTP_PASS: process.env.SMTP_PASS ? '✓ set' : 'NOT SET',
      INTAKE_EMAIL: process.env.INTAKE_EMAIL || 'NOT SET',
    },
    connection: null,
    send: null,
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.privateemail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  })

  try {
    await transporter.verify()
    results.connection = '✓ OK'
  } catch (err) {
    results.connection = `✗ FAILED: ${err.message} (code: ${err.code})`
  }

  if (results.connection.startsWith('✓')) {
    try {
      await transporter.sendMail({
        from: `"Great Doctors USA" <${process.env.SMTP_USER}>`,
        to: process.env.INTAKE_EMAIL,
        subject: 'Azure SMTP Test',
        html: '<p>Azure can reach the mail server.</p>',
      })
      results.send = '✓ Email sent'
    } catch (err) {
      results.send = `✗ FAILED: ${err.message}`
    }
  }

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results, null, 2),
  }
}
