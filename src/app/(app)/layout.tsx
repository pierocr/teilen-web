import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { PrivateLayoutShell } from "@/components/private/PrivateLayoutShell";

export default function AppRootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <PrivateLayoutShell>{children}</PrivateLayoutShell>
      </AuthGuard>
    </AuthProvider>
  );
}
