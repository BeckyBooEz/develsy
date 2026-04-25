export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const NS_CFDI   = "http://www.sat.gob.mx/cfd/4";
export const NS_NOMINA = "http://www.sat.gob.mx/nomina12";

export function fmt(n: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(n);
}

export function queryNS(
  root: Document | Element,
  ns: string,
  localName: string
): Element | null {
  const col = root.getElementsByTagNameNS(ns, localName);
  if (col.length > 0) return col[0];
  const wild = root.getElementsByTagNameNS("*", localName);
  return wild.length > 0 ? wild[0] : null;
}

export function queryAllNS(
  root: Document | Element,
  ns: string,
  localName: string
): Element[] {
  const col = root.getElementsByTagNameNS(ns, localName);
  if (col.length > 0) return Array.from(col);
  return Array.from(root.getElementsByTagNameNS("*", localName));
}
