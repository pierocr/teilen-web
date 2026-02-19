
"use client";

export const runtime = "edge";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth/auth-provider";

function LoginForm() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithApple, status, isAuthenticating, error } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/app");
    }
  }, [status, router]);

  useEffect(() => {
    setIsClient(true);
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    setIsAppleDevice(/(iPhone|iPad|iPod|Macintosh|Mac OS X)/i.test(ua));
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    try {
      await login({ correo, password });
      router.replace("/app");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos iniciar sesión";
      setLocalError(message);
    }
  };

  const handleGoogle = async () => {
    setLocalError(null);
    await loginWithGoogle();
  };

  const handleApple = async () => {
    setLocalError(null);
    await loginWithApple();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Acceso seguro</p>
            <h1 className="text-2xl font-bold text-slate-900">Inicia sesión en Teilen</h1>
            <p className="text-sm text-slate-600">Usa tu mismo correo y contraseña de la app móvil.</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            Volver
          </Link>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-800" htmlFor="correo">
              Correo
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none ring-emerald-100 focus:border-emerald-300 focus:ring-2"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none ring-emerald-100 focus:border-emerald-300 focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          {(localError || error) && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {localError || error}
            </p>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAuthenticating ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>O continuar con</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {isClient && isAppleDevice ? (
          <button
            type="button"
            onClick={handleApple}
            disabled={isAuthenticating}
            className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAuthenticating ? (
              "Conectando..."
            ) : (
              <>
                <span className="text-lg font-semibold">Apple</span>
                <span className="text-sm">Continuar con Apple</span>
              </>
            )}
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleGoogle}
          disabled={isAuthenticating}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAuthenticating ? (
            "Conectando..."
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#fbc02d"
                  d="M43.611 20.083H42V20H24v8h11.303C33.884 32.912 29.37 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.754 6.053 29.118 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"
                />
                <path
                  fill="#e53935"
                  d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 14 24 14c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.754 6.053 29.118 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.304 0 10.081-2.03 13.66-5.339l-6.305-5.323C29.318 34.441 26.778 35.5 24 35.5c-5.344 0-9.852-3.413-11.469-8.173l-6.522 5.027C8.313 38.979 15.541 44 24 44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611 20.083H42V20H24v8h11.303c-.955 2.794-2.889 5.152-5.642 6.734l.001-.001 6.305 5.323C34.896 41.908 44 36 44 24c0-1.341-.138-2.651-.389-3.917z"
                />
              </svg>
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        <p className="mt-6 text-xs text-slate-500">
          OAuth usa Supabase igual que en la app móvil; si tu cuenta no existe la creamos con tus datos
          verificados.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
