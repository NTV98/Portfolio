"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export const LOCALE_COOKIE = "locale";

/**
 * Compact language toggle: one 44px round button (same style as the palette button)
 * showing the language you switch TO. Keeps the current path; remembers the choice in a cookie.
 */
export function LocaleSwitcher({
  current,
  switchToLabel,
  className,
}: {
  current: Locale;
  switchToLabel: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${current}`;
  const target = locales.find((l) => l !== current) ?? current;
  const label = `${switchToLabel} ${localeLabels[target].name}`;

  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={localeLabels[target].htmlLang}
      lang={localeLabels[target].htmlLang}
      aria-label={label}
      title={label}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; SameSite=Lax`;
      }}
      className={cn("icon-btn text-xs font-bold tracking-label", className)}
    >
      {localeLabels[target].short}
    </Link>
  );
}
