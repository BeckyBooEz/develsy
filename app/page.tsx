import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Pagína de inicio Develsy</h1>
      <div>
        <Link className="underline" href={"/spotifytop"}>Spotify Top</Link>
      </div>
      <div>
        <Link className="underline" href={"/beckybooez"}>BeckyBooEz</Link>
      </div>
      <div>
        <Link className="underline" href={"/recentlyplayed"}>RecientesSpotify</Link>
      </div>
      <div>
        <Link className="underline" href={"/nomina"}>Analizador de Nomina</Link>
      </div>
    </main>
  );
}
