export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="text-center">
        {/* Spinner animado */}
        <div className="relative inline-flex">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
          <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-brand opacity-20" />
        </div>

        {/* Texto de carga */}
        <p className="mt-6 text-lg font-medium text-slate-600 animate-pulse">
          Cargando...
        </p>

        {/* Logo pequeño opcional */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
          <span className="h-2 w-2 rounded-full bg-brand animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 rounded-full bg-brand animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-2 rounded-full bg-brand animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
