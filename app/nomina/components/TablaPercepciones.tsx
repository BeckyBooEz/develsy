import { ResumenTipoPercepcion } from "../lib/types";
import { fmt } from "../lib/utils";

interface Props {
  percepciones: ResumenTipoPercepcion[];
}

export default function TablaPercepciones({ percepciones }: Props) {
  if (percepciones.length === 0) return null;

  const totalGravado = percepciones.reduce((s, p) => s + p.gravado, 0);
  const totalExento  = percepciones.reduce((s, p) => s + p.exento,  0);
  const totalGeneral = percepciones.reduce((s, p) => s + p.total,   0);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-300">Desglose por tipo de percepción</h2>
        <p className="text-zinc-600 text-xs mt-0.5">
          Acumulado de todos los CFDIs cargados
        </p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wider">
            <th className="px-5 py-3 text-left">Tipo</th>
            <th className="px-5 py-3 text-left">Concepto</th>
            <th className="px-5 py-3 text-right">Gravado</th>
            <th className="px-5 py-3 text-right">Exento</th>
            <th className="px-5 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {percepciones.map((p, i) => (
            <tr
              key={p.tipo}
              className={`border-t border-zinc-800/60 hover:bg-zinc-800/40 transition-colors
                ${i % 2 === 0 ? "" : "bg-zinc-900/50"}`}
            >
              <td className="px-5 py-3">
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                  {p.tipo}
                </span>
              </td>
              <td className="px-5 py-3 text-zinc-200">{p.concepto}</td>
              <td className="px-5 py-3 text-right text-orange-400">{fmt(p.gravado)}</td>
              <td className="px-5 py-3 text-right text-emerald-400">{fmt(p.exento)}</td>
              <td className="px-5 py-3 text-right text-white font-medium">{fmt(p.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-700 bg-zinc-800/60">
            <td className="px-5 py-3 font-bold text-zinc-200" colSpan={2}>TOTAL</td>
            <td className="px-5 py-3 text-right font-bold text-orange-400">{fmt(totalGravado)}</td>
            <td className="px-5 py-3 text-right font-bold text-emerald-400">{fmt(totalExento)}</td>
            <td className="px-5 py-3 text-right font-bold text-white">{fmt(totalGeneral)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
