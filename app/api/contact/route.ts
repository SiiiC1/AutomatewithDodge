import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, company, projectType, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'dodge.bellic@gmail.com',
    replyTo: email,
    subject: `[Portfolio] ${projectType || 'New message'} from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A1628; color: #F8FAFC; border-radius: 12px;">
        <h2 style="color: #00D9FF; margin-top: 0;">New message from your portfolio</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 120px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00D9FF;">${email}</a></td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Company</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
          ${projectType ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Type</td><td style="padding: 8px 0;">${projectType}</td></tr>` : ''}
        </table>
        <hr style="border-color: #1E3A5F; margin: 16px 0;" />
        <p style="color: #94a3b8; margin-bottom: 8px;">Message</p>
        <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
