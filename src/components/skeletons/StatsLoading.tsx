export function StatsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[420px] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse"
          role="status"
          aria-label="Cargando estadísticas"
        >
          <div className="h-full w-full p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-8 w-24 bg-slate-200 rounded-lg" />
              <div className="h-12 w-32 bg-slate-200 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
