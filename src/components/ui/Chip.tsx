import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Static pill tag (tech names, skills). For filters use FilterChips; for links use `chip chip-link`. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("chip", className)}>{children}</span>;
}

/** Wrapping list of chips. Renders nothing when empty. */
export function ChipList({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
