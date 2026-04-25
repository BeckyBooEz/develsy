import { Registro } from "../lib/types";
import { fmt } from "../lib/utils";

// ── Tablas ISR periódicas 2024/2025 (Art. 96) ─────────────────────────────────

const TABLA_QUINCENAL = [
  { li: 0.01,       ls: 368.10,      cf: 0.00,      pct: 1.92  },
  { li: 368.11,     ls: 3_124.35,    cf: 7.05,      pct: 6.40  },
  { li: 3_124.36,   ls: 5_490.75,    cf: 183.45,    pct: 10.88 },
  { li: 5_490.76,   ls: 6_382.80,    cf: 441.00,    pct: 16.00 },
  { li: 6_382.81,   ls: 7_641.90,    cf: 583.65,    pct: 17.92 },
  { li: 7_641.91,   ls: 15_412.80,   cf: 809.25,    pct: 21.36 },
  { li: 15_412.81,  ls: 24_292.65,   cf: 2_469.15,  pct: 23.52 },
  { li: 24_292.66,  ls: 46_378.50,   cf: 4_557.75,  pct: 30.00 },
  { li: 46_378.51,  ls: 61_838.10,   cf: 11_183.40, pct: 32.00 },
  { li: 61_838.11,  ls: 185_514.30,  cf: 16_130.55, pct: 34.00 },
  { li: 185_514.31, ls: Infinity,    cf: 58_180.35, pct: 35.00 },
];

const TABLA_MENSUAL = [
  { li: 0.01,        ls: 746.04,       cf: 0.00,       pct: 1.92  },
  { li: 746.05,      ls: 6_332.05,     cf: 14.32,      pct: 6.40  },
  { li: 6_332.06,    ls: 11_128.01,    cf: 371.83,     pct: 10.88 },
  { li: 11_128.02,   ls: 12_935.82,    cf: 893.63,     pct: 16.00 },
  { li: 12_935.83,   ls: 15_487.71,    cf: 1_182.88,   pct: 17.92 },
  { li: 15_487.72,   ls: 31_236.49,    cf: 1_640.18,   pct: 21.36 },
  { li: 31_236.50,   ls: 49_233.00,    cf: 5_004.12,   pct: 23.52 },
  { li: 49_233.01,   ls: 99_287.48,    cf: 9_236.89,   pct: 30.00 },
  { li: 99_287.49,   ls: 132_277.42,   cf: 24_235.80,  pct: 32.00 },
  { li: 132_277.43,  ls: 397_205.63,   cf: 34_794.84,  pct: 34.00 },
  { li: 397_205.64,  ls: Infinity,     cf: 124_913.46, pct: 35.00 },
];

const TABLA_SEMANAL = [
  { li: 0.01,       ls: 172.92,      cf: 0.00,      pct: 1.92  },
  { li: 172.93,     ls: 1_468.17,    cf: 3.32,      pct: 6.40  },
  { li: 1_468.18,   ls: 2_580.35,    cf: 86.27,     pct: 10.88 },
  { li: 2_580.36,   ls: 2_999.65,    cf: 207.27,    pct: 16.00 },
  { li: 2_999.66,   ls: 3_589.79,    cf: 274.38,    pct: 17.92 },
  { li: 3_589.80,   ls: 7_243.79,    cf: 380.26,    pct: 21.36 },
  { li: 7_243.80,   ls: 11_412.23,   cf: 1_160.42,  pct: 23.52 },
  { li: 11_412.24,  ls: 23_067.00,   cf: 2_141.22,  pct: 30.00 },
  { li: 23_067.01,  ls: 30_759.57,   cf: 5_638.32,  pct: 32.00 },
  { li: 30_759.58,  ls: 92_317.52,   cf: 8_100.38,  pct: 34.00 },
  { li: 92_317.53,  ls: Infinity,    cf: 29_013.84,  pct: 35.00 },
];

type Periodicidad = "quincenal" | "mensual" | "semanal";

// ── Helpers ───────────────────────────────────────────────────────────────────

function detectarPeriodicidad(registros: Registro[]): Periodicidad {
  // Solo usar nóminas ordinarias para detectar periodicidad
  const ordinarias = registros.filter((r) => r.tipoNomina === "O");
  if (ordinarias.length < 2) return "quincenal";
  const sorted = [...ordinarias].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
  const diffs: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const d =
      (new Date(sorted[i].fecha).getTime() - new Date(sorted[i - 1].fecha).getTime()) /
      (1000 * 60 * 60 * 24);
    diffs.push(d);
  }
  const promedio = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  if (promedio <= 9)  return "semanal";
  if (promedio <= 20) return "quincenal";
  return "mensual";
}

function getTabla(p: Periodicidad) {
  if (p === "mensual") return TABLA_MENSUAL;
  if (p === "semanal") return TABLA_SEMANAL;
  return TABLA_QUINCENAL;
}

function calcularISR(gravado: number, periodicidad: Periodicidad) {
  const tabla = getTabla(periodicidad);
  const rango = tabla.find((r) => gravado >= r.li && gravado <= r.ls)
    ?? tabla[tabla.length - 1];
  const excedente    = gravado - rango.li;
  const isrMarginal  = excedente * (rango.pct / 100);
  const isrCalculado = isrMarginal + rango.cf;
  return { isrCalculado, excedente, rango };
}

// ── Tipos internos ────────────────────────────────────────────────────────────

interface FilaPeriodo {
  fecha: string;
  tipoNomina: string;       // "O" = Ordinaria, "E" = Extraordinaria
  gravado: number;
  exento: number;
  totalSueldos: number;
  isrRetenido: number;
  // Solo en ordinarias:
  isrCalculado: number | null;
  diferencia:   number | null;
  excedente:    number | null;
  porcentaje:   number | null;
  cuotaFija:    number | null;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  registros:   Registro[];
  isrAnual:    number;   // ISR calculado con tabla anual Art. 152
  isrRetenido: number;   // Total ISR retenido por el patrón
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function TablaRetencionesPeriodicas({ registros, isrAnual, isrRetenido }: Props) {
  if (registros.length === 0) return null;

  const periodicidad = detectarPeriodicidad(registros);

  const LABEL: Record<Periodicidad, string> = {
    quincenal: "Quincenal",
    mensual:   "Mensual",
    semanal:   "Semanal",
  };

  // Construir filas — solo calcular ISR en ordinarias (TipoNomina="O")
  const filas: FilaPeriodo[] = registros.map((r) => {
    if (r.tipoNomina === "O" && r.totalGravado > 0) {
      const { isrCalculado, excedente, rango } = calcularISR(r.totalGravado, periodicidad);
      return {
        fecha:        r.fecha.slice(0, 10),
        tipoNomina:   r.tipoNomina,
        gravado:      r.totalGravado,
        exento:       r.totalExento,
        totalSueldos: r.totalSueldos,
        isrRetenido:  r.totalISR,
        isrCalculado,
        diferencia:   r.totalISR - isrCalculado,
        excedente,
        porcentaje:   rango.pct,
        cuotaFija:    rango.cf,
      };
    }
    // Nómina extraordinaria o sin gravado → no aplica tabla periódica
    return {
      fecha:        r.fecha.slice(0, 10),
      tipoNomina:   r.tipoNomina ?? "E",
      gravado:      r.totalGravado,
      exento:       r.totalExento,
      totalSueldos: r.totalSueldos,
      isrRetenido:  r.totalISR,
      isrCalculado: null,
      diferencia:   null,
      excedente:    null,
      porcentaje:   null,
      cuotaFija:    null,
    };
  });

  // Totales solo sobre ordinarias
  const ordinarias    = filas.filter((f) => f.isrCalculado !== null);
  const totGravado    = ordinarias.reduce((s, f) => s + f.gravado,          0);
  const totExento     = filas.reduce((s, f) => s + f.exento,                0);
  const totSueldos    = filas.reduce((s, f) => s + f.totalSueldos,          0);
  const totRetenido   = ordinarias.reduce((s, f) => s + f.isrRetenido,      0);
  const totCalculado  = ordinarias.reduce((s, f) => s + (f.isrCalculado!),  0);
  const totDiferencia = ordinarias.reduce((s, f) => s + (f.diferencia!),    0);

  const difColor = (dif: number | null) => {
    if (dif === null) return "text-zinc-600";
    if (Math.abs(dif) < 1) return "text-zinc-400";
    return dif > 0 ? "text-emerald-400" : "text-red-400";
  };

  const difLabel = (dif: number | null) => {
    if (dif === null) return "—";
    if (Math.abs(dif) < 1) return "Exacto";
    return dif > 0 ? `+${fmt(dif)}` : fmt(dif);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-300">
            📊 Análisis de Retenciones por Periodo
          </h2>
          <p className="text-zinc-600 text-xs mt-0.5">
            Periodicidad detectada:{" "}
            <span className="text-emerald-400 font-semibold">{LABEL[periodicidad]}</span>
            {" · "}Tabla Art. 96 LISR · Solo nóminas ordinarias (O)
          </p>
        </div>
      </div>

      {/* Header columnas */}
      <div className="px-5 py-2 bg-zinc-800/40 border-b border-zinc-800 grid grid-cols-9 gap-2 text-xs text-zinc-500 uppercase tracking-wider">
        <div>Fecha</div>
        <div className="text-center">Tipo</div>
        <div className="text-right">Total Percep.</div>
        <div className="text-right text-orange-400/70">Gravado</div>
        <div className="text-right text-emerald-400/70">Exento</div>
        <div className="text-right text-blue-400/70">ISR Retenido</div>
        <div className="text-right text-violet-400/70">ISR Calculado</div>
        <div className="text-right">% Rango</div>
        <div className="text-right">Diferencia</div>
      </div>

      {/* Filas */}
      <div className="divide-y divide-zinc-800/60">
        {filas.map((f, i) => (
          <div
            key={i}
            className={`px-5 py-3 grid grid-cols-9 gap-2 text-sm items-center
              ${f.tipoNomina === "E" ? "opacity-60 italic" : ""}
              ${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800/20"}
              hover:bg-zinc-800/50 transition-colors`}
          >
            <div className="text-zinc-400 text-xs font-mono">{f.fecha}</div>
            <div className="text-center">
              <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                f.tipoNomina === "O"
                  ? "bg-blue-900/40 text-blue-400"
                  : "bg-amber-900/40 text-amber-400"
              }`}>
                {f.tipoNomina === "O" ? "Ord" : "Ext"}
              </span>
            </div>
            <div className="text-right text-zinc-300 font-medium">{fmt(f.totalSueldos)}</div>
            <div className="text-right text-orange-400">{fmt(f.gravado)}</div>
            <div className="text-right text-emerald-400">{fmt(f.exento)}</div>
            <div className="text-right text-blue-400">{fmt(f.isrRetenido)}</div>
            <div className="text-right text-violet-400">
              {f.isrCalculado !== null ? fmt(f.isrCalculado) : <span className="text-zinc-600">N/A</span>}
            </div>
            <div className="text-right text-zinc-500 text-xs">
              {f.porcentaje !== null ? `${f.porcentaje}%` : "—"}
            </div>
            <div className={`text-right font-bold text-xs ${difColor(f.diferencia)}`}>
              {difLabel(f.diferencia)}
            </div>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="px-5 py-3 border-t-2 border-zinc-700 bg-zinc-800/60 grid grid-cols-9 gap-2 text-sm font-bold">
        <div className="col-span-2 text-zinc-200">TOTAL (ordinarias)</div>
        <div className="text-right text-white">{fmt(totSueldos)}</div>
        <div className="text-right text-orange-400">{fmt(totGravado)}</div>
        <div className="text-right text-emerald-400">{fmt(totExento)}</div>
        <div className="text-right text-blue-400">{fmt(totRetenido)}</div>
        <div className="text-right text-violet-400">{fmt(totCalculado)}</div>
        <div className="text-right text-zinc-500">—</div>
        <div className={`text-right text-xs ${difColor(totDiferencia)}`}>
          {difLabel(totDiferencia)}
        </div>
      </div>

      {/* Desglose del cálculo — solo ordinarias */}
      <div className="border-t border-zinc-800 px-5 py-4">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">
          Desglose del cálculo por periodo (nóminas ordinarias)
        </p>
        <div className="space-y-2">
          {filas.map((f, i) => {
            if (f.tipoNomina === "E") return (
              <div key={i} className="bg-amber-900/10 border border-amber-800/30 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 text-xs font-semibold">{f.fecha}</span>
                    <span className="text-amber-600 text-xs ml-2">— Nómina Extraordinaria (Aguinaldo / PTU / Bono)</span>
                  </div>
                  <span className="text-xs bg-amber-900/40 text-amber-400 px-2 py-0.5 rounded">
                    No aplica tabla periódica
                  </span>
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-x-6 text-xs text-zinc-600">
                  <span>Total: <span className="text-zinc-400">{fmt(f.totalSueldos)}</span></span>
                  <span>Exento: <span className="text-emerald-500">{fmt(f.exento)}</span></span>
                </div>
              </div>
            );

            return (
              <div key={i} className="bg-zinc-800/40 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-300 text-xs font-semibold">{f.fecha}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    Math.abs(f.diferencia!) < 1
                      ? "bg-zinc-700 text-zinc-400"
                      : f.diferencia! > 0
                      ? "bg-emerald-900/50 text-emerald-400"
                      : "bg-red-900/50 text-red-400"
                  }`}>
                    {Math.abs(f.diferencia!) < 1
                      ? "✓ Retención exacta"
                      : f.diferencia! > 0
                      ? `Retuvo ${fmt(f.diferencia!)} de más`
                      : `Retuvo ${fmt(Math.abs(f.diferencia!))} de menos`}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-xs text-zinc-500 font-mono">
                  <span>Gravado: <span className="text-orange-400">{fmt(f.gravado)}</span></span>
                  <span>Excedente: <span className="text-zinc-300">{fmt(f.excedente!)}</span></span>
                  <span>× {f.porcentaje}% + {fmt(f.cuotaFija!)}</span>
                  <span>= ISR: <span className="text-violet-400">{fmt(f.isrCalculado!)}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen final */}
      <div className={`mx-5 mb-5 rounded-xl px-4 py-4 flex items-center justify-between
        ${Math.abs(totDiferencia) < 1
          ? "bg-zinc-800 border border-zinc-700"
          : totDiferencia > 0
          ? "bg-emerald-950/50 border border-emerald-700"
          : "bg-red-950/50 border border-red-700"
        }`}>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${
            Math.abs(totDiferencia) < 1 ? "text-zinc-400"
            : totDiferencia > 0 ? "text-emerald-400" : "text-red-400"
          }`}>
            {Math.abs(totDiferencia) < 1
              ? "✓ Retenciones correctas"
              : totDiferencia > 0
              ? "✅ Tu patrón retuvo de más en nóminas ordinarias"
              : "⚠️ Tu patrón retuvo de menos en nóminas ordinarias"}
          </p>
          <p className="text-zinc-500 text-xs">
            {Math.abs(totDiferencia) < 1
              ? "Las retenciones coinciden con el cálculo de la tabla"
              : totDiferencia > 0
              ? "Diferencia a tu favor — se confirma en la declaración anual"
              : "Diferencia a cargo — puede ajustarse en la declaración anual"}
          </p>
        </div>
        <span className={`text-xl font-bold ${
          Math.abs(totDiferencia) < 1 ? "text-zinc-300"
          : totDiferencia > 0 ? "text-emerald-400" : "text-red-400"
        }`}>
          {Math.abs(totDiferencia) < 1 ? "—" : fmt(Math.abs(totDiferencia))}
        </span>
      </div>

      {/* ── Explicación: cómo entender los dos números ───────────────────── */}
      <div className="border-t border-zinc-800 mx-5 mb-5 pt-5 space-y-4">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
          💡 ¿Cómo entender estos dos resultados?
        </p>

        {/* Tabla de los dos cálculos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Periódico */}
          <div className={`rounded-xl p-4 border ${
            Math.abs(totDiferencia) < 1
              ? "bg-zinc-800/60 border-zinc-700"
              : totDiferencia > 0
              ? "bg-emerald-950/30 border-emerald-800/50"
              : "bg-red-950/30 border-red-800/50"
          }`}>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              📅 Retenciones quincenales (Art. 96)
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">ISR que debió retener</span>
                <span className="text-violet-400">{fmt(totCalculado)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ISR que sí retuvo</span>
                <span className="text-blue-400">{fmt(totRetenido)}</span>
              </div>
              <div className={`flex justify-between font-bold pt-1 border-t border-zinc-700 ${
                Math.abs(totDiferencia) < 1 ? "text-zinc-400"
                : totDiferencia > 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                <span>Diferencia</span>
                <span>{Math.abs(totDiferencia) < 1 ? "Exacto" : totDiferencia > 0 ? `+${fmt(totDiferencia)}` : fmt(totDiferencia)}</span>
              </div>
            </div>
            <p className="text-zinc-600 text-xs mt-2 leading-relaxed">
              Compara quincena por quincena usando la tabla Art. 96. Son <strong className="text-zinc-500">pagos provisionales</strong> — no es el cálculo definitivo.
            </p>
          </div>

          {/* Anual */}
          <div className={`rounded-xl p-4 border ${
            isrRetenido >= isrAnual
              ? "bg-emerald-950/30 border-emerald-800/50"
              : "bg-red-950/30 border-red-800/50"
          }`}>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              📋 Cálculo anual definitivo (Art. 152)
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">ISR anual que debías pagar</span>
                <span className="text-orange-400">{fmt(isrAnual)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ISR total retenido</span>
                <span className="text-blue-400">{fmt(isrRetenido)}</span>
              </div>
              <div className={`flex justify-between font-bold pt-1 border-t border-zinc-700 ${
                isrRetenido >= isrAnual ? "text-emerald-400" : "text-red-400"
              }`}>
                <span>{isrRetenido >= isrAnual ? "Saldo a favor" : "Saldo a cargo"}</span>
                <span>{fmt(Math.abs(isrRetenido - isrAnual))}</span>
              </div>
            </div>
            <p className="text-zinc-600 text-xs mt-2 leading-relaxed">
              Usa la tabla anual sobre el ingreso del <strong className="text-zinc-500">año completo</strong>. Este es el <strong className="text-zinc-500">número que importa</strong> para tu declaración.
            </p>
          </div>
        </div>

        {/* Explicación narrativa */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 space-y-2 text-xs text-zinc-400 leading-relaxed">
          <p>
            <span className="text-white font-semibold">¿Por qué pueden dar resultados distintos?</span>
          </p>
          <p>
            Tu patrón retiene quincena a quincena usando la <span className="text-violet-400">tabla periódica (Art. 96)</span> — trata cada pago de forma independiente. En tu caso, retuvo{" "}
            {Math.abs(totDiferencia) < 1
              ? "exactamente lo que indicaba la tabla quincenal"
              : totDiferencia < 0
              ? <span className="text-red-400 font-semibold">{fmt(Math.abs(totDiferencia))} de menos</span>
              : <span className="text-emerald-400 font-semibold">{fmt(totDiferencia)} de más</span>
            }{" "}
            comparado con lo que la tabla quincenal indica.
          </p>
          <p>
            Sin embargo, al final del año el SAT hace el cálculo <strong className="text-white">definitivo</strong> con la <span className="text-orange-400">tabla anual (Art. 152)</span> sobre todos tus ingresos acumulados. La tabla anual no es simplemente la quincenal × 26 — tiene rangos distintos que favorecen al contribuyente.
          </p>
          <p>
            Por eso, aunque tu patrón haya retenido{" "}
            {totDiferencia < 0
              ? "ligeramente de menos quincena a quincena"
              : "de más quincena a quincena"
            }{", "}
            al calcular el año completo resulta que{" "}
            {isrRetenido >= isrAnual
              ? <span className="text-emerald-400 font-semibold">retuvo más de lo que debías pagar → el SAT te devuelve {fmt(Math.abs(isrRetenido - isrAnual))}</span>
              : <span className="text-red-400 font-semibold">retuvo menos de lo que debías pagar → debes {fmt(Math.abs(isrRetenido - isrAnual))}</span>
            }.
          </p>
          <p className="text-zinc-500">
            💡 El número que debes llevar a tu declaración anual es el de la tabla Art. 152: <span className={`font-bold ${isrRetenido >= isrAnual ? "text-emerald-400" : "text-red-400"}`}>{isrRetenido >= isrAnual ? `saldo a favor de ${fmt(Math.abs(isrRetenido - isrAnual))}` : `saldo a cargo de ${fmt(Math.abs(isrRetenido - isrAnual))}`}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
