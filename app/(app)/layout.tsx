import Drawer from "@/components/ui/drawer";
import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import React from "react";

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Use getUser() for security as it validates the JWT with Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If proxy.ts somehow missed a session expiration, this is your safety net
  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="w-full">
      {/* Pass the user object to your Drawer to personalize the UI */}
      <Drawer user={user}>{children}</Drawer>
    </div>
  );
}
