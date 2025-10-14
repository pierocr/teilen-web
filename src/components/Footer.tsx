export function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-black/60">© {new Date().getFullYear()} Teilen</p>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-emerald-700">Privacidad</a>
          <a href="#" className="hover:text-emerald-700">Términos</a>
          <a href="#" className="hover:text-emerald-700">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}
