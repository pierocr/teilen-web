import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://exgvlleckuvjfgsprmte.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z3ZsbGVja3V2amZnc3BybXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5OTQwMzcsImV4cCI6MjA1NTU3MDAzN30.Hyit_TkwXS3Cb0NdDc5u61cbM1DbV7wKl4v4ffHDTQM";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("[supabase] Missing Supabase credentials for web.");
}

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

export default supabaseBrowser;
