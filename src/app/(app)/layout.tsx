import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { PrivateLayoutShell } from "@/components/private/PrivateLayoutShell";
import { getCurrentProfile } from "@/lib/auth/server-session";

export const dynamic = "force-dynamic";

export default async function AppRootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentProfile();
  if (!user) redirect("/login");

  return (
    <AuthProvider>
      <AuthGuard>
        <PrivateLayoutShell>{children}</PrivateLayoutShell>
      </AuthGuard>
    </AuthProvider>
  );
}
