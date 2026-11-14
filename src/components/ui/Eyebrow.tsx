import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Section label above a heading: 14px · 600 · uppercase · accent text. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
