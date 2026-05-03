import React from "react";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl w-full mx-auto">{children}</div>;
}
