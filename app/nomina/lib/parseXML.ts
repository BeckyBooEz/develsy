import { Registro, Percepcion, Deduccion, NOMBRE_PERCEPCION } from "./types";
import { NS_CFDI, NS_NOMINA, queryNS, queryAllNS } from "./utils";

export function parseXML(text: string): Omit<Registro, "archivo"> | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");

  if (doc.querySelector("parsererror")) return null;

  // ── Comprobante ────────────────────────────────────────────────────────────
  const comprobante = queryNS(doc, NS_CFDI, "Comprobante");
  if (!comprobante) return null;

  const tipo = comprobante.getAttribute("TipoDeComprobante");
  if (tipo && tipo !== "N") return null;

  const fecha = comprobante.getAttribute("Fecha") ?? "";
  const mes   = fecha ? new Date(fecha).getMonth() : 0;

  // ── Emisor ─────────────────────────────────────────────────────────────────
  const emisorNode = queryNS(doc, NS_CFDI, "Emisor");
  const emisor = emisorNode?.getAttribute("Nombre") ?? "Emisor desconocido";

  // ── Nómina ─────────────────────────────────────────────────────────────────
  const nomina = queryNS(doc, NS_NOMINA, "Nomina");
  if (!nomina) return null;

  // ── Percepciones ───────────────────────────────────────────────────────────
  const percepcionesNode = queryNS(doc, NS_NOMINA, "Percepciones");

  const totalSueldos = parseFloat(
    percepcionesNode?.getAttribute("TotalSueldos") ?? "0"
  );
  const totalGravado = parseFloat(
    percepcionesNode?.getAttribute("TotalGravado") ?? "0"
  );
  const totalExento = parseFloat(
    percepcionesNode?.getAttribute("TotalExento") ?? "0"
  );

  // Detalle de cada percepción
  const percepciones: Percepcion[] = percepcionesNode
    ? queryAllNS(percepcionesNode, NS_NOMINA, "Percepcion").map((p) => ({
        tipo:     p.getAttribute("TipoPercepcion") ?? "000",
        concepto: p.getAttribute("Concepto") ??
                  NOMBRE_PERCEPCION[p.getAttribute("TipoPercepcion") ?? ""] ??
                  "Percepción",
        gravado:  parseFloat(p.getAttribute("ImporteGravado") ?? "0"),
        exento:   parseFloat(p.getAttribute("ImporteExento")  ?? "0"),
      }))
    : [];

  // ── Deducciones ────────────────────────────────────────────────────────────
  const deduccionesNode = queryNS(doc, NS_NOMINA, "Deducciones");

  const deduccionesRaw: Deduccion[] = deduccionesNode
    ? queryAllNS(deduccionesNode, NS_NOMINA, "Deduccion").map((d) => ({
        tipo:    d.getAttribute("TipoDeduccion") ?? "000",
        concepto: d.getAttribute("Concepto") ?? "Deducción",
        importe:  parseFloat(d.getAttribute("Importe") ?? "0"),
      }))
    : [];

  // ISR: TipoDeduccion="002"
  let totalISR = deduccionesRaw
    .filter((d) => d.tipo === "002")
    .reduce((s, d) => s + d.importe, 0);

  // Fallback al atributo TotalImpuestosRetenidos
  if (totalISR === 0 && deduccionesNode) {
    totalISR = parseFloat(
      deduccionesNode.getAttribute("TotalImpuestosRetenidos") ?? "0"
    );
  }

  return {
    fecha,
    mes,
    emisor,
    totalSueldos,
    totalGravado,
    totalExento,
    totalISR,
    percepciones,
    deducciones: deduccionesRaw,
  };
}
