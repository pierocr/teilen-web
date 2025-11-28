'use client'

import { useEffect } from 'react'

export function PWAInstaller() {
  useEffect(() => {
    // Solo registra el service worker en producción
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registrado:', registration.scope)

            // Verificar actualizaciones cada hora
            setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000)
          })
          .catch((error) => {
            console.error('Error al registrar Service Worker:', error)
          })
      })
    }
  }, [])

  return null // Este componente no renderiza nada
}
