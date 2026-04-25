"use client";

import { useState, useCallback } from "react";

interface Registro {
  archivo: string;
  fecha: string;
  mes: number;
  totalSueldos: number;
  totalISR: number;
  emisor: string;
}

interface ResumenMes {
  nombre: string;
  sueldos: number;
  isr: number;
  cfdi: number;
}

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

const NS_CFDI   = "http://www.sat.gob.mx/cfd/4";
const NS_NOMINA = "http://www.sat.gob.mx/nomina12";

// ── helpers ────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(n);
}

function queryNS(root: Document | Element, ns: string, localName: string): Element | null {
  const col = root.getElementsByTagNameNS(ns, localName);
  if (col.length > 0) return col[0];
  const wild = root.getElementsByTagNameNS("*", localName);
  return wild.length > 0 ? wild[0] : null;
}

function queryAllNS(root: Document | Element, ns: string, localName: string): Element[] {
  const col = root.getElementsByTagNameNS(ns, localName);
  if (col.length > 0) return Array.from(col);
  return Array.from(root.getElementsByTagNameNS("*", localName));
}

function parseXML(text: string): Omit<Registro, "archivo"> | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");

  if (doc.querySelector("parsererror")) return null;

  // Comprobante
  const comprobante = queryNS(doc, NS_CFDI, "Comprobante");
  if (!comprobante) return null;

  // Solo tipo Nómina
  const tipo = comprobante.getAttribute("TipoDeComprobante");
  if (tipo && tipo !== "N") return null;

  const fecha = comprobante.getAttribute("Fecha") ?? "";
  const mes   = fecha ? new Date(fecha).getMonth() : 0;

  // Emisor
  const emisorNode = queryNS(doc, NS_CFDI, "Emisor");
  const emisor = emisorNode?.getAttribute("Nombre") ?? "Emisor desconocido";

  // Nómina
  const nomina = queryNS(doc, NS_NOMINA, "Nomina");
  if (!nomina) return null;

  // TotalSueldos viene de nomina12:Percepciones → atributo TotalSueldos
  const percepciones = queryNS(doc, NS_NOMINA, "Percepciones");
  const totalSueldos = parseFloat(
    percepciones?.getAttribute("TotalSueldos") ??
    nomina.getAttribute("TotalPercepciones") ??
    "0"
  );

  // ISR: nomina12:Deduccion con TipoDeduccion="002"
  let totalISR = 0;
  const deducciones = queryNS(doc, NS_NOMINA, "Deducciones");
  if (deducciones) {
    const deduccionNodes = queryAllNS(deducciones, NS_NOMINA, "Deduccion");
    deduccionNodes.forEach((d) => {
      if (d.getAttribute("TipoDeduccion") === "002") {
        totalISR += parseFloat(d.getAttribute("Importe") ?? "0");
      }
    });
    // Fallback al atributo TotalImpuestosRetenidos
    if (totalISR === 0) {
      totalISR = parseFloat(
        deducciones.getAttribute("TotalImpuestosRetenidos") ?? "0"
      );
    }
  }

  return { fecha, mes, totalSueldos, totalISR, emisor };
}

// ── componente ─────────────────────────────────────────────────────────────────

export default function NominaAnalyzer() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [errores, setErrores]     = useState<string[]>([]);
  const [dragging, setDragging]   = useState(false);

  const procesarArchivos = useCallback((files: FileList | null) => {
    if (!files) return;
    const nuevosErrores: string[] = [];

    const promesas = Array.from(files).map(
      (file) =>
        new Promise<Registro | null>((res) => {
          if (!file.name.endsWith(".xml")) {
            nuevosErrores.push(`${file.name}: no es un XML`);
            return res(null);
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            const resultado = parseXML(text);
            if (!resultado) {
              nuevosErrores.push(`${file.name}: no es un CFDI de nómina válido`);
              return res(null);
            }
            res({ ...resultado, archivo: file.name });
          };
          reader.readAsText(file, "UTF-8");
        })
    );

    Promise.all(promesas).then((resultados) => {
      const validos = resultados.filter((r): r is Registro => r !== null);
      setRegistros((prev) =>
        [...prev, ...validos].sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        )
      );
      setErrores((prev) => [...prev, ...nuevosErrores]);
    });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      procesarArchivos(e.dataTransfer.files);
    },
    [procesarArchivos]
  );

  const porMes: ResumenMes[] = MESES.map((nombre, idx) => {
    const delMes = registros.filter((r) => r.mes === idx);
    return {
      nombre,
      sueldos: delMes.reduce((s, r) => s + r.totalSueldos, 0),
      isr:     delMes.reduce((s, r) => s + r.totalISR, 0),
      cfdi:    delMes.length,
    };
  }).filter((m) => m.cfdi > 0);

  const totalSueldos = registros.reduce((s, r) => s + r.totalSueldos, 0);
  const totalISR     = registros.reduce((s, r) => s + r.totalISR, 0);
  const supera400k   = totalSueldos > 400_000;

  const limpiar = () => { setRegistros([]); setErrores([]); };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">

      <header className="border-b border-zinc-800 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Analizador de Nóminas SAT
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Carga tus CFDIs XML · Todo se procesa localmente
          </p>
        </div>
        {registros.length > 0 && (
          <button
            onClick={limpiar}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors border border-zinc-700 hover:border-red-800 px-3 py-1.5 rounded"
          >
            Limpiar todo
          </button>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
            ${dragging
              ? "border-emerald-500 bg-emerald-950/30"
              : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
            }`}
        >
          <input
            type="file"
            multiple
            accept=".xml"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => procesarArchivos(e.target.files)}
          />
          <div className="text-4xl mb-3">Ez</div>
          <p className="text-zinc-300 font-semibold text-sm">
            Arrastra tus XMLs aquí o haz clic para seleccionarlos
          </p>
          <p className="text-zinc-600 text-xs mt-1">
            SAT → Factura electrónica → Consulta de CFDI → Tipo: Nómina → 2025
          </p>
        </div>

        {/* Errores */}
        {errores.length > 0 && (
          <div className="bg-red-950/40 border border-red-800 rounded-lg p-4 space-y-1">
            <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              ⚠ Archivos con problemas
            </p>
            {errores.map((e, i) => (
              <p key={i} className="text-red-300 text-xs">{e}</p>
            ))}
          </div>
        )}

        {registros.length > 0 && (
          <>
            {/* Banner 400k */}
            <div className={`rounded-xl px-5 py-4 flex items-center justify-between
              ${supera400k
                ? "bg-amber-950/50 border border-amber-700"
                : "bg-emerald-950/50 border border-emerald-800"
              }`}>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5
                  ${supera400k ? "text-amber-400" : "text-emerald-400"}`}>
                  {supera400k
                    ? "⚠ Supera $400,000 — Obligado a declarar"
                    : "✅ No supera $400,000"}
                </p>
                <p className={`text-xs ${supera400k ? "text-amber-300/70" : "text-emerald-300/70"}`}>
                  {supera400k
                    ? "Debes presentar tu Declaración Anual 2024 ante el SAT"
                    : "Podrías no estar obligado (revisa otros supuestos)"}
                </p>
              </div>
              <span className={`text-2xl font-bold ${supera400k ? "text-amber-400" : "text-emerald-400"}`}>
                {fmt(totalSueldos)}
              </span>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Ingresos",     value: fmt(totalSueldos), color: "text-white" },
                { label: "Total ISR Retenido", value: fmt(totalISR),     color: "text-blue-400" },
                { label: "CFDIs cargados",     value: registros.length,  color: "text-zinc-300" },
              ].map((card) => (
                <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">{card.label}</p>
                  <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Tabla por mes */}
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
                    <tr key={m.nombre}
                      className={`border-t border-zinc-800/60 hover:bg-zinc-800/40 transition-colors
                        ${i % 2 === 0 ? "" : "bg-zinc-900/50"}`}>
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
                    <td className="px-5 py-3 text-right font-bold text-zinc-400">{registros.length}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Amarre */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-zinc-300 mb-4">Amarre para Declaración Anual</h2>
              <div className="space-y-3">
                {[
                  { label: "Ingresos acumulados",    value: fmt(totalSueldos), note: "Base antes de deducciones personales" },
                  { label: "ISR retenido por patrón", value: fmt(totalISR),    note: "Lo que ya pagaste durante el año" },
                  { label: "ISR calculado anual",    value: "— SAT lo calcula", note: "Tabla anual de ISR en la declaración" },
                  { label: "Saldo a favor / cargo",  value: "— Resultado final", note: "ISR retenido menos ISR calculado" },
                ].map((row) => (
                  <div key={row.label}
                    className="flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0">
                    <div>
                      <p className="text-zinc-300 text-sm">{row.label}</p>
                      <p className="text-zinc-600 text-xs">{row.note}</p>
                    </div>
                    <span className="text-white font-bold text-sm">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-600 text-xs pt-4">
                Lleva estos números al portal del SAT y agrega deducciones personales para obtener el saldo final.
              </p>
            </div>
          </>
        )}

        {registros.length === 0 && errores.length === 0 && (
          <div className="text-center py-12 text-zinc-600 text-sm">
            <p>Aún no has cargado ningún XML.</p>
            <p className="text-xs mt-1">Descárgalos del SAT y arrástralos arriba.</p>
          </div>
        )}
      </main>
    </div>
  );
}
