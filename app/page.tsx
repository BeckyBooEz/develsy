export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 text-sm rounded-md bg-slate-200 text-slate-700">
          Mantenimiento
        </span>

        <h1 className="mt-6 text-4xl font-semibold text-slate-900">
          Develsy
        </h1>

        <p className="mt-3 text-slate-600">
          Nuestro sitio web se encuentra actualmente en mantenimiento.
        </p>

        <p className="mt-1 text-slate-500">
          Estaremos de vuelta pronto.
        </p>

        <div className="mt-10 text-sm text-slate-400">
          © {new Date().getFullYear()} Develsy
        </div>
      </div>
    </main>
  );
}