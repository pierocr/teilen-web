'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Algo salió mal
        </h1>

        <p className="text-lg text-slate-600 mb-2">
          No te preocupes, estamos trabajando en solucionarlo.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
              Detalles técnicos
            </summary>
            <pre className="mt-2 text-xs bg-slate-100 p-3 rounded-lg overflow-auto text-red-600">
              {error.message}
            </pre>
          </details>
        )}

        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark transition shadow-soft"
          >
            Intentar nuevamente
          </button>

          <a
            href="/"
            className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:border-brand hover:text-brand transition"
          >
            Volver al inicio
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Si el problema persiste,{' '}
          <a href="/contacto" className="text-brand hover:underline">
            contáctanos
          </a>
        </p>
      </div>
    </div>
  )
}
