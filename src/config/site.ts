/** Site-wide configuration. Not secret — safe to commit. */
export const site = {
  /** Canonical origin. Override with SITE_URL at build time. */
  url: (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: "Portfolio",
  repoUrl: "https://github.com/NTV98/Portfolio",
  /** CV files under /public/assets/files. Missing files are detected at build → "unconfigured" UI. */
  cv: {
    vi: "/assets/files/cv-vi.pdf",
    en: "/assets/files/cv-en.pdf",
  },
  /** Default social sharing image (1200×630, PNG/JPG). */
  ogImage: { src: "/assets/images/og/default.png", width: 1200, height: 630 },
  /** Contact mode: "mailto" (no server integration yet). */
  contactMode: "mailto" as const,
  /** Shown on the privacy page. Update when the policy changes. */
  privacyUpdated: "2026-11-14",
};
