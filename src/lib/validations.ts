import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.enum(['soporte', 'sugerencia', 'colaboracion', 'otro']),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const waitlistSchema = z.object({
  email: z.string().email('Email inválido'),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>
