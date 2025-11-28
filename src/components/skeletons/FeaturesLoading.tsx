export function FeaturesLoading() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-28 fhd:py-32">
      <div className="mb-10 sm:mb-14">
        <div className="h-6 w-32 bg-slate-200 rounded-full animate-pulse mb-4" />
        <div className="h-12 w-96 bg-slate-200 rounded-lg animate-pulse" />
      </div>

      <div className="grid items-start gap-10 fhd:gap-12 lg:grid-cols-2">
        {/* Phone mockup skeleton */}
        <div className="relative lg:sticky lg:top-28">
          <div className="mx-auto w-[280px] h-[560px] bg-slate-200 rounded-[2.4rem] animate-pulse" role="status" aria-label="Cargando vista previa" />
        </div>

        {/* Features list skeleton */}
        <div className="grid gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-5 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-slate-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-48 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
