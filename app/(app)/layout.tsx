import Drawer from "@/components/ui/drawer";
import { getCurrentUserServer } from "@/lib/supabase/auth-server";
import React from "react";
import { redirect } from "next/navigation";

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  const safeUser = {
    id: user.id,
    username: user.user_metadata?.username ?? "no username",
    avatar_url: user.user_metadata?.avatar_url ?? null,
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Drawer user={safeUser}>{children}</Drawer>
    </div>
  );
}
