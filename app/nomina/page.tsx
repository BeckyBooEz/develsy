"use client";

import { useState, useCallback } from "react";

import { Registro, ResumenMes, ResumenTipoPercepcion, NOMBRE_PERCEPCION } from "./lib/types";
import { MESES } from "./lib/utils";
import { parseXML } from "./lib/parseXML";

import DropZone          from "./components/DropZone";
import ErrorList         from "./components/ErrorList";
import Banner400k        from "./components/Banner400k";
import ResumenCards      from "./components/ResumenCards";
import TablaMeses        from "./components/TablaMeses";
import TablaPercepciones from "./components/TablaPercepciones";
import AmarreTable       from "./components/AmarreTable";

export default function NominaAnalyzer() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [errores, setErrores]     = useState<string[]>([]);

  // ── Procesar archivos ──────────────────────────────────────────────────────
  const procesarArchivos = useCallback((files: FileList) => {
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

  // ── Totales globales ───────────────────────────────────────────────────────
  const totalSueldos = registros.reduce((s, r) => s + r.totalSueldos, 0);
  const totalGravado = registros.reduce((s, r) => s + r.totalGravado, 0);
  const totalExento  = registros.reduce((s, r) => s + r.totalExento,  0);
  const totalISR     = registros.reduce((s, r) => s + r.totalISR,     0);

  // ── Agrupación por mes ─────────────────────────────────────────────────────
  const porMes: ResumenMes[] = MESES
    .map((nombre, idx) => {
      const delMes = registros.filter((r) => r.mes === idx);
      return {
        nombre,
        sueldos: delMes.reduce((s, r) => s + r.totalSueldos, 0),
        isr:     delMes.reduce((s, r) => s + r.totalISR,     0),
        cfdi:    delMes.length,
      };
    })
    .filter((m) => m.cfdi > 0);

  // ── Agrupación por tipo de percepción ──────────────────────────────────────
  const percepcionesMap = new Map<string, ResumenTipoPercepcion>();
  registros.forEach((r) => {
    r.percepciones.forEach((p) => {
      const existing = percepcionesMap.get(p.tipo);
      if (existing) {
        existing.gravado += p.gravado;
        existing.exento  += p.exento;
        existing.total   += p.gravado + p.exento;
      } else {
        percepcionesMap.set(p.tipo, {
          tipo:     p.tipo,
          concepto: NOMBRE_PERCEPCION[p.tipo] ?? p.concepto,
          gravado:  p.gravado,
          exento:   p.exento,
          total:    p.gravado + p.exento,
        });
      }
    });
  });
  const percepcionesPorTipo = Array.from(percepcionesMap.values()).sort(
    (a, b) => b.total - a.total
  );

  const hayDatos = registros.length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">

      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Analizador de Nóminas SAT
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Carga tus CFDIs XML · Todo se procesa localmente
          </p>
        </div>
        {hayDatos && (
          <button
            onClick={() => { setRegistros([]); setErrores([]); }}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors border border-zinc-700 hover:border-red-800 px-3 py-1.5 rounded"
          >
            Limpiar todo
          </button>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        <DropZone onFiles={procesarArchivos} />

        <ErrorList errores={errores} />

        {hayDatos && (
          <>
            <Banner400k totalSueldos={totalSueldos} />

            <ResumenCards
              totalSueldos={totalSueldos}
              totalGravado={totalGravado}
              totalExento={totalExento}
              totalISR={totalISR}
              totalCFDIs={registros.length}
            />

            <TablaMeses
              porMes={porMes}
              totalSueldos={totalSueldos}
              totalISR={totalISR}
              totalCFDIs={registros.length}
            />

            <TablaPercepciones percepciones={percepcionesPorTipo} />

            <AmarreTable totalGravado={totalGravado} totalISR={totalISR} />
          </>
        )}

        {!hayDatos && errores.length === 0 && (
          <div className="text-center py-12 text-zinc-600 text-sm">
            <p>Aún no has cargado ningún XML.</p>
            <p className="text-xs mt-1">Descárgalos del SAT y arrástralos arriba.</p>
          </div>
        )}
      </main>
    </div>
  );
}
