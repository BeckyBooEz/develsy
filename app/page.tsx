import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Pagína de inicio Develsy</h1>
      <Link className="text-red-300" href="/spotifytop">Spotify Top</Link>
    </main>
  );
}
