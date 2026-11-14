import type { MetadataRoute } from "next";
import { staticRoutes } from "@/config/navigation";
import { localeLabels, localePath, locales } from "@/i18n/config";
import { getProjectSlugs } from "@/lib/content/projects";
import { getPostSlugs } from "@/lib/content/posts";
import { absoluteUrl } from "@/lib/seo";

/** Generated once at build time (required by the GitHub Pages static export). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...getProjectSlugs().map((slug) => `/projects/${slug}`),
    ...getPostSlugs().map((slug) => `/blog/${slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeLabels[l].htmlLang, absoluteUrl(localePath(l, path))]),
        ),
      },
    })),
  );
}
