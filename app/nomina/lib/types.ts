// ── Tipos de percepción según SAT ─────────────────────────────────────────────
// https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1461173292895

export type TipoPercepcion =
  | "001" // Sueldos, Salarios  Rayas y Jornales
  | "002" // Gratificación Anual (Aguinaldo)
  | "003" // Horas Extra
  | "004" // Prima Dominical
  | "005" // Participación de los Trabajadores en las Utilidades PTU
  | "006" // Ingreso en Especie
  | "007" // Subsidio para el empleo (Reportar en nómina)
  | "008" // Reembolsos de Gastos Médicos Dentales y Hospitalarios
  | "009" // Fondo de ahorro
  | "010" // Caja de ahorro
  | "011" // Vales de Despensa
  | "012" // Vales de Restaurante
  | "013" // Vales de Gasolina
  | "014" // Vales de Ropa
  | "015" // Ayuda para Renta
  | "016" // Ayuda para Artículos Escolares
  | "017" // Ayuda para Anteojos
  | "018" // Ayuda para Transporte
  | "019" // Ayuda para Gastos de Funeral
  | "020" // Otros Ingresos por Salarios
  | "021" // Jubilaciones, Pensiones o Haberes de Retiro
  | "022" // Pagos por Separación
  | "023" // Seguro de retiro
  | "024" // Indemnizaciones
  | "025" // Reembolso por Funeral
  | "026" // Cuotas Sindicales Pagadas por el Patrón
  | "027" // Subsidios por Incapacidad
  | "028" // Becas para trabajadores y/o hijos
  | "029" // Horas Extra (exento)
  | "030" // Prima de Antigüedad
  | "031" // Pagos por Separación
  | "032" // Pagos Distintos a los Listados y que no Deben Considerarse como Ingreso por Sueldos
  | "033" // Viáticos (entregados como anticipo)
  | "034" // Viáticos (comprobados)
  | "035" // Fondo de ahorro (no deducible)
  | "036" // Subsidio Efectivamente Entregado que No Corresponde al Contribuyente
  | "037" // Remanente de Subsidio
  | "038" // Viáticos (no comprobados)
  | "039" // Otros ingresos asimilables a salarios
  | "040" // Jubilaciones, Pensiones o Haberes de Retiro en Parcialidades
  | "041" // Ingresos en acciones o títulos valor que representan bienes
  | "042" // Alimentación (exento)
  | "043" // Habitación (exento)
  | "044" // Premios por puntualidad o asistencia
  | "045" // Horas Extra (gravado)
  | "046" // Prima vacacional
  | "047" // Premio de productividad
  | string; // Otros

export const NOMBRE_PERCEPCION: Record<string, string> = {
  "001": "Sueldos y Salarios",
  "002": "Aguinaldo",
  "003": "Horas Extra",
  "004": "Prima Dominical",
  "005": "PTU",
  "006": "Ingreso en Especie",
  "009": "Fondo de Ahorro",
  "010": "Caja de Ahorro",
  "011": "Vales de Despensa",
  "012": "Vales de Restaurante",
  "013": "Vales de Gasolina",
  "014": "Vales de Ropa",
  "015": "Ayuda para Renta",
  "018": "Ayuda para Transporte",
  "021": "Jubilación / Pensión",
  "022": "Pagos por Separación",
  "024": "Indemnización",
  "027": "Subsidio por Incapacidad",
  "028": "Becas",
  "030": "Prima de Antigüedad",
  "046": "Prima Vacacional",
  "047": "Premio de Productividad",
};

// ── Interfaces principales ─────────────────────────────────────────────────────

export interface Percepcion {
  tipo: TipoPercepcion;
  concepto: string;
  gravado: number;
  exento: number;
}

export interface Deduccion {
  tipo: string;
  concepto: string;
  importe: number;
}

export interface Registro {
  archivo: string;
  fecha: string;
  mes: number;         // 0-based
  emisor: string;
  // Totales del nodo Percepciones
  totalSueldos: number;
  totalGravado: number;
  totalExento: number;
  // ISR retenido (TipoDeduccion 002)
  totalISR: number;
  // Detalle
  percepciones: Percepcion[];
  deducciones: Deduccion[];
}

export interface ResumenMes {
  nombre: string;
  sueldos: number;
  isr: number;
  cfdi: number;
}

export interface ResumenTipoPercepcion {
  tipo: string;
  concepto: string;
  gravado: number;
  exento: number;
  total: number;
}
