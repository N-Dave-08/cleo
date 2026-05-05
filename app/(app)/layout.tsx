import Drawer from "@/components/ui/drawer";
import React from "react";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Drawer>{children}</Drawer>
    </div>
  );
}
