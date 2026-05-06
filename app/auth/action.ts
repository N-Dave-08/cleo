"use server";

import { createClient } from "@/lib/supabase/server-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Handles user authentication via email and password.
 * Logic:
 * 1. Extracts credentials from the form data.
 * 2. Attempts to create a session with Supabase.
 * 3. Redirects to the home feed on success or back to login with an error message on failure.
 */
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // URL-encodes the error message to display it safely in the UI via search params
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Successful login sends the user to the main application area
  redirect("/home");
}

/**
 * Handles new user registration.
 * Logic:
 * 1. Captures email, password, and custom metadata (username).
 * 2. Uses the request 'origin' to tell Supabase where to redirect after email confirmation.
 * 3. Saves the username in 'user_metadata' so it can be retrieved without extra DB queries.
 */
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Headers are awaited in Next.js 16 to dynamically get the current domain (localhost or production)
  const origin = (await headers()).get("origin");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // Stores the username in the auth.users metadata field
      emailRedirectTo: `${origin}/auth/callback`, // The route that handles the PKCE code exchange
    },
  });

  if (error) {
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Redirects to login with a prompt for the user to verify their account
  redirect("/login?message=Check your email to confirm your account");
}

/**
 * Handles ending the user session.
 * Logic:
 * 1. Clears the Supabase auth cookie from the browser.
 * 2. Redirects the user back to the login page to prevent unauthorized access.
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Ensures the user is sent out of the protected (app) route group immediately
  redirect("/login");
}
