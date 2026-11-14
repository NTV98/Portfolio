/**
 * Sub-path the site is served from ("" normally, "/Portfolio" on GitHub Pages).
 * Inlined at build time from next.config.ts (`env.SITE_BASE_PATH`). Not a secret.
 *
 * next/link and next/router add it automatically; plain URLs to /public files
 * (next/image src, <video>, download links, raw <a>) must go through `asset()`.
 */
export const basePath = process.env.SITE_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
