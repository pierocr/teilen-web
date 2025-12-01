"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-provider";

type Props = { children: ReactNode; redirectTo?: string };

export function AuthGuard({ children, redirectTo = "/login" }: Props) {
  const router = useRouter();
  const { status, isAuthenticating } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated" && !isAuthenticating) {
      router.replace(redirectTo);
    }
  }, [status, isAuthenticating, redirectTo, router]);

  if (status === "checking" || isAuthenticating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        Verificando sesión...
      </div>
    );
  }

  return <>{children}</>;
}
