import { createBrowserClient } from "@supabase/ssr";

/**
 * Singleton Supabase browser client
 * Used everywhere on the CLIENT side only
 */

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowser() {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return supabaseInstance;
}
