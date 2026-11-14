import type { Metadata } from "next";
import { site } from "@/config/site";
import { localeLabels, localePath, locales, type Locale } from "@/i18n/config";

export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}

/**
 * Per-page metadata: title, description, canonical, hreflang alternates (vi/en/x-default), Open Graph.
 * `path` is locale-less, e.g. "/projects".
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, localePath(l, path)]));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: { ...languages, "x-default": localePath("vi", path) },
    },
    openGraph: {
      type,
      url: localePath(locale, path),
      siteName: site.name,
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
      ...(title ? { title } : {}),
      description,
      images: [{ url: site.ogImage.src, width: site.ogImage.width, height: site.ogImage.height }],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      description,
      images: [site.ogImage.src],
    },
  };
}
