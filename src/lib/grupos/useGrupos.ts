"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { fetchGrupos, Grupo } from "./api";

type State = {
  grupos: Grupo[];
  loading: boolean;
  error: string | null;
};

export function useGrupos() {
  const { token, status } = useAuth();
  const [state, setState] = useState<State>({ grupos: [], loading: true, error: null });

  const load = useCallback(async () => {
    if (!token || status !== "authenticated") {
      setState({ grupos: [], loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetchGrupos(token);
      setState({ grupos: res.data ?? [], loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar los grupos";
      setState({ grupos: [], loading: false, error: message });
    }
  }, [token, status]);

  useEffect(() => {
    if (status === "authenticated") {
      load();
    }
  }, [status, load]);

  return {
    grupos: state.grupos,
    loading: state.loading,
    error: state.error,
    refresh: load,
  };
}
