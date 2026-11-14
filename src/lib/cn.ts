import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom design-token scales, otherwise it
 * treats e.g. `text-h1` and `text-fg` as conflicting and drops one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "bg",
        "bg-2",
        "surface",
        "surface-2",
        "line",
        "line-strong",
        "fg",
        "fg-muted",
        "accent",
        "accent-text",
        "on-accent",
        "accent-soft",
        "live",
        ...[1, 2, 3, 4, 5, 6].flatMap((n) => [`tint-${n}`, `key-${n}`]),
        ...["bg", "line", "divider", "fg", "muted", "keyword", "string", "literal", "red", "yellow"].map(
          (c) => `code-${c}`,
        ),
      ],
      text: [
        "display",
        "h1",
        "h2",
        "title",
        "h3",
        "h4",
        "lead",
        "body-xl",
        "body-lg",
        "body-md",
        "body",
        "sm",
        "xs",
        "2xs",
        "3xs",
      ],
      radius: ["sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      shadow: ["pop", "float", "mock", "glow", "cta", "dot"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
