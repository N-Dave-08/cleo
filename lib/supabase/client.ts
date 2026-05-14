import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (CLIENT-SIDE ONLY)
 * Use this inside:
 * - React hooks
 * - Client components
 * - Event handlers
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
