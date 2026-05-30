import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-col gap-3">
      <h1 className="text-3xl">Pagína de inicio Develsy</h1>
      <div className="text-2xl bg-purple-300 text-cyan-600">
        <Link className="underline" href={"/beckybooez"}>Arturo Miranda</Link>
      </div>
    </main>
  );
}
