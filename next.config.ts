import type { NextConfig } from "next";

/**
 * Two build targets:
 * - default            → `output: "standalone"` (Docker + Nginx, Docs/DEPLOYMENT.md)
 * - STATIC_EXPORT=true → `output: "export"` for GitHub Pages preview (`npm run build:pages`).
 *   BASE_PATH is the repo sub-path, e.g. "/Portfolio" → https://<user>.github.io/Portfolio/
 */
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = staticExport ? (process.env.BASE_PATH ?? "").replace(/\/$/, "") : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  basePath: basePath || undefined,
  // Static hosts serve /vi/projects/ as /vi/projects/index.html.
  trailingSlash: staticExport,
  poweredByHeader: false,
  reactStrictMode: true,
  // No image server on GitHub Pages → serve the WebP files as-is.
  images: staticExport ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  // Inlined for `asset()` (src/lib/base-path.ts). Not a secret.
  env: { SITE_BASE_PATH: basePath },
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  // Headers are unsupported by static export (set them in Nginx for production).
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
