'use client'

import { useState, useEffect } from 'react'
import { trackDownloadClick } from '@/lib/analytics'

export function MobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px down
      setShow(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  const handleClick = () => {
    trackDownloadClick('universal')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur border-t border-slate-200 md:hidden animate-slide-up">
      <a
        href="/api/download"
        onClick={handleClick}
        className="block w-full px-6 py-3 bg-brand text-white text-center rounded-xl font-semibold hover:bg-brand-dark transition shadow-soft"
      >
        Descargar Teilen
      </a>
    </div>
  )
}
