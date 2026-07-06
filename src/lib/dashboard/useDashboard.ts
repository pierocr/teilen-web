"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { useCallback, useEffect, useState } from "react";
import {
  AhorrosEstadisticas,
  Notificacion,
  ResumenDeudas,
  fetchAhorrosEstadisticas,
  fetchNotificaciones,
  fetchResumenDeudas,
} from "./api";

type DashboardState = {
  deudas: ResumenDeudas | null;
  ahorros: AhorrosEstadisticas | null;
  notificaciones: Notificacion[];
  loading: boolean;
  error: string | null;
};

export function useDashboard() {
  const { user, status } = useAuth();
  const userId = user?.id;
  const [state, setState] = useState<DashboardState>({
    deudas: null,
    ahorros: null,
    notificaciones: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    if (status !== "authenticated" || !userId) {
      setState({
        deudas: null,
        ahorros: null,
        notificaciones: [],
        loading: false,
        error: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [deudas, ahorrosResponse, notificaciones] = await Promise.all([
        fetchResumenDeudas(userId),
        fetchAhorrosEstadisticas(),
        fetchNotificaciones(),
      ]);

      setState({
        deudas,
        ahorros: ahorrosResponse.estadisticas,
        notificaciones: Array.isArray(notificaciones) ? notificaciones.slice(0, 5) : [],
        loading: false,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar el dashboard";
      setState({
        deudas: null,
        ahorros: null,
        notificaciones: [],
        loading: false,
        error: message,
      });
    }
  }, [status, userId]);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) void load();
    });

    return () => {
      cancelled = true;
    };
  }, [load, status]);

  return { ...state, refresh: load };
}
