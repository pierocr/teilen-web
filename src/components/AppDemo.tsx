'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

type DemoStep = {
  id: number
  title: string
  description: string
  screen: string
  action: string
  highlight?: { x: number; y: number; width: number; height: number }
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: 'Crea un grupo',
    description: 'Empieza creando un grupo con tus amigos, roommates o familia. Dale un nombre y agrega participantes.',
    screen: '/screens/home.jpg',
    action: 'Crear grupo',
    highlight: { x: 20, y: 520, width: 300, height: 60 },
  },
  {
    id: 2,
    title: 'Agrega un gasto',
    description: 'Registra gastos al instante. Escanea una boleta con IA o ingrésala manualmente. Elige quién pagó y cómo dividir.',
    screen: '/screens/gasto.jpg',
    action: 'Agregar gasto',
    highlight: { x: 20, y: 450, width: 300, height: 80 },
  },
  {
    id: 3,
    title: 'Teilen calcula automáticamente',
    description: 'Ve en tiempo real quién debe a quién. Sin matemáticas complicadas, Teilen optimiza los pagos para saldar rápido.',
    screen: '/screens/grupos.jpg',
    action: 'Ver balances',
    highlight: { x: 20, y: 300, width: 300, height: 120 },
  },
  {
    id: 4,
    title: 'Mantén el historial',
    description: 'Todas las transacciones quedan registradas. Exporta reportes, filtra por fecha y mantén todo organizado.',
    screen: '/screens/actividad.jpg',
    action: 'Ver actividad',
    highlight: { x: 20, y: 200, width: 300, height: 350 },
  },
]

export function AppDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const step = DEMO_STEPS[currentStep]

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentStep < DEMO_STEPS.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsPlaying(false)
        setCurrentStep(0)
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying])

  const handleNext = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      trackEvent('demo_next_step', { step: currentStep + 2 })
    } else {
      setCurrentStep(0)
      trackEvent('demo_restart')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      trackEvent('demo_previous_step', { step: currentStep })
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    trackEvent(isPlaying ? 'demo_paused' : 'demo_played', { step: currentStep + 1 })
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setIsPlaying(false)
    trackEvent('demo_step_selected', { step: index + 1 })
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Phone Mockup con Screen */}
        <div className="relative mx-auto w-full max-w-sm">
          {/* Phone Frame */}
          <div className="relative mx-auto w-full aspect-[9/19.5] max-w-[340px]">
            {/* Screen Container */}
            <div className="absolute inset-0 rounded-[48px] bg-slate-900 shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-20" />

              {/* Screen Content */}
              <div className="absolute inset-0 bg-white overflow-hidden">
                <div className="relative w-full h-full transition-opacity duration-500">
                  <Image
                    src={step.screen}
                    alt={step.title}
                    fill
                    className="object-cover object-top"
                    sizes="340px"
                    priority={currentStep === 0}
                  />

                  {/* Highlight Overlay */}
                  {step.highlight && (
                    <div className="absolute inset-0 bg-slate-900/40 transition-all duration-700">
                      <div
                        className="absolute border-4 border-brand rounded-2xl animate-pulse-soft"
                        style={{
                          left: `${step.highlight.x}px`,
                          top: `${step.highlight.y}px`,
                          width: `${step.highlight.width}px`,
                          height: `${step.highlight.height}px`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Bar (Home indicator) */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full z-20" />
            </div>

            {/* Phone Border/Edges */}
            <div className="absolute inset-0 rounded-[48px] border-[14px] border-slate-900 pointer-events-none" />

            {/* Power Button */}
            <div className="absolute right-0 top-32 w-1 h-16 bg-slate-800 rounded-l" />
            {/* Volume Buttons */}
            <div className="absolute left-0 top-28 w-1 h-12 bg-slate-800 rounded-r" />
            <div className="absolute left-0 top-44 w-1 h-12 bg-slate-800 rounded-r" />
          </div>
        </div>

        {/* Content & Controls */}
        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex gap-2">
            {DEMO_STEPS.map((s, index) => (
              <button
                key={s.id}
                onClick={() => handleStepClick(index)}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-brand'
                    : index < currentStep
                    ? 'bg-emerald-200'
                    : 'bg-slate-200'
                }`}
                aria-label={`Ir al paso ${index + 1}: ${s.title}`}
              />
            ))}
          </div>

          {/* Step Info */}
          <div className="min-h-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold">
                {step.id}
              </span>
              <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
            </div>
            <p className="text-base leading-7 text-slate-600">{step.description}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Paso anterior"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              className="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition shadow-soft flex items-center justify-center gap-2"
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  Pausar
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {currentStep === DEMO_STEPS.length - 1 ? 'Ver de nuevo' : 'Ver demo automático'}
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition"
              aria-label="Siguiente paso"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">
              ¿Listo para probar Teilen con tu grupo?
            </p>
            <a
              href="/api/download"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition shadow-soft"
              onClick={() => trackEvent('demo_cta_click', { step: currentStep + 1 })}
            >
              Descargar ahora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
