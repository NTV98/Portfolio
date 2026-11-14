import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getProjectsBySlugs } from "@/lib/content/projects";
import type { Experience } from "@/lib/content/schemas";
import { formatPeriod } from "@/lib/format";
import type { Messages } from "@/messages/vi";
import { ChipList } from "@/components/ui/Chip";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5 text-fg-muted marker:text-accent-text">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Experience page: one panel per role — period/role/company left, details + stack right. */
export function ExperienceList({ items, locale, t }: { items: Experience[]; locale: Locale; t: Messages }) {
  return (
    <ol className="flex flex-col gap-5">
      {items.map((item) => {
        const related = getProjectsBySlugs(item.projectSlugs);
        return (
          <li key={item.id} className="panel panel-row grid-fit-sm gap-6 p-6 md:p-9">
            <div className="flex flex-col gap-1.5">
              {item.period && (
                <p className="font-mono text-xs text-accent-text">{formatPeriod(item.period, locale, t.common.present)}</p>
              )}
              <h2 className="text-h3">{item.title[locale]}</h2>
              <p className="text-fg-muted">
                {item.organization[locale]}
                {item.location && <> · {item.location[locale]}</>}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {item.summary && <p className="text-fg-muted">{item.summary[locale]}</p>}
              <Bullets items={item.responsibilities[locale]} />
              {item.contributions && (
                <div className="flex flex-col gap-2">
                  <p className="eyebrow">{t.experience.contributions}</p>
                  <Bullets items={item.contributions[locale]} />
                </div>
              )}
              <ChipList items={item.technologies} className="gap-2" />
              {related.length > 0 && (
                <p className="text-sm text-fg-muted">
                  <span className="mr-2 font-semibold text-fg">{t.experience.relatedProjects}:</span>
                  {related.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ", "}
                      <Link href={localePath(locale, `/projects/${p.slug}`)} className="text-accent-text underline underline-offset-4">
                        {p.title[locale]}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
