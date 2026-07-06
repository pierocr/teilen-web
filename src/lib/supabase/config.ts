export function getSupabaseConfig() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    "https://exgvlleckuvjfgsprmte.supabase.co";

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z3ZsbGVja3V2amZnc3BybXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5OTQwMzcsImV4cCI6MjA1NTU3MDAzN30.Hyit_TkwXS3Cb0NdDc5u61cbM1DbV7wKl4v4ffHDTQM";

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[supabase] Missing Supabase credentials for web.");
  }

  return { supabaseUrl, supabaseKey };
}
