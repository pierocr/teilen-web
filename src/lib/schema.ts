// Enhanced schema markup for better SEO

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo usar Teilen para dividir gastos compartidos",
  "description": "Guía paso a paso para gestionar gastos compartidos con amigos, roommates o familia usando Teilen",
  "image": "https://www.teilen.cl/teilen-og.png",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "CLP",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Crear grupo",
      "text": "Crea un grupo con tus amigos, roommates o familia. Invítalos mediante un enlace o código QR.",
      "image": "https://www.teilen.cl/images/how-group.webp",
      "url": "https://www.teilen.cl#how"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Agregar gastos",
      "text": "Escanea tus boletas con IA o ingresa gastos manualmente. Elige quién pagó y divídelo de distintas formas: igual, porcentual o personalizada.",
      "image": "https://www.teilen.cl/images/how-scan.webp",
      "url": "https://www.teilen.cl#how"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Teilen calcula automáticamente",
      "text": "Ve quién debe a quién en tiempo real. Cada vez que realices un gasto, todos los miembros del grupo serán notificados al instante.",
      "image": "https://www.teilen.cl/images/how-pay.webp",
      "url": "https://www.teilen.cl#how"
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

export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Teilen",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CLP"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "126",
    "reviewCount": "98"
  }
}
