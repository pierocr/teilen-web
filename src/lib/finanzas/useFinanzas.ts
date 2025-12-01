"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { useCallback, useEffect, useState } from "react";
import { fetchFinanzasPersonales, ResumenFinanzas } from "./api";

type State = {
  resumen: ResumenFinanzas | null;
  loading: boolean;
  error: string | null;
};

export function useFinanzas(mes?: string) {
  const { token, status } = useAuth();
  const [state, setState] = useState<State>({ resumen: null, loading: true, error: null });

  const load = useCallback(async () => {
    if (!token || status !== "authenticated") {
      setState({ resumen: null, loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetchFinanzasPersonales(token, mes);
      setState({ resumen: res.data?.resumen || null, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar tus finanzas personales";
      setState({ resumen: null, loading: false, error: message });
    }
  }, [token, status, mes]);

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status, load]);

  return { ...state, refresh: load };
}
