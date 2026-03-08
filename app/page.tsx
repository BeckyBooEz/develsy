import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Pagína de inicio Develsy</h1>
      <Link className="bg-sky-500" href={"/Becky"}>BeckyBooEz</Link>
    </main>
  );
}
