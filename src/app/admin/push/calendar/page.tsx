"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api-client";

type Campaign = { id: string; name: string; category: string; status: string; scheduled_at: string; audience_definition: { type?: string }; translations: Record<string, { title: string }> };

export default function PushCalendarPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]); const [error, setError] = useState<string | null>(null);
  useEffect(() => { apiRequest<Campaign[]>("/admin/push/calendar").then(setCampaigns).catch((e) => setError(e.message)); }, []);
  return <main className="min-h-screen bg-slate-50 px-4 py-8"><div className="mx-auto max-w-5xl"><Link className="text-sm font-semibold text-emerald-700" href="/admin/push">← Push Marketing</Link><h1 className="mt-4 text-3xl font-semibold">Calendario de campañas</h1>{error ? <p className="mt-6 rounded border border-rose-200 bg-white p-4 text-rose-800">{error}</p> : <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Fecha</th><th className="px-5 py-3">Campaña</th><th className="px-5 py-3">Estado</th><th className="px-5 py-3">Audiencia</th></tr></thead><tbody>{campaigns.map((campaign) => <tr key={campaign.id} className="border-t border-slate-100"><td className="px-5 py-3">{new Intl.DateTimeFormat("es-CL", { dateStyle: "full", timeStyle: "short" }).format(new Date(campaign.scheduled_at))}</td><td className="px-5 py-3"><Link className="font-semibold text-emerald-700" href={`/admin/push/campaigns/${campaign.id}`}>{campaign.name}</Link><p className="text-xs text-slate-500">{campaign.category} · {campaign.translations?.es?.title || "Sin copia"}</p></td><td className="px-5 py-3">{campaign.status}</td><td className="px-5 py-3">{campaign.audience_definition?.type || "all"}</td></tr>)}{!campaigns.length && <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">No hay campañas programadas en los próximos 45 días.</td></tr>}</tbody></table></div>}</div></main>;
}
