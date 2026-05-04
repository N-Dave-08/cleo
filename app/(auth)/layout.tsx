import { Cat } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-1">
        <Cat />
        <span className="font-semibold">Cleo</span>
      </div>
      {children}
    </div>
  );
}
