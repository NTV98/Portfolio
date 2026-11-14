import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted at build time (DESIGN_SYSTEM §4.1).
 * Be Vietnam Pro replaces the mockup's Poppins: same geometric feel, but with a
 * real Vietnamese subset (Poppins has none → diacritics would fall back).
 */
export const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "Menlo", "monospace"],
});

export const fontVariables = `${beVietnam.variable} ${jetbrainsMono.variable}`;
