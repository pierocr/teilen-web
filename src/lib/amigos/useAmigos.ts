"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { useCallback, useEffect, useState } from "react";
import { Amigo, fetchAmigos } from "./api";

type State = { amigos: Amigo[]; loading: boolean; error: string | null };

export function useAmigos() {
  const { token, status } = useAuth();
  const [state, setState] = useState<State>({ amigos: [], loading: true, error: null });

  const load = useCallback(async () => {
    if (!token || status !== "authenticated") {
      setState({ amigos: [], loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetchAmigos(token);
      setState({ amigos: res.data ?? [], loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar tus amigos";
      setState({ amigos: [], loading: false, error: message });
    }
  }, [token, status]);

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status, load]);

  return { ...state, refresh: load };
}
