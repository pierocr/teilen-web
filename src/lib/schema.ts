import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo usar Teilen para dividir gastos compartidos",
  "description": "Guía paso a paso para gestionar gastos compartidos con amigos, familia o cuentas personales usando Teilen App.",
  "image": absoluteUrl("/teilen-og.webp"),
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Crear grupo",
      "text": "Crea un grupo con amigos, familia, pareja o personas con las que compartes cuentas. Invítalos mediante un enlace o código QR.",
      "image": absoluteUrl("/images/how-group.webp"),
      "url": `${SITE_URL}#how`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Agregar gastos",
      "text": "Ingresa un gasto, elige quién pagó y define cómo dividirlo entre las personas del grupo.",
      "image": absoluteUrl("/images/how-scan.webp"),
      "url": `${SITE_URL}#how`
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Revisar saldos y recordatorios",
      "text": "Revisa saldos, pagos, gastos recurrentes, recordatorios y metas de ahorro desde una vista clara.",
      "image": absoluteUrl("/images/how-pay.webp"),
      "url": `${SITE_URL}#how`
    }
  ]
}

export const createReviewSchema = (review: {
  author: string
  rating: number
  reviewBody: string
  context?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "MobileApplication",
    "name": "Teilen",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "iOS, Android"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating.toString(),
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "reviewBody": review.reviewBody,
  "publisher": {
    "@type": "Organization",
    "name": "Teilen"
  }
})
