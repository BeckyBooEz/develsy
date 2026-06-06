import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="flex-col text-center">

        <h1 className="mt-6 text-4xl font-semibold text-slate-900">
          Develsy
        </h1>

        <Link href="/ArturoMiranda">Arturo Miranda</Link>

        <div className="mt-10 text-sm text-slate-400">
          © {new Date().getFullYear()} Develsy
        </div>
      </div>
    </main >
  );
}