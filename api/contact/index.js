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

module.exports = async function (context, req) {
  context.res = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  }

  if (req.method === 'OPTIONS') {
    context.res.status = 200
    context.res.body = ''
    return
  }

  if (req.method !== 'POST') {
    context.res.status = 405
    context.res.body = JSON.stringify({ error: 'Method not allowed' })
    return
  }

  try {
    const { name, email, phone, message } = req.body

    if (!name || !email || !message) {
      context.res.status = 400
      context.res.body = JSON.stringify({ error: 'Name, email, and message are required.' })
      return
    }

    await transporter.sendMail({
      from: `"Great Doctors USA" <${process.env.SMTP_USER}>`,
      to: process.env.INTAKE_EMAIL,
      subject: `Contact Form — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e9ecef;border-radius:8px;overflow:hidden;">
          <div style="background:#0a1628;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Message</h1>
            <p style="color:#00b4d8;margin:4px 0 0;font-size:14px;">Via greatdoctorsusa.health</p>
          </div>
          <div style="padding:24px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;width:30%;border-bottom:1px solid #e9ecef;">Name</td>
                <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e9ecef;">Email</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e9ecef;"><a href="mailto:${email}" style="color:#00b4d8;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e9ecef;">Phone</td>
                <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;vertical-align:top;">Message</td>
                <td style="padding:8px 12px;color:#444;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background:#f8f9fa;padding:16px 32px;border-top:1px solid #e9ecef;">
            <p style="margin:0;font-size:12px;color:#888;">Great Doctors USA · intake@greatdoctorsusa.health</p>
          </div>
        </div>`,
    })

    context.res.status = 200
    context.res.body = JSON.stringify({ success: true })
  } catch (err) {
    context.log.error('Contact email error:', err)
    context.res.status = 500
    context.res.body = JSON.stringify({ error: 'Failed to send message. Please try again.' })
  }
}
