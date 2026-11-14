import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { profile } from "@/config/profile";
import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import { isPlaceholder } from "@/lib/format";
import type { Messages } from "@/messages/vi";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { PalettePicker } from "./PalettePicker";
import { Avatar } from "@/components/ui/Avatar";

export function brandName(): string {
  return isPlaceholder(profile.name) ? site.name : profile.name;
}

function Brand({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link href={localePath(locale)} aria-label={label} className="group inline-flex min-h-11 items-center gap-3 font-semibold">
      <Avatar className="transition-transform duration-300 group-hover:scale-105" />
      {brandName()}
    </Link>
  );
}

/** Design header: avatar + name · 6 links with underline · language · palette picker. Menu dialog below lg. */
export function SiteHeader({ locale, t }: { locale: Locale; t: Messages }) {
  const items = mainNav.map((item) => ({ href: localePath(locale, item.href), label: t.nav[item.key] }));
  const controls = (placement: "header" | "menu") => (
    <>
      <LocaleSwitcher current={locale} switchToLabel={t.common.switchTo} />
      <PalettePicker
        buttonLabel={t.common.paletteButton}
        groupLabel={t.common.paletteGroup}
        labels={t.common.palettes}
        placement={placement}
      />
    </>
  );

  return (
    <header className="header-safe relative z-raised">
      <div className="container-page flex items-center justify-between gap-4 py-6">
        <Brand locale={locale} label={t.nav.homeLabel} />

        <div className="hidden items-center gap-6.5 lg:flex">
          <nav aria-label={t.nav.mainLabel}>
            <NavLinks items={items} />
          </nav>
          <div className="flex items-center gap-3">{controls("header")}</div>
        </div>

        <div className="lg:hidden">
          <MobileNav
            items={items}
            openLabel={t.common.openMenu}
            closeLabel={t.common.closeMenu}
            navLabel={t.nav.mainLabel}
            brand={<Brand locale={locale} label={t.nav.homeLabel} />}
            footer={controls("menu")}
          />
        </div>
      </div>
    </header>
  );
}
