// proxy.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * The Proxy (Middleware) acts as a security gatekeeper.
 * It refreshes the user's session and protects private routes.
 */
export async function proxy(request: NextRequest) {
  // 1. Create an initial response that carries the incoming request headers
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  /**
   * Initialize the Supabase client specifically for Middleware.
   * Logic: This setup allows Supabase to read and write cookies directly
   * to the request/response cycle, keeping the user session active.
   */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Updates the request cookies so the server components can see them
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Updates the response cookies so the browser saves them
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  /**
   * SECURE CHECK:
   * supabase.auth.getUser() is the most secure way to verify a user
   * because it validates the session with the Supabase Auth server.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * PROTECTED ROUTE LOGIC:
   * If there is no valid user and they are trying to access '/home',
   * we intercept the request and bounce them back to the login page.
   */
  if (!user && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

/**
 * CONFIGURATION:
 * Defines which routes this proxy should monitor.
 * For Cleo, we protect the home feed and individual post pages.
 */
export const config = {
  matcher: ["/home/:path*", "/post/:path*"],
};
