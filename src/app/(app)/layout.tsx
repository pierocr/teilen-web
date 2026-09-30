import { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { PrivateLayoutShell } from "@/components/private/PrivateLayoutShell";
import { getCurrentProfile, getSupabaseAccessToken } from "@/lib/auth/server-session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AppRootLayout({ children }: { children: ReactNode }) {
  const [user, { user: authUser }] = await Promise.all([
    getCurrentProfile(),
    getSupabaseAccessToken(),
  ]);
  if (!user) redirect("/login");

  const isAdmin = authUser?.app_metadata?.role === "admin";

  return (
    <AuthProvider>
      <AuthGuard>
        <PrivateLayoutShell isAdmin={isAdmin}>{children}</PrivateLayoutShell>
      </AuthGuard>
    </AuthProvider>
  );
}
