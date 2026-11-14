/**
 * Palette model (DESIGN_SYSTEM §2.1):
 * - No saved choice → no attribute on <html>; CSS picks "violet" (dark OS) or "light" (light OS).
 * - Saved choice → <html data-palette="…"> (set before first paint by `themeScript`).
 */
export const PALETTE_KEY = "palette";

/** Order = order in the picker (6 per row). First 6 come from the mockup, the rest were added in v2.1–2.2. */
export const palettes = [
  // Row 1 — from the mockup
  "violet",
  "light",
  "blue",
  "teal",
  "orange",
  "pink",
  // Row 2 — dark extras
  "midnight",
  "ocean",
  "forest",
  "lime",
  "ruby",
  "amber",
  // Row 3 — dark + light extras
  "coffee",
  "graphite",
  "sand",
  "lavender",
  "mint",
  "sakura",
] as const;
export type Palette = (typeof palettes)[number];

export function isPalette(value: unknown): value is Palette {
  return typeof value === "string" && (palettes as readonly string[]).includes(value);
}

/**
 * Swatch preview per palette. Raw colors are allowed here only because they
 * *depict* the palettes themselves (mirrors tokens.css).
 */
export const paletteSwatch: Record<Palette, string> = {
  violet: "#6D4AFF",
  light: "linear-gradient(135deg, #F5F6F8 50%, #2447F5 50%)",
  blue: "#3B82F6",
  teal: "#14B8A6",
  orange: "#F97316",
  pink: "#EC4899",
  midnight: "linear-gradient(135deg, #0E1524 50%, #22D3EE 50%)",
  forest: "linear-gradient(135deg, #111B15 50%, #4ADE80 50%)",
  ruby: "linear-gradient(135deg, #1E1015 50%, #F43F5E 50%)",
  amber: "linear-gradient(135deg, #1B160D 50%, #FBBF24 50%)",
  graphite: "linear-gradient(135deg, #151517 50%, #E4E4E7 50%)",
  sand: "linear-gradient(135deg, #FAF7F2 50%, #C2410C 50%)",
  ocean: "linear-gradient(135deg, #0B1A28 50%, #38BDF8 50%)",
  coffee: "linear-gradient(135deg, #1D1612 50%, #D97706 50%)",
  lime: "linear-gradient(135deg, #13170F 50%, #BEF264 50%)",
  lavender: "linear-gradient(135deg, #F7F5FC 50%, #7C3AED 50%)",
  mint: "linear-gradient(135deg, #F3F9F7 50%, #0F766E 50%)",
  sakura: "linear-gradient(135deg, #FDF6F8 50%, #DB2777 50%)",
};

/** Browser UI color per palette (mirrors --p-bg). */
export const paletteBg: Record<Palette, string> = {
  violet: "#0B0A17",
  light: "#F5F6F8",
  blue: "#0A0E1A",
  teal: "#08110F",
  orange: "#120C08",
  pink: "#140A11",
  midnight: "#070B14",
  forest: "#090F0B",
  ruby: "#12080B",
  amber: "#100D07",
  graphite: "#0B0B0C",
  sand: "#FAF7F2",
  ocean: "#061019",
  coffee: "#120D0A",
  lime: "#0A0C08",
  lavender: "#F7F5FC",
  mint: "#F3F9F7",
  sakura: "#FDF6F8",
};

/** Runs in <head> before first paint — keep tiny and dependency-free. */
export const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var p=localStorage.getItem("${PALETTE_KEY}");if(${JSON.stringify(palettes)}.indexOf(p)>-1)d.setAttribute("data-palette",p)}catch(e){}})()`;
