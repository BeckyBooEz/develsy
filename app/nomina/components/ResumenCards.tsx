import { fmt } from "../lib/utils";

interface Props {
  totalSueldos: number;
  totalGravado: number;
  totalExento: number;
  totalISR: number;
  totalCFDIs: number;
}

export default function ResumenCards({
  totalSueldos,
  totalGravado,
  totalExento,
  totalISR,
  totalCFDIs,
}: Props) {
  const cards = [
    { label: "Total Percepciones",  value: fmt(totalSueldos), color: "text-white" },
    { label: "Total Gravado",       value: fmt(totalGravado), color: "text-orange-400" },
    { label: "Total Exento",        value: fmt(totalExento),  color: "text-emerald-400" },
    { label: "ISR Retenido",        value: fmt(totalISR),     color: "text-blue-400" },
    { label: "CFDIs cargados",      value: totalCFDIs,        color: "text-zinc-300" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-500 text-xs mb-1 leading-tight">{card.label}</p>
          <p className={`text-base font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
