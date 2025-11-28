import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand to-brand-dark">
            404
          </h1>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-brand to-brand-light rounded-full" />
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Página no encontrada
        </h2>

        <p className="text-lg text-slate-600 mb-8">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark transition shadow-soft inline-block"
          >
            Volver al inicio
          </Link>

          <Link
            href="/api/download"
            className="px-6 py-3 border-2 border-brand text-brand rounded-2xl font-semibold hover:bg-brand hover:text-white transition inline-block"
          >
            Descargar Teilen
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">
            ¿Necesitas ayuda? Prueba estas páginas:
          </p>
          <div className="flex gap-4 justify-center text-sm">
            <Link href="/preguntas-frecuentes" className="text-brand hover:underline">
              Preguntas frecuentes
            </Link>
            <Link href="/contacto" className="text-brand hover:underline">
              Contacto
            </Link>
            <Link href="/privacidad" className="text-brand hover:underline">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
