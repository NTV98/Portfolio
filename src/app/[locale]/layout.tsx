import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { site } from "@/config/site";
import { localeLabels, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { brandName, SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/Primitives";
import { paletteBg, themeScript } from "@/components/layout/theme";

/** Only /vi and /en exist — everything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getMessages();
  const name = brandName();
  return {
    metadataBase: new URL(site.url),
    title: { default: name, template: `%s — ${name}` },
    description: t.meta.siteDescription,
    applicationName: name,
    formatDetection: { telephone: false },
  };
}

/** Browser UI color — default palettes (violet on dark OS, light on light OS). */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: paletteBg.light },
    { media: "(prefers-color-scheme: dark)", color: paletteBg.violet },
  ],
  colorScheme: "dark light",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, t } = await getMessages();
  return (
    <html lang={localeLabels[locale].htmlLang} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Applies the saved palette before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SkipLink label={t.common.skipToContent} />
        <SiteHeader locale={locale} t={t} />
        {/* `view`: direct children rise in sequence on every page (design entrance). */}
        <main id="content" tabIndex={-1} className="view outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} t={t} />
      </body>
    </html>
  );
}
