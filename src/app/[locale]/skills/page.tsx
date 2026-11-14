import type { Metadata } from "next";
import { certifications, education } from "@/data/education";
import { getMessages } from "@/i18n/server";
import { skillGroups } from "@/lib/content/highlights";
import { formatDate, formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { SkillGroups } from "@/components/skills/SkillGroups";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/skills", title: t.skills.eyebrow, description: t.skills.lead });
}

export default async function SkillsPage() {
  const { locale, t } = await getMessages();
  const s = t.skills;
  const hasLearning = education.length > 0 || certifications.length > 0;

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <Section first label={s.eyebrow}>
        <SkillGroups groups={skillGroups} locale={locale} t={t} />
      </Section>

      {hasLearning && (
        <Section labelledBy="learning-title" first className="pt-24">
          <h2 id="learning-title" className="mb-7 text-title">
            {s.learningTitle}
          </h2>
          <ul className="grid-fit-sm gap-5">
            {certifications.map((c) => (
              <li key={c.id} className="panel panel-row flex flex-col gap-1.5 p-6.5">
                <span className="font-mono text-xs text-accent-text">{formatDate(c.date, locale, "month")}</span>
                <h3 className="text-h4">{c.name}</h3>
                <p className="text-sm text-fg-muted">{c.issuer}</p>
              </li>
            ))}
            {education.map((e) => (
              <li key={e.id} className="panel panel-row flex flex-col gap-1.5 p-6.5">
                {e.period && (
                  <span className="font-mono text-xs text-accent-text">
                    {formatPeriod(e.period, locale, t.common.present)}
                  </span>
                )}
                <h3 className="text-h4">{e.degree[locale]}</h3>
                <p className="text-sm text-fg-muted">{e.institution[locale]}</p>
                {e.note && <p className="text-sm text-fg-muted">{e.note[locale]}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
