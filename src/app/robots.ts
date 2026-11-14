import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Generated once at build time (required by the GitHub Pages static export). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // GitHub Pages build is a preview (sample content) → keep it out of search engines.
  if (process.env.STATIC_EXPORT === "true") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
