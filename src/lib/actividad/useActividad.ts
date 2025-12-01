"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { fetchActividad, fetchActividadResumen, ActividadItem, ActividadResumen } from "./api";

type State = {
  resumen: ActividadResumen | null;
  items: ActividadItem[];
  loading: boolean;
  error: string | null;
};

export function useActividad() {
  const { token, status } = useAuth();
  const [state, setState] = useState<State>({ resumen: null, items: [], loading: true, error: null });

  const load = useCallback(async () => {
    if (!token || status !== "authenticated") {
      setState({ resumen: null, items: [], loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [resumen, items] = await Promise.all([
        fetchActividadResumen(token),
        fetchActividad(token),
      ]);
      setState({ resumen, items: items ?? [], loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar tu actividad";
      setState({ resumen: null, items: [], loading: false, error: message });
    }
  }, [token, status]);

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status, load]);

  return { ...state, refresh: load };
}
