import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Pagína de inicio Develsy</h1>
      <div>
        <Link className="underline" href={"/Becky"}>BeckyBooEz</Link>
      </div>
      <div>
        <Link className="underline" href={"/SpotifyTop"}>Spotify Top</Link>
      </div>
    </main>
  );
}
