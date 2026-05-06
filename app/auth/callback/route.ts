import { createClient } from "@/lib/supabase/server-client";
import { NextResponse } from "next/server";

/**
 * This GET handler processes the authentication 'code' sent by Supabase
 * after a user clicks a signup or login link in their email.
 */
export async function GET(request: Request) {
  // 1. Extract the 'code' from the URL (e.g., /auth/callback?code=abc...)
  // 2. 'origin' identifies your base URL (e.g., http://localhost:3000)
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // 'next' allows you to specify a dynamic redirect path after successful login
  const next = searchParams.get("next") ?? "/home";

  if (code) {
    const supabase = await createClient();

    /**
     * LOGIC: PKCE Code Exchange
     * This converts the temporary 'code' into a long-lived user session (JWT).
     * Supabase automatically sets the session cookies in the browser here.
     */
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If the exchange is successful, send the user to the dashboard or home feed
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  /**
   * If there is no code, or the exchange failed (e.g., expired code),
   * send the user back to the login page with a clear error status.
   */
  return NextResponse.redirect(`${origin}/login?error=Verification failed`);
}
