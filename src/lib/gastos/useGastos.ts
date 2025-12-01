"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { fetchGastosByGrupo, Gasto } from "./api";

type State = {
  gastos: Gasto[];
  loading: boolean;
  error: string | null;
};

export function useGastos(grupoId: number | null, opts: { incluirPagados?: boolean } = {}) {
  const { token, status } = useAuth();
  const [state, setState] = useState<State>({ gastos: [], loading: true, error: null });
  const includePaidFlag = Boolean(opts.incluirPagados);

  const load = useCallback(async () => {
    if (!token || status !== "authenticated" || !grupoId) {
      setState({ gastos: [], loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetchGastosByGrupo(token, grupoId, { incluirPagados: includePaidFlag });
      setState({ gastos: Array.isArray(res) ? res : [], loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar los gastos";
      setState({ gastos: [], loading: false, error: message });
    }
  }, [token, status, grupoId, includePaidFlag]);

  useEffect(() => {
    if (status === "authenticated" && grupoId) {
      load();
    }
  }, [status, grupoId, includePaidFlag, load]);

  return {
    gastos: state.gastos,
    loading: state.loading,
    error: state.error,
    refresh: load,
  };
}
