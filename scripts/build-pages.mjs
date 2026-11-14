// Static export for GitHub Pages preview → ./out
//
//   BASE_PATH=/Portfolio SITE_URL=https://ntv98.github.io/Portfolio node scripts/build-pages.mjs
//
// GitHub Pages only serves files, so server-only pieces are set aside for the build and ALWAYS restored:
//   - src/proxy.ts                    (locale redirect)        → replaced by out/index.html (client redirect)
//   - src/app/api                     (health route)           → not needed on Pages
//   - src/app/[locale]/[...rest]      (catch-all 404)          → out/404.html (global not-found) instead
//   - src/app/[locale]/blog/[slug]    only when no published post exists (export needs ≥ 1 param)
//   - `dynamicParams = true` → false  in slug pages (export requires every param to be known)
// The Docker/Nginx build (`npm run build`) is untouched.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const backup = path.join(root, ".pages-backup");
const out = path.join(root, "out");
const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

const rel = (p) => path.join(root, p);
const asideList = ["src/proxy.ts", "src/app/api", "src/app/[locale]/[...rest]"];
const patchList = ["src/app/[locale]/projects/[slug]/page.tsx", "src/app/[locale]/blog/[slug]/page.tsx"];

function hasPublishedPost() {
  const dir = rel("src/content/blog");
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir, { recursive: true }).some((f) => {
    if (!String(f).endsWith(".mdx")) return false;
    const src = fs.readFileSync(path.join(dir, String(f)), "utf8");
    return !/^draft:\s*true\s*$/m.test(src.split("---")[1] ?? "");
  });
}

/** Undo a previous interrupted run first. */
function restore() {
  if (!fs.existsSync(backup)) return;
  for (const entry of fs.readdirSync(backup, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const from = path.join(entry.parentPath, entry.name);
    const to = path.join(root, path.relative(backup, from));
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  fs.rmSync(backup, { recursive: true, force: true });
  console.log("↺ restored server-only files");
}

function setAside(p) {
  const src = rel(p);
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, path.join(backup, p), { recursive: true });
  fs.rmSync(src, { recursive: true, force: true });
}

function patch(p) {
  const file = rel(p);
  if (!fs.existsSync(file)) return;
  const dest = path.join(backup, p);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) fs.copyFileSync(file, dest);
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("export const dynamicParams = true;", "export const dynamicParams = false;"));
}

function rootRedirect() {
  const target = (lang) => `${basePath}/${lang}/`;
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Nguyễn Tuấn Vũ — Portfolio</title>
<script>
(function () {
  var lang = "vi";
  try {
    var c = document.cookie.match(/(?:^|; )locale=(vi|en)/);
    if (c) lang = c[1];
    else {
      var langs = navigator.languages || [navigator.language || ""];
      for (var i = 0; i < langs.length; i++) {
        var l = String(langs[i]).toLowerCase().slice(0, 2);
        if (l === "vi" || l === "en") { lang = l; break; }
      }
    }
  } catch (e) {}
  location.replace(${JSON.stringify(basePath)} + "/" + lang + "/");
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=${target("vi")}"></noscript>
</head>
<body>
<p><a href="${target("vi")}">Tiếng Việt</a> · <a href="${target("en")}">English</a></p>
</body>
</html>
`;
}

/**
 * Next writes per-segment RSC prefetch payloads as nested files
 * (`__next.$d$locale/projects/$d$slug/__PAGE__.txt`) but the client requests the dotted name
 * (`__next.$d$locale.projects.$d$slug.__PAGE__.txt`). Nginx could rewrite; GitHub Pages cannot,
 * so add a flat copy next to each nested folder. Without this, client navigation still works but
 * every link prefetch 404s.
 */
function flattenSegmentPayloads(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      for (const f of fs.readdirSync(full, { recursive: true, withFileTypes: true })) {
        if (!f.isFile()) continue;
        const nested = path.relative(full, path.join(f.parentPath, f.name)).split(path.sep).join(".");
        fs.copyFileSync(path.join(f.parentPath, f.name), path.join(dir, `${entry.name}.${nested}`));
        count++;
      }
    } else {
      count += flattenSegmentPayloads(full);
    }
  }
  return count;
}

restore();
try {
  asideList.forEach(setAside);
  if (!hasPublishedPost()) setAside("src/app/[locale]/blog/[slug]");
  patchList.forEach(patch);

  fs.rmSync(out, { recursive: true, force: true });
  execSync("npx next build", {
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true", BASE_PATH: basePath, NEXT_TELEMETRY_DISABLED: "1" },
  });

  console.log(`✔ flattened ${flattenSegmentPayloads(out)} RSC prefetch payload(s)`);
  fs.writeFileSync(path.join(out, "index.html"), rootRedirect());
  fs.writeFileSync(path.join(out, ".nojekyll"), ""); // serve the _next/ folder as-is
  if (!fs.existsSync(path.join(out, "404.html"))) console.warn("⚠ out/404.html missing");
  console.log(`✔ static site in ./out (base path "${basePath || "/"}")`);
} finally {
  restore();
}
