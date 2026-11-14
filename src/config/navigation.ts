import type { Messages } from "@/messages/vi";

type NavKey = Exclude<keyof Messages["nav"], "mainLabel" | "footerLabel" | "homeLabel">;

export type NavItem = { key: NavKey; href: string };

/** Header navigation — the 6 items of the design (UI_UX_GUIDELINES §2). */
export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "skills", href: "/skills" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/experience" },
  { key: "contact", href: "/contact" },
];

/** Footer links: the design's three + secondary pages not in the header. */
export const footerNav: NavItem[] = [
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "blog", href: "/blog" },
  { key: "resume", href: "/resume" },
  { key: "privacy", href: "/privacy" },
];

/** Every static (non-slug) route — used by sitemap and link tests. */
export const staticRoutes = [
  "/",
  "/about",
  "/skills",
  "/projects",
  "/experience",
  "/resume",
  "/blog",
  "/contact",
  "/privacy",
] as const;
