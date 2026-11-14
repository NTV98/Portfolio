import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Honest empty / unconfigured state inside a panel. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border border-dashed border-line-strong p-8 md:p-10",
        className,
      )}
    >
      <p className="text-h4 text-fg">{title}</p>
      {description && <p className="max-w-lead text-body text-fg-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
