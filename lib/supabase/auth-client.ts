import { getSupabaseBrowser } from "./client";

export async function getCurrentUserClient() {
  const supabase = getSupabaseBrowser();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return user;
}
