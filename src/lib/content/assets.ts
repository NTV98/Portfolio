import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** True when a file exists under /public (checked at build time for SSG pages). */
export function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

/** CV href for the locale (falls back to the other locale's file), or undefined → unconfigured. */
export function getCvHref(locale: Locale): string | undefined {
  const preferred = site.cv[locale];
  if (publicFileExists(preferred)) return preferred;
  return Object.values(site.cv).find(publicFileExists);
}
