import { fmt } from "../lib/utils";

// ── Tabla ISR Anual Art. 152 (2024 / 2025 — mismos valores) ───────────────────
const TABLA_ISR_ANUAL: Array<{
  limiteInferior: number;
  limiteSuperior: number;
  cuotaFija: number;
  porcentaje: number;
}> = [
  { limiteInferior: 0.01,         limiteSuperior: 8_952.49,       cuotaFija: 0.00,          porcentaje: 1.92  },
  { limiteInferior: 8_952.50,     limiteSuperior: 75_984.55,      cuotaFija: 171.88,         porcentaje: 6.40  },
  { limiteInferior: 75_984.56,    limiteSuperior: 133_536.07,     cuotaFija: 4_461.94,       porcentaje: 10.88 },
  { limiteInferior: 133_536.08,   limiteSuperior: 155_229.80,     cuotaFija: 10_723.55,      porcentaje: 16.00 },
  { limiteInferior: 155_229.81,   limiteSuperior: 185_852.57,     cuotaFija: 14_194.54,      porcentaje: 17.92 },
  { limiteInferior: 185_852.58,   limiteSuperior: 374_837.88,     cuotaFija: 19_682.13,      porcentaje: 21.36 },
  { limiteInferior: 374_837.89,   limiteSuperior: 590_795.99,     cuotaFija: 60_049.40,      porcentaje: 23.52 },
  { limiteInferior: 590_796.00,   limiteSuperior: 1_127_926.84,   cuotaFija: 110_842.74,     porcentaje: 30.00 },
  { limiteInferior: 1_127_926.85, limiteSuperior: 1_503_902.46,   cuotaFija: 271_981.99,     porcentaje: 32.00 },
  { limiteInferior: 1_503_902.47, limiteSuperior: 4_511_707.37,   cuotaFija: 392_294.17,     porcentaje: 34.00 },
  { limiteInferior: 4_511_707.38, limiteSuperior: Infinity,       cuotaFija: 1_414_947.85,   porcentaje: 35.00 },
];

interface CalcISR {
  baseGravable: number;
  limiteInferior: number;
  excedente: number;
  porcentaje: number;
  isrMarginal: number;
  cuotaFija: number;
  isrAnual: number;
  saldo: number;
  esSaldoAFavor: boolean;
}

function calcularISRAnual(baseGravable: number, isrRetenido: number): CalcISR {
  const rango = TABLA_ISR_ANUAL.find(
    (r) => baseGravable >= r.limiteInferior && baseGravable <= r.limiteSuperior
  ) ?? TABLA_ISR_ANUAL[TABLA_ISR_ANUAL.length - 1];

  const excedente    = baseGravable - rango.limiteInferior;
  const isrMarginal  = excedente * (rango.porcentaje / 100);
  const isrAnual     = isrMarginal + rango.cuotaFija;
  const saldo        = isrRetenido - isrAnual;

  return {
    baseGravable,
    limiteInferior: rango.limiteInferior,
    excedente,
    porcentaje:     rango.porcentaje,
    isrMarginal,
    cuotaFija:      rango.cuotaFija,
    isrAnual,
    saldo:          Math.abs(saldo),
    esSaldoAFavor:  saldo >= 0,
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  totalGravado: number;  // solo ingresos gravados (base real del ISR)
  totalISR: number;      // ISR retenido por el patrón
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function AmarreTable({ totalGravado, totalISR }: Props) {
  const c = calcularISRAnual(totalGravado, totalISR);

  const pasos = [
    {
      label: "Base gravable acumulada",
      value: fmt(c.baseGravable),
      note: "Total de ingresos gravados del año (excluye exentos)",
      color: "text-white",
    },
    {
      label: `Límite inferior del rango (${c.porcentaje}%)`,
      value: `- ${fmt(c.limiteInferior)}`,
      note: "Límite inferior de tu rango en la tabla Art. 152",
      color: "text-zinc-400",
    },
    {
      label: "Excedente del límite inferior",
      value: fmt(c.excedente),
      note: "Base gravable menos el límite inferior",
      color: "text-zinc-300",
    },
    {
      label: `ISR marginal (excedente × ${c.porcentaje}%)`,
      value: fmt(c.isrMarginal),
      note: "Impuesto sobre el excedente",
      color: "text-orange-400",
    },
    {
      label: "Cuota fija del rango",
      value: `+ ${fmt(c.cuotaFija)}`,
      note: "Monto fijo por estar en este rango",
      color: "text-orange-400",
    },
    {
      label: "ISR anual que debías pagar",
      value: fmt(c.isrAnual),
      note: "ISR marginal + cuota fija (Art. 152)",
      color: "text-white",
      highlight: true,
    },
    {
      label: "ISR retenido por tu patrón",
      value: fmt(totalISR),
      note: "Lo que acumulaste en retenciones durante el año",
      color: "text-blue-400",
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-5">

      <div>
        <h2 className="text-sm font-semibold text-zinc-300">
          🧾 Amarre para Declaración Anual
        </h2>
        <p className="text-zinc-600 text-xs mt-0.5">
          Cálculo con tabla Art. 152 LISR (2024 / 2025)
        </p>
      </div>

      {/* Pasos del cálculo */}
      <div className="space-y-1">
        {pasos.map((paso, i) => (
          <div
            key={paso.label}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg
              ${paso.highlight
                ? "bg-zinc-800 border border-zinc-700"
                : i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800/30"
              }`}
          >
            <div>
              <p className="text-zinc-300 text-sm">{paso.label}</p>
              <p className="text-zinc-600 text-xs">{paso.note}</p>
            </div>
            <span className={`font-bold text-sm tabular-nums ${paso.color}`}>
              {paso.value}
            </span>
          </div>
        ))}
      </div>

      {/* Resultado final */}
      <div className={`rounded-xl px-4 py-4 flex items-center justify-between
        ${c.esSaldoAFavor
          ? "bg-emerald-950/50 border border-emerald-700"
          : "bg-red-950/50 border border-red-700"
        }`}>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider mb-0.5
            ${c.esSaldoAFavor ? "text-emerald-400" : "text-red-400"}`}>
            {c.esSaldoAFavor ? "✅ Saldo a favor" : "⚠️ Saldo a cargo"}
          </p>
          <p className={`text-xs ${c.esSaldoAFavor ? "text-emerald-300/70" : "text-red-300/70"}`}>
            {c.esSaldoAFavor
              ? "El SAT te devuelve esta diferencia"
              : "Deberás pagar esta diferencia al SAT"}
          </p>
        </div>
        <span className={`text-2xl font-bold ${c.esSaldoAFavor ? "text-emerald-400" : "text-red-400"}`}>
          {fmt(c.saldo)}
        </span>
      </div>

      <p className="text-zinc-600 text-xs">
        💡 Este es un estimado <strong className="text-zinc-500">sin deducciones personales</strong> (médicos,
        colegiaturas, etc.). Si agregas deducciones, tu saldo a favor puede ser mayor.
      </p>
    </div>
  );
}
