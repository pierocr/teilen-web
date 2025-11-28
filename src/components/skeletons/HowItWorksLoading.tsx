export function HowItWorksLoading() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 fhd:py-24">
      <div className="text-center mb-12">
        <div className="h-6 w-40 bg-slate-200 rounded-full animate-pulse mx-auto mb-4" />
        <div className="h-12 w-96 bg-slate-200 rounded-lg animate-pulse mx-auto" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="mx-auto h-64 w-64 bg-slate-200 rounded-3xl animate-pulse mb-6" role="status" aria-label="Cargando paso" />
            <div className="h-6 w-48 bg-slate-200 rounded-lg animate-pulse mx-auto mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
