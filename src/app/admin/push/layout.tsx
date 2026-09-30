import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSupabaseAccessToken } from "@/lib/auth/server-session";

export const dynamic = "force-dynamic";

export default async function PushAdminLayout({ children }: { children: ReactNode }) {
  const { user } = await getSupabaseAccessToken();
  if (user?.app_metadata?.role !== "admin") redirect("/app");
  return <>{children}</>;
}
