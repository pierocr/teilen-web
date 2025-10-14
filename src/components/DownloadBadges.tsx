export function DownloadBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#"
        className="btn-shine rounded-xl bg-black text-white px-4 py-2 text-sm shadow"
      >
        Descargar en App Store
      </a>
      <a
        href="#"
        className="rounded-xl border border-black/10 px-4 py-2 text-sm hover:bg-black/5"
      >
        Disponible en Google Play
      </a>
    </div>
  );
}
