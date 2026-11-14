import type { Locale } from "@/i18n/config";

/** Replace {name} tokens: interpolate("{count} items", { count: 3 }) → "3 items". */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

const PLACEHOLDER = "[PLACEHOLDER]";

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.includes(PLACEHOLDER);
}

/**
 * Format an ISO date ("2026-11-14") or month ("2024-03") for display.
 * Uses an explicit locale and UTC so server and client output is identical (no hydration mismatch).
 */
export function formatDate(value: string, locale: Locale, style: "day" | "month" = "day"): string {
  const isMonth = /^\d{4}-\d{2}$/.test(value);
  const date = new Date(isMonth ? `${value}-01T00:00:00Z` : `${value.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  const options: Intl.DateTimeFormatOptions =
    style === "month" || isMonth
      ? { year: "numeric", month: "short", timeZone: "UTC" }
      : { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", options).format(date);
}

export function formatPeriod(
  period: { start: string; end?: string },
  locale: Locale,
  presentLabel: string,
): string {
  const start = formatDate(period.start, locale, "month");
  const end = period.end ? formatDate(period.end, locale, "month") : presentLabel;
  return `${start} — ${end}`;
}

/** Initials for avatar / cover fallbacks: "Portfolio Website" → "PW". */
export function initials(text: string, max = 2): string {
  const cleaned = text.replace(PLACEHOLDER, "").trim();
  const letters = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase());
  return letters.slice(0, max).join("") || "—";
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}
