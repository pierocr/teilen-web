export const PUSH_CAMPAIGN_CATEGORIES = [
  { value: "feature_discovery", label: "Descubrir funciones" },
  { value: "premium", label: "Premium" },
  { value: "education", label: "Educación financiera" },
  { value: "engagement", label: "Uso y participación" },
  { value: "reactivation", label: "Reactivación" },
  { value: "personal_finance", label: "Finanzas personales" },
  { value: "group_expenses", label: "Gastos compartidos" },
  { value: "reminders", label: "Recordatorios" },
  { value: "savings", label: "Ahorro e inversión" },
  { value: "reports", label: "Reportes" },
  { value: "receipt_ai", label: "Escaneo de boletas" },
  { value: "seasonal", label: "Temporada" },
  { value: "promotional", label: "Promociones" },
  { value: "cyberday", label: "CyberDay" },
] as const;

const categoryLabels = new Map<string, string>(PUSH_CAMPAIGN_CATEGORIES.map((category) => [category.value, category.label]));

export function pushCategoryLabel(category: string | null | undefined) {
  return categoryLabels.get(String(category || "")) || category || "Sin categoría";
}
