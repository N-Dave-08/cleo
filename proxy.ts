import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUserServer } from "./lib/supabase/auth-server";

/**
 * The Proxy (Middleware) acts as a security gatekeeper.
 * It refreshes the user's session and protects private routes.
 */
export async function proxy(request: NextRequest) {
  // 1. Create an initial response that carries the incoming request headers
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  /**
   * SECURE CHECK:
   * supabase.auth.getUser() is the most secure way to verify a user
   * because it validates the session with the Supabase Auth server.
   */
  const user = await getCurrentUserServer();

  const pathname = request.nextUrl.pathname;

  /**
   * PROTECTED ROUTE LOGIC:
   * If there is no valid user and they are trying to access '/home',
   * we intercept the request and bounce them back to the login page.
   */
  if (!user && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /**
   * PREVENT LOGGED-IN USERS FROM ACCESSING AUTH/PUBLIC PAGES:
   * If user is logged-in and trying to access auth and public pages,
   * we intercept the request and bounce them back to the home page.
   */
  if (
    user &&
    (pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return response;
}

/**
 * CONFIGURATION:
 * Defines which routes this proxy should monitor.
 * For Cleo, we protect the home feed and individual post pages.
 */
export const config = {
  matcher: ["/", "/login", "/signup", "/home/:path*", "/post/:path*"],
};
