import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { themeScript } from "@/components/layout/theme";
import { en } from "@/messages/en";
import { vi } from "@/messages/vi";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

/** Unmatched URLs (outside any route). Bilingual because the locale is unknown here. */
export default function GlobalNotFound() {
  return (
    <html lang="vi" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main id="content" className="container-prose flex flex-1 flex-col justify-center gap-12 py-24">
          <p className="eyebrow">404</p>
          {[
            { t: vi, href: "/vi", lang: "vi" },
            { t: en, href: "/en", lang: "en" },
          ].map(({ t, href, lang }, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <section key={lang} lang={lang} className="flex flex-col items-start gap-4">
                <Heading className="text-title">{t.notFound.title}</Heading>
                <p className="text-body-md text-fg-muted">{t.notFound.body}</p>
                <a
                  href={href}
                  className="btn-motion inline-flex min-h-13 items-center rounded-full bg-accent px-7 font-semibold text-on-accent"
                >
                  {t.notFound.home}
                </a>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
