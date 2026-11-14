import type { Locale } from "@/i18n/config";
import type { Experience } from "@/lib/content/schemas";
import { formatPeriod } from "@/lib/format";

/** Compact career list (Home): period · role · company, hairline between rows. */
export function ExperienceSummary({ items, locale, presentLabel }: { items: Experience[]; locale: Locale; presentLabel: string }) {
  return (
    <ol className="flex flex-col">
      {items.map((item) => (
        <li key={item.id} className="flex gap-5 border-t border-line py-6.5">
          <span className="w-35 flex-none pt-1 font-mono text-xs text-accent-text">
            {item.period ? formatPeriod(item.period, locale, presentLabel) : "—"}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="text-h4">{item.title[locale]}</h3>
            <p className="text-sm text-fg-muted">{item.organization[locale]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
