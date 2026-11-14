export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  vi: { short: "VI", name: "Tiếng Việt", htmlLang: "vi", og: "vi_VN" },
  en: { short: "EN", name: "English", htmlLang: "en", og: "en_US" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Localized value: one entry per supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** Plain string (same in every locale) or a Localized string. */
export function pickText(value: string | Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

/** Prefix an internal path with the locale: ("/projects", "en") → "/en/projects". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of a pathname: ("/vi/projects/x", "en") → "/en/projects/x". */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  return localePath(target, pathname);
}
