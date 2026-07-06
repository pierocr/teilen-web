"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { defineCustomElements } from "ionicons/loader";
import { useGastos } from "@/lib/gastos/useGastos";
import type { Gasto } from "@/lib/gastos/api";
import {
  fetchGrupoInfo,
  fetchGrupoParticipantes,
  type GrupoInfo,
  type GrupoParticipante,
} from "@/lib/grupos/detalle";
import { formatClp, toClpNumber } from "@/lib/number";
import { cn } from "@/lib/utils";

type DetailState = {
  grupo: GrupoInfo | null;
  participantes: GrupoParticipante[];
  loading: boolean;
  error: string | null;
};

export default function GrupoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const grupoId = useMemo(() => Number(params?.id ?? NaN), [params?.id]);
  const [incluirPagados, setIncluirPagados] = useState(false);
  const [state, setState] = useState<DetailState>({
    grupo: null,
    participantes: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    void defineCustomElements(window);
  }, []);

  const { gastos, loading: loadingGastos, error: gastosError, refresh: refreshGastos } = useGastos(
    Number.isFinite(grupoId) ? grupoId : null,
    { incluirPagados }
  );

  const loadDetail = useCallback(async () => {
    if (!Number.isFinite(grupoId)) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [grupo, participantes] = await Promise.all([
        fetchGrupoInfo(grupoId),
        fetchGrupoParticipantes(grupoId),
      ]);
      setState({
        grupo,
        participantes: Array.isArray(participantes) ? participantes : [],
        loading: false,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar el grupo";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [grupoId]);

  useEffect(() => {
    if (!Number.isFinite(grupoId)) {
      router.replace("/app/grupos");
      return;
    }

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) void loadDetail();
    });

    return () => {
      cancelled = true;
    };
  }, [grupoId, loadDetail, router]);

  const gastosActivos = useMemo(() => gastos.filter((gasto) => !gasto.saldado && !gasto.pagado), [gastos]);
  const saldoActual = useMemo(() => calculateCurrentBalance(gastosActivos), [gastosActivos]);
  const groupedGastos = useMemo(() => groupExpensesByMonth(gastos), [gastos]);
  const grupoNombre = state.grupo?.nombre || "Grupo";
  const moneda = state.grupo?.moneda || "CLP";
  const saldoLabel = saldoActual > 0 ? "Debes" : saldoActual < 0 ? "Te deben" : "Saldado";
  const saldoTone = saldoActual > 0 ? "negative" : saldoActual < 0 ? "positive" : "neutral";

  const refreshAll = () => {
    void loadDetail();
    void refreshGastos();
  };

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-xl shadow-slate-200">
        <div className="relative isolate px-5 py-6 sm:px-7 lg:p-8">
          <div aria-hidden className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <Avatar name={grupoNombre} src={state.grupo?.imagen || null} size="lg" />
              <div className="min-w-0">
                <Link
                  href="/app"
                  className="mb-3 inline-flex cursor-pointer items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 transition hover:bg-white/20"
                >
                  Volver al inicio
                </Link>
                <h1 className="truncate text-3xl font-black tracking-tight sm:text-4xl">{grupoNombre}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  {state.grupo?.descripcion || `${moneda} · ${state.participantes.length} participantes`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                <input
                  type="checkbox"
                  checked={incluirPagados}
                  onChange={(e) => setIncluirPagados(e.target.checked)}
                  className="h-4 w-4 accent-emerald-500"
                />
                Ver saldados
              </label>
              <button
                type="button"
                onClick={refreshAll}
                className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="relative mt-6 rounded-3xl border border-white/15 bg-white px-5 py-4 text-slate-950 shadow-lg sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Tu saldo actual</p>
              {loadingGastos ? (
                <div className="mt-3 h-9 w-48 animate-pulse rounded-xl bg-slate-100" />
              ) : (
                <p
                  className={cn(
                    "mt-1 text-3xl font-black sm:text-4xl",
                    saldoTone === "negative" && "text-rose-500",
                    saldoTone === "positive" && "text-emerald-700",
                    saldoTone === "neutral" && "text-slate-900"
                  )}
                >
                  {saldoLabel} {formatClp(Math.abs(saldoActual))}
                </p>
              )}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 sm:mt-0 sm:text-right">
              <p>{gastosActivos.length} gastos activos en el cálculo</p>
              <p className="text-xs text-slate-500">La lista de abajo explica este saldo.</p>
            </div>
          </div>
        </div>
      </section>

      {(state.error || gastosError) && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error || gastosError}
        </div>
      )}

      <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel title="Gastos" description={incluirPagados ? "Incluye gastos saldados" : "Gastos activos que forman tu saldo actual"}>
          {loadingGastos ? (
            <LoadingRows />
          ) : groupedGastos.length > 0 ? (
            <div className="space-y-6">
              {groupedGastos.map((group) => (
                <div key={group.key}>
                  <h3 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-500">{group.label}</h3>
                  <div className="space-y-2">
                    {group.items.map((gasto) => (
                      <ExpenseRow key={gasto.id} gasto={gasto} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Sin gastos para mostrar" text="No hay gastos registrados con el filtro actual." />
          )}
        </Panel>

        <Panel title="Participantes" description={`${state.participantes.length} personas en este grupo`}>
          {state.loading ? (
            <LoadingRows />
          ) : state.participantes.length > 0 ? (
            <div className="space-y-2">
              {state.participantes.map((participante) => (
                <ParticipantCard key={participante.id} participante={participante} />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin participantes" text="No encontramos participantes activos para este grupo." />
          )}
        </Panel>
      </section>
    </div>
  );
}

function ParticipantCard({ participante }: { participante: GrupoParticipante }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3">
      <Avatar name={participante.nombre} src={participante.imagen_perfil || null} />
      <div className="min-w-0">
        <h3 className="truncate text-sm font-black text-slate-950">{participante.nombre}</h3>
        <p className="text-xs font-semibold text-slate-500">
          {participante.rol || "miembro"}
          {participante.es_ficticio ? " · invitado" : ""}
        </p>
      </div>
    </article>
  );
}

function ExpenseRow({ gasto }: { gasto: Gasto }) {
  const saldado = Boolean(gasto.saldado || gasto.pagado);
  const relation = saldado ? "Saldado" : getExpenseRelationLabel(gasto);
  const relationAmount = getExpenseRelationAmount(gasto);
  const paidByCurrentUser = gasto.relacion_usuario === "a_favor";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className={cn("grid gap-3 px-4 py-3 sm:grid-cols-[110px_1fr_auto] sm:items-center", saldado ? "border-l-4 border-slate-200" : paidByCurrentUser ? "border-l-4 border-emerald-500" : "border-l-4 border-rose-400")}>
        <p className="text-sm font-black text-slate-700">{formatShortDate(gasto.fecha_gasto || gasto.creado_en)}</p>
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
            <ExpenseIcon name={gasto.icono} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-slate-950">{gasto.descripcion}</h3>
            <p className="truncate text-sm font-semibold text-slate-500">
              {paidByCurrentUser ? "Pagaste" : `${gasto.pagado_por_nombre || `Usuario ${gasto.pagado_por}`} pagó`} {formatClp(gasto.monto)}
            </p>
            {(gasto.recurrente || gasto.pago_en_cuotas || gasto.es_plantilla) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {gasto.recurrente && <Chip>Recurrente</Chip>}
                {gasto.pago_en_cuotas && <Chip>En cuotas</Chip>}
                {gasto.es_plantilla && <Chip>Plantilla</Chip>}
              </div>
            )}
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p
            className={cn(
              "text-sm font-black",
              saldado
                ? "text-slate-500"
                : gasto.relacion_usuario === "a_favor"
                  ? "text-emerald-700"
                  : "text-rose-500"
            )}
          >
            {relation}
          </p>
          <p
            className={cn(
              "text-xl font-black",
              saldado
                ? "text-slate-500"
                : gasto.relacion_usuario === "a_favor"
                  ? "text-emerald-700"
                  : "text-rose-500"
            )}
          >
            {formatClp(relationAmount)}
          </p>
        </div>
      </div>
    </article>
  );
}

function ExpenseIcon({ name }: { name?: string | null }) {
  const iconName = normalizeIoniconName(name);

  if (!iconName) {
    return <span aria-hidden>💸</span>;
  }

  return <ion-icon name={iconName} aria-hidden="true" class="text-[24px] text-slate-600" />;
}

function Avatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "md" | "lg" }) {
  const dimensions = size === "lg" ? "h-16 w-16 rounded-3xl" : "h-11 w-11 rounded-2xl";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className={cn("shrink-0 overflow-hidden bg-emerald-100 ring-1 ring-black/5", dimensions)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-black text-emerald-800">
          {initials || "T"}
        </div>
      )}
    </div>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{children}</span>;
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
      <p className="font-black text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-14 animate-pulse rounded-2xl bg-slate-100" />
      ))}
    </div>
  );
}

function formatShortDate(value?: string | null) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function formatMonth(value?: string | null) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" }).format(date);
}

function normalizeIoniconName(value?: string | null) {
  const normalized = value?.trim().toLowerCase().replace(/_/g, "-");
  if (!normalized) return null;
  return /^[a-z0-9-]+$/.test(normalized) ? normalized : null;
}

function getExpenseRelationAmount(gasto: Gasto) {
  if (gasto.relacion_usuario === "a_favor") {
    return toClpNumber(gasto.monto_prestado ?? gasto.monto_usuario ?? 0);
  }

  if (gasto.relacion_usuario === "debes") {
    return toClpNumber(gasto.monto_usuario ?? 0);
  }

  return toClpNumber(gasto.monto_usuario ?? 0);
}

function getExpenseRelationLabel(gasto: Gasto) {
  if (gasto.relacion_usuario === "a_favor") return "Prestaste";
  if (gasto.relacion_usuario === "debes") return "Debes";
  return "Sin participación";
}

function calculateCurrentBalance(gastos: Gasto[]) {
  return gastos.reduce((balance, gasto) => {
    const amount = getExpenseRelationAmount(gasto);
    if (gasto.relacion_usuario === "a_favor") return balance - amount;
    if (gasto.relacion_usuario === "debes") return balance + amount;
    return balance;
  }, 0);
}

function groupExpensesByMonth(gastos: Gasto[]) {
  const groups = new Map<string, { key: string; label: string; items: Gasto[]; time: number }>();

  gastos.forEach((gasto) => {
    const rawDate = gasto.fecha_gasto || gasto.creado_en || "";
    const date = new Date(rawDate);
    const time = Number.isNaN(date.getTime()) ? 0 : date.getTime();
    const key = Number.isNaN(date.getTime()) ? "sin-fecha" : `${date.getFullYear()}-${date.getMonth()}`;
    const existing = groups.get(key);

    if (existing) {
      existing.items.push(gasto);
      existing.time = Math.max(existing.time, time);
      return;
    }

    groups.set(key, {
      key,
      label: formatMonth(rawDate),
      items: [gasto],
      time,
    });
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => getExpenseTime(b) - getExpenseTime(a)),
    }))
    .sort((a, b) => b.time - a.time);
}

function getExpenseTime(gasto: Gasto) {
  const date = new Date(gasto.fecha_gasto || gasto.creado_en || "");
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}
