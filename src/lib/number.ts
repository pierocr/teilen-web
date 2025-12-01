// src/lib/number.ts
// Utilidades de número inspiradas en la app móvil (CLP sin decimales).

/** Convierte strings o números a número entero CLP, tolerando separadores . , y espacios. */
export function toClpNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value !== "string") return 0;

  const trimmed = value.trim();
  if (!trimmed) return 0;

  const sinEspacios = trimmed.replace(/\s+/g, "");
  const milesPattern = /^-?\d{1,3}(?:[.,]\d{3})+$/;
  const decimalPattern = /^-?\d+(?:[.,]\d+)?$/;

  if (milesPattern.test(sinEspacios)) {
    const n = Number(sinEspacios.replace(/[.,]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  if (decimalPattern.test(sinEspacios)) {
    const n = Number(sinEspacios.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }

  const soloDigitos = sinEspacios.replace(/\D/g, "");
  const n = Number(soloDigitos);
  return Number.isFinite(n) ? n : 0;
}

export function formatClp(value: number): string {
  const n = Number(value || 0);
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}
