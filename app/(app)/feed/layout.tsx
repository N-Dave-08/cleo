import React from "react";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-360 w-full mx-auto">{children}</div>;
}
