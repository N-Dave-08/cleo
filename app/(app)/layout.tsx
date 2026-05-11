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

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const safeUser = {
    id: user.id,
    username: user.user_metadata?.username ?? "no username",
    avatar_url: user.user_metadata?.avatar_url,
  };

  return (
    <div className="w-full">
      <Drawer user={safeUser}>{children}</Drawer>
    </div>
  );
}
