import { fmt } from "../lib/utils";

interface Props {
  totalSueldos: number;
}

export default function Banner400k({ totalSueldos }: Props) {
  const supera = totalSueldos > 400_000;

  return (
    <div className={`rounded-xl px-5 py-4 flex items-center justify-between
      ${supera
        ? "bg-amber-950/50 border border-amber-700"
        : "bg-emerald-950/50 border border-emerald-800"
      }`}>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider mb-0.5
          ${supera ? "text-amber-400" : "text-emerald-400"}`}>
          {supera
            ? "⚠ Supera $400,000 — Obligado a declarar"
            : "✅ No supera $400,000"}
        </p>
        <p className={`text-xs ${supera ? "text-amber-300/70" : "text-emerald-300/70"}`}>
          {supera
            ? "Debes presentar tu Declaración Anual 2024 ante el SAT"
            : "Podrías no estar obligado (revisa otros supuestos)"}
        </p>
      </div>
      <span className={`text-2xl font-bold ${supera ? "text-amber-400" : "text-emerald-400"}`}>
        {fmt(totalSueldos)}
      </span>
    </div>
  );
}
