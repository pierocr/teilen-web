import { NextResponse } from "next/server";
import { clearBackendAuthCookie } from "@/lib/auth/server-session";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  await clearBackendAuthCookie();

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // The browser client also signs out; this endpoint must always clear local backend auth.
  }

  return NextResponse.json({ ok: true });
}
