import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Quiet inline link (muted → fg on hover), e.g. "← Tất cả dự án", footer links. */
export function TextLink({
  href,
  children,
  className,
  external,
  newTabLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  newTabLabel?: string;
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center gap-2 font-medium text-fg-muted transition-colors duration-200 hover:text-fg [&_svg]:size-4.5",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {newTabLabel && <span className="sr-only">{newTabLabel}</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
