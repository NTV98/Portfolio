import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { localePath, type Locale } from "@/i18n/config";
import type { Messages } from "@/messages/vi";
import { Avatar } from "@/components/ui/Avatar";
import { brandName } from "./SiteHeader";

/** Design footer: hairline, copyright left, links right. */
export function SiteFooter({ locale, t }: { locale: Locale; t: Messages }) {
  const year = new Date().getFullYear();
  return (
    <footer className="container-page mt-auto pt-24 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7 text-xs text-fg-muted">
        <p className="flex items-center gap-3">
          <Avatar />
          <span>
            © {year} {brandName()}
          </span>
        </p>
        <nav aria-label={t.nav.footerLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-fg"
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
