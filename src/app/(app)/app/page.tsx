"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-provider";
import { useGrupos } from "@/lib/grupos/useGrupos";
import type { Grupo } from "@/lib/grupos/api";
import { useFinanzas } from "@/lib/finanzas/useFinanzas";
import type { TransaccionPersonal } from "@/lib/finanzas/api";
import { useDashboard } from "@/lib/dashboard/useDashboard";
import type { Notificacion } from "@/lib/dashboard/api";
import { toClpNumber, formatClp } from "@/lib/number";
import { cn } from "@/lib/utils";

const AVATAR_FALLBACK = "/logo_teilen.png";

export default function PrivateHome() {
  const { user } = useAuth();
  const gruposState = useGrupos();
  const finanzasState = useFinanzas();
  const dashboardState = useDashboard();

  const gruposTotals = useMemo(() => calculateGroupTotals(gruposState.grupos), [gruposState.grupos]);
  const finanzas = finanzasState.resumen;
  const ahorro = dashboardState.ahorros;
  const ahorroTotal = toClpNumber(ahorro?.total_ahorrado || 0);
  const ahorroObjetivo = toClpNumber(ahorro?.total_objetivo || 0);
  const ahorroFaltante = toClpNumber(ahorro?.total_faltante || 0);
  const ahorroProgress = ahorroObjetivo > 0 ? Math.min(100, (ahorroTotal / ahorroObjetivo) * 100) : 0;
  const personalIngreso = toClpNumber(finanzas?.ingreso_total || 0);
  const personalGasto = toClpNumber(finanzas?.gasto_total || 0);
  const personalPresupuesto = toClpNumber(finanzas?.presupuesto || 0);
  const personalDisponible = personalPresupuesto > 0 ? personalPresupuesto - personalGasto : personalIngreso - personalGasto;
  const personalProgressBase = personalPresupuesto > 0 ? personalPresupuesto : personalIngreso;
  const personalProgress =
    personalProgressBase > 0 ? Math.min(100, Math.max(0, (personalGasto / personalProgressBase) * 100)) : 0;
  const notifications = normalizeNotifications(dashboardState.notificaciones);
  const unreadNotifications = notifications.filter((item) => !item.leido).length;
  const groupsPreview = gruposState.grupos.slice(0, 8);
  const topTransactions = (finanzas?.transacciones || []).slice(0, 4);
  const anyLoading = gruposState.loading || finanzasState.loading || dashboardState.loading;
  const firstError = gruposState.error || finanzasState.error || dashboardState.error;
  const firstName = getFirstName(user?.nombre || user?.nombreCompleto || user?.correo || "Usuario");
  const balanceLabel = gruposTotals.balance === 0 ? "Todo al día" : gruposTotals.balanceFavor ? "A tu favor" : "Pendiente por pagar";
  const balancePrefix = gruposTotals.balance === 0 ? "" : gruposTotals.balanceFavor ? "+" : "-";

  const refreshAll = () => {
    void gruposState.refresh();
    void finanzasState.refresh();
    void dashboardState.refresh();
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-xl shadow-slate-200">
        <div className="relative isolate grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_0.82fr] lg:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-40 w-80 rounded-full bg-sky-400/10 blur-3xl"
          />

          <div className="relative flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={firstName} src={user?.imagen_perfil || null} size="lg" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Hola, {firstName}
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Tu cuenta Teilen
                </h1>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:mt-10">
              <HeroMetric label="Balance grupos" value={`${balancePrefix}${formatClp(gruposTotals.balance)}`} />
              <HeroMetric label="Gastos del mes" value={formatClp(personalGasto)} />
              <HeroMetric label="Ahorros" value={formatClp(ahorroTotal)} />
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-100">Balance de grupos</p>
                <p className="mt-2 text-4xl font-black tracking-tight">
                  {gruposState.loading ? "..." : `${balancePrefix}${formatClp(gruposTotals.balance)}`}
                </p>
                <p className="mt-1 text-sm text-slate-300">{balanceLabel}</p>
              </div>
              <button
                type="button"
                onClick={refreshAll}
                className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Actualizar
              </button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <CompactMetric label="Te deben" value={formatClp(gruposTotals.teDeben)} tone="positive" />
              <CompactMetric label="Debes" value={formatClp(gruposTotals.debes)} tone="warning" />
              <CompactMetric label="Grupos" value={gruposTotals.count} />
            </div>
            <BalanceSplit debes={gruposTotals.debes} teDeben={gruposTotals.teDeben} loading={gruposState.loading} />
          </div>
        </div>
      </section>

      {firstError && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {firstError}
        </div>
      )}

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Tus grupos" description="Entra a un grupo para ver su resumen, participantes, deudas y gastos." action={`${gruposTotals.count} activos`}>
          {gruposState.loading ? (
            <LoadingRows />
          ) : groupsPreview.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {groupsPreview.map((grupo) => (
                <GroupRow key={grupo.id} grupo={grupo} />
              ))}
            </div>
          ) : (
            <EmptyState title="No tienes grupos aún" text="Cuando crees tu primer grupo en la app, su resumen se verá aquí." />
          )}
          {gruposState.grupos.length > groupsPreview.length && (
            <Link
              href="/app/grupos"
              className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              Ver todos los grupos
            </Link>
          )}
        </Panel>
        <Panel
          title="Resumen de grupos"
          description="Lo mismo que la app usa para mostrar cuánto debes y cuánto te deben."
          action={anyLoading ? "Actualizando" : "Al día"}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Te deben" value={formatClp(gruposTotals.teDeben)} tone="positive" />
            <MetricCard label="Debes" value={formatClp(gruposTotals.debes)} tone="warning" />
            <MetricCard label="Pagado por ti" value={formatClp(gruposTotals.pagado)} />
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700">Distribución de saldo</span>
              <span className="text-slate-500">{gruposTotals.count} grupos activos</span>
            </div>
            <BalanceSplit debes={gruposTotals.debes} teDeben={gruposTotals.teDeben} loading={gruposState.loading} light />
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <ProfilePanel
          name={user?.nombre || user?.nombreCompleto || "Usuario Teilen"}
          email={user?.correo || "-"}
          phone={user?.telefono || null}
          city={user?.ciudad || null}
          country={user?.pais || null}
          avatar={user?.imagen_perfil || null}
          unread={unreadNotifications}
        />

        <Panel title="Movimientos personales" description="Últimos registros del mes actual">
          {finanzasState.loading ? (
            <LoadingRows />
          ) : topTransactions.length > 0 ? (
            <div className="space-y-2">
              {topTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin movimientos este mes" text="Tus ingresos y gastos personales aparecerán aquí cuando los registres en la app." />
          )}
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel title="Finanzas personales" description={formatMonth(finanzas?.mes)}>
          {finanzasState.loading ? (
            <LoadingRows />
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <MetricCard label="Ingresos" value={formatClp(personalIngreso)} tone="positive" />
                <MetricCard label="Gastos" value={formatClp(personalGasto)} tone="warning" />
              </div>
              <ProgressBlock
                label={personalPresupuesto > 0 ? "Uso del presupuesto" : "Gasto sobre ingresos"}
                value={personalProgress}
                left={formatClp(personalGasto)}
                right={personalProgressBase > 0 ? formatClp(personalProgressBase) : "Sin base"}
                tone={personalProgress > 85 ? "warning" : "positive"}
              />
              <InsightRow label="Disponible estimado" value={formatClp(personalDisponible)} highlight={personalDisponible >= 0} />
            </>
          )}
        </Panel>

        <Panel title="Ahorros" description="Metas e inversiones registradas">
          {dashboardState.loading ? (
            <LoadingRows />
          ) : (
            <>
              <MetricCard label="Total ahorrado" value={formatClp(ahorroTotal)} tone="positive" />
              <ProgressBlock
                label="Progreso hacia tus metas"
                value={ahorroProgress}
                left={formatClp(ahorroTotal)}
                right={ahorroObjetivo > 0 ? formatClp(ahorroObjetivo) : "Sin objetivo"}
                tone="positive"
              />
              <div className="grid grid-cols-3 gap-2">
                <MiniStat label="Activas" value={Number(ahorro?.metas_activas || 0)} />
                <MiniStat label="Completadas" value={Number(ahorro?.metas_completadas || 0)} />
                <MiniStat label="Faltante" value={formatShortCurrency(ahorroFaltante)} />
              </div>
            </>
          )}
        </Panel>

        <Panel title="Notificaciones" description="Novedades recientes" action={`${unreadNotifications} sin leer`}>
          {dashboardState.loading ? (
            <LoadingRows />
          ) : notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <NotificationRow key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin notificaciones pendientes" text="Cuando llegue una novedad sobre tus grupos o gastos, aparecerá aquí." />
          )}
        </Panel>
      </section>

    </div>
  );
}

function calculateGroupTotals(grupos: Grupo[]) {
  return grupos.reduce(
    (acc, grupo) => {
      const neto = Math.round(toClpNumber(grupo.deuda_neta ?? 0));
      const debes = Math.max(neto, 0);
      const teDeben = Math.max(-neto, 0);

      acc.count += 1;
      acc.gastado += toClpNumber(grupo.total_gastado);
      acc.pagado += toClpNumber(grupo.total_pagado);
      acc.recibido += toClpNumber(grupo.total_recibido);
      acc.debes += debes;
      acc.teDeben += teDeben;
      return acc;
    },
    {
      count: 0,
      gastado: 0,
      pagado: 0,
      recibido: 0,
      debes: 0,
      teDeben: 0,
      get balance() {
        return Math.abs(this.teDeben - this.debes);
      },
      get balanceFavor() {
        return this.teDeben > this.debes;
      },
    }
  );
}

function normalizeNotifications(items: Notificacion[]) {
  return [...items]
    .map((item) => ({
      id: item.id,
      titulo: item.titulo || item.tipo || "Notificación",
      cuerpo: item.cuerpo || item.descripcion || item.mensaje || "",
      leido: Boolean(item.leido ?? item.read ?? item.is_read),
      created_at: item.created_at || item.creado_en || item.fecha || null,
    }))
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
}

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "Usuario";
}

function formatMonth(month?: string | null) {
  if (!month) return "Mes actual";
  const [year, monthNumber] = month.split("-").map(Number);
  if (!year || !monthNumber) return month;
  return new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" }).format(new Date(year, monthNumber - 1, 1));
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(date);
}

function formatShortCurrency(value: number) {
  if (Math.abs(value) >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(Math.round(value));
}

function Avatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "md" | "lg" }) {
  const dimensions = size === "lg" ? "h-16 w-16" : "h-11 w-11";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className={cn("shrink-0 overflow-hidden rounded-2xl bg-emerald-100 ring-1 ring-black/5", dimensions)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-base font-black text-emerald-800">
          {initials || "T"}
        </div>
      )}
    </div>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{label}</p>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function CompactMetric({ label, value, tone }: { label: string; value: string | number; tone?: "positive" | "warning" }) {
  return (
    <div className="rounded-2xl bg-white/10 px-3 py-3">
      <p className="text-xs text-slate-300">{label}</p>
      <p className={cn("mt-1 truncate text-sm font-black text-white", tone === "positive" && "text-emerald-100", tone === "warning" && "text-amber-100")}>
        {value}
      </p>
    </div>
  );
}

function ProfilePanel({
  name,
  email,
  phone,
  city,
  country,
  avatar,
  unread,
}: {
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  avatar: string | null;
  unread: number;
}) {
  return (
    <Panel title="Perfil" description="Datos principales de tu cuenta">
      <div className="flex items-center gap-4">
        <Avatar name={name} src={avatar || AVATAR_FALLBACK} size="lg" />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-black text-slate-950">{name}</h2>
          <p className="truncate text-sm text-slate-500">{email}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        <InfoRow label="Teléfono" value={phone || "No informado"} />
        <InfoRow label="Ubicación" value={[city, country].filter(Boolean).join(", ") || "No informada"} />
        <InfoRow label="Notificaciones" value={unread > 0 ? `${unread} sin leer` : "Al día"} />
      </div>
    </Panel>
  );
}

function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {action && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {action}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "positive" | "warning";
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p
        className={cn(
          "mt-2 truncate text-xl font-black text-slate-950",
          tone === "positive" && "text-emerald-700",
          tone === "warning" && "text-amber-700"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-3 text-center">
      <p className="text-lg font-black text-slate-950">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="truncate font-bold text-slate-900">{value}</span>
    </div>
  );
}

function InsightRow({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white">
      <span className="text-sm text-slate-300">{label}</span>
      <span className={cn("font-black", highlight ? "text-emerald-200" : "text-amber-200")}>{value}</span>
    </div>
  );
}

function ProgressBlock({
  label,
  value,
  left,
  right,
  tone,
}: {
  label: string;
  value: number;
  left: string;
  right: string;
  tone: "positive" | "warning";
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold text-slate-500">{Math.round(value)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", tone === "positive" ? "bg-emerald-500" : "bg-amber-500")}
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function BalanceSplit({
  debes,
  teDeben,
  loading,
  light,
}: {
  debes: number;
  teDeben: number;
  loading: boolean;
  light?: boolean;
}) {
  const total = Math.max(debes, 0) + Math.max(teDeben, 0);
  const debesPct = total > 0 ? (debes / total) * 100 : 50;
  const teDebenPct = total > 0 ? (teDeben / total) * 100 : 50;

  return (
    <div className="mt-4">
      <div className={cn("flex h-3 overflow-hidden rounded-full", light ? "bg-slate-200" : "bg-white/10")}>
        {loading ? (
          <div className="h-full w-full animate-pulse bg-slate-300/60" />
        ) : (
          <>
            <div className="h-full bg-amber-400" style={{ width: `${debesPct}%` }} />
            <div className="h-full bg-emerald-400" style={{ width: `${teDebenPct}%` }} />
          </>
        )}
      </div>
      <div className={cn("mt-2 flex justify-between text-xs font-semibold", light ? "text-slate-500" : "text-slate-300")}>
        <span>Debes {formatClp(debes)}</span>
        <span>Te deben {formatClp(teDeben)}</span>
      </div>
    </div>
  );
}

function GroupRow({ grupo }: { grupo: Grupo }) {
  const neto = Math.round(toClpNumber(grupo.deuda_neta ?? 0));
  const debes = Math.max(neto, 0);
  const teDeben = Math.max(-neto, 0);
  const status =
    debes > 0
      ? { label: "Debes", value: formatClp(debes), className: "text-amber-700 bg-amber-50" }
      : teDeben > 0
      ? { label: "Te deben", value: formatClp(teDeben), className: "text-emerald-700 bg-emerald-50" }
      : { label: "Sin deudas", value: "Al día", className: "text-slate-600 bg-slate-50" };

  return (
    <Link
      href={`/app/grupos/${grupo.id}`}
      className="group flex cursor-pointer items-center justify-between gap-4 py-3 outline-none transition hover:bg-slate-50 focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={grupo.nombre} src={grupo.imagen} />
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-slate-950 group-hover:text-emerald-700">{grupo.nombre}</h3>
          <p className="text-xs font-semibold text-slate-500">
            {grupo.moneda || "CLP"} · Gastado {formatClp(toClpNumber(grupo.total_gastado))}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className={cn("rounded-full px-3 py-1 text-right text-xs font-black", status.className)}>
          <span>{status.label}</span>
          <span className="ml-1">{status.value}</span>
        </div>
        <span className="hidden text-xs font-bold text-slate-400 group-hover:text-emerald-700 sm:inline">
          Ver detalle
        </span>
      </div>
    </Link>
  );
}

function NotificationRow({ notification }: { notification: ReturnType<typeof normalizeNotifications>[number] }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {!notification.leido && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
            <h3 className="truncate text-sm font-black text-slate-950">{notification.titulo}</h3>
          </div>
          {notification.cuerpo && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{notification.cuerpo}</p>}
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400">{formatDate(notification.created_at)}</span>
      </div>
    </article>
  );
}

function TransactionRow({ transaction }: { transaction: TransaccionPersonal }) {
  const isIncome = transaction.tipo === "ingreso";

  return (
    <article className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-slate-950">{transaction.descripcion || transaction.categoria}</p>
        <p className="text-xs font-semibold text-slate-500">
          {transaction.categoria || "Sin categoría"} · {formatDate(transaction.fecha)}
        </p>
      </div>
      <span className={cn("shrink-0 text-sm font-black", isIncome ? "text-emerald-700" : "text-amber-700")}>
        {isIncome ? "+" : "-"}
        {formatClp(toClpNumber(transaction.monto))}
      </span>
    </article>
  );
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
