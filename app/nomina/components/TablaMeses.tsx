import { ResumenMes } from "../lib/types";
import { fmt } from "../lib/utils";

interface Props {
  porMes: ResumenMes[];
  totalSueldos: number;
  totalISR: number;
  totalCFDIs: number;
}

export default function TablaMeses({ porMes, totalSueldos, totalISR, totalCFDIs }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-300">Desglose mes a mes</h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wider">
            <th className="px-5 py-3 text-left">Mes</th>
            <th className="px-5 py-3 text-right">Ingresos</th>
            <th className="px-5 py-3 text-right">ISR Retenido</th>
            <th className="px-5 py-3 text-right">CFDIs</th>
          </tr>
        </thead>
        <tbody>
          {porMes.map((m, i) => (
            <tr
              key={m.nombre}
              className={`border-t border-zinc-800/60 hover:bg-zinc-800/40 transition-colors
                ${i % 2 === 0 ? "" : "bg-zinc-900/50"}`}
            >
              <td className="px-5 py-3 text-zinc-200">{m.nombre}</td>
              <td className="px-5 py-3 text-right text-white font-medium">{fmt(m.sueldos)}</td>
              <td className="px-5 py-3 text-right text-blue-400">{fmt(m.isr)}</td>
              <td className="px-5 py-3 text-right text-zinc-500">{m.cfdi}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-700 bg-zinc-800/60">
            <td className="px-5 py-3 font-bold text-zinc-200">TOTAL</td>
            <td className="px-5 py-3 text-right font-bold text-white">{fmt(totalSueldos)}</td>
            <td className="px-5 py-3 text-right font-bold text-blue-400">{fmt(totalISR)}</td>
            <td className="px-5 py-3 text-right font-bold text-zinc-400">{totalCFDIs}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
