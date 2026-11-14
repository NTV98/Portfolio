"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type NavLinkItem = { href: string; label: string };

/** Home ("/vi") matches exactly; sections also match their children ("/vi/projects/x"). */
function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  return href.split("/").length > 2 && pathname.startsWith(`${href}/`);
}

/** Header links with animated underline + aria-current. `layout="stack"` is used in the mobile menu. */
export function NavLinks({
  items,
  layout = "row",
  onNavigate,
}: {
  items: NavLinkItem[];
  layout?: "row" | "stack";
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "";
  return (
    <ul className={cn(layout === "row" ? "flex flex-wrap items-center gap-x-6.5 gap-y-1.5" : "flex flex-col gap-1")}>
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn("nav-link", layout === "stack" && "min-h-14 text-h3")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
