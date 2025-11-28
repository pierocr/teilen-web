import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations'

export const runtime = 'edge'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email via Resend
    await resend.emails.send({
      from: 'Teilen <contacto@teilen.app>',
      to: 'soporte@teilen.app', // Change to your email
      replyTo: validatedData.email,
      subject: `[${validatedData.subject.toUpperCase()}] ${validatedData.name}`,
      text: `
Nuevo mensaje de contacto desde Teilen.cl

Nombre: ${validatedData.name}
Email: ${validatedData.email}
Asunto: ${validatedData.subject}

Mensaje:
${validatedData.message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Inténtalo nuevamente.' },
      { status: 400 }
    )
  }
}
