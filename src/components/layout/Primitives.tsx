import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Container({
  size = "page",
  className,
  children,
}: {
  size?: "page" | "prose";
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn(size === "page" ? "container-page" : "container-prose", className)}>{children}</div>;
}

/**
 * Page intro: eyebrow · h1 · lead · actions. One per page (inner pages).
 * The home hero has its own layout (components/home/Hero).
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  size = "page",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  size?: "page" | "prose";
  className?: string;
}) {
  return (
    <section className={cn(size === "page" ? "container-page" : "container-prose", "page-top pb-14", className)}>
      <div className="flex flex-col items-start gap-4.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-heading text-h1">{title}</h1>
        {lead && <p className="max-w-lead text-body-lg text-fg-muted">{lead}</p>}
        {actions && <div className="mt-2 flex flex-wrap gap-3.5">{actions}</div>}
      </div>
    </section>
  );
}

/** Section heading row: eyebrow + h2 on the left, optional action (ghost button) on the right. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  action,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-5", className)}>
      <div className="flex flex-col gap-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="max-w-heading text-h2">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

/** Content section with the standard 120px rhythm (80 on phones). */
export function Section({
  labelledBy,
  label,
  first = false,
  className,
  children,
}: {
  /** id of the h2 inside (preferred). */
  labelledBy?: string;
  /** aria-label when the section has no visible heading. */
  label?: string;
  /** First section under a PageHeader: no top gap. */
  first?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={cn("container-page", !first && "section-gap", className)}
    >
      {children}
    </section>
  );
}

export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#content"
      className="sr-only z-skip rounded-full bg-accent px-5 py-3 text-xs font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {label}
    </a>
  );
}
