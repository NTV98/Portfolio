import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { certifications, education } from "@/data/education";
import { experience } from "@/data/experience";
import { pickText } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { skillGroups } from "@/lib/content/highlights";
import { getFeaturedProjects } from "@/lib/content/projects";
import { formatDate, formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { PageHeader, Section, SectionHeader } from "@/components/layout/Primitives";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { toProjectCard } from "@/components/projects/to-card";
import { CvDownload } from "@/components/resume/CvDownload";
import { ChipList } from "@/components/ui/Chip";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/resume", title: t.resume.eyebrow, description: profile.intro[locale] });
}

/** Online resume generated from the same data as the rest of the site (DRY). Print-friendly. */
export default async function ResumePage() {
  const { locale, t } = await getMessages();
  const r = t.resume;
  const projects = getFeaturedProjects(3).map((p) => toProjectCard(p, locale, t));

  return (
    <>
      <PageHeader
        eyebrow={r.eyebrow}
        title={profile.name}
        lead={profile.headline[locale]}
        actions={
          <div data-print="hide">
            <CvDownload locale={locale} t={t} />
          </div>
        }
      />

      <Section first labelledBy="summary-title">
        <SectionHeader id="summary-title" title={r.summary} />
        <div className="flex max-w-lead flex-col gap-5">
          <p className="text-body-md text-fg-muted">{profile.intro[locale]}</p>
          <SocialLinks newTabLabel={t.common.opensInNewTab} />
        </div>
      </Section>

      <Section labelledBy="skills-title">
        <SectionHeader id="skills-title" title={r.skills} />
        <dl className="grid-fit-md gap-6">
          {skillGroups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.id} className="flex flex-col gap-3">
                <dt className="eyebrow">{t.skills.groups[g.id]}</dt>
                <dd>
                  <ChipList items={g.items.map((item) => pickText(item, locale))} />
                </dd>
              </div>
            ))}
        </dl>
      </Section>

      {experience.length > 0 && (
        <Section labelledBy="experience-title">
          <SectionHeader id="experience-title" title={r.experience} />
          <ExperienceList items={experience} locale={locale} t={t} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section labelledBy="projects-title">
          <SectionHeader id="projects-title" title={r.projects} />
          <ProjectGrid projects={projects} variant="featured" />
        </Section>
      )}

      {(education.length > 0 || certifications.length > 0) && (
        <Section labelledBy="education-title">
          <SectionHeader id="education-title" title={`${r.education} · ${r.certifications}`} />
          <ul className="flex flex-col">
            {education.map((e) => (
              <li key={e.id} className="flex flex-col gap-1 border-t border-line py-5.5">
                <p className="text-h4">{e.degree[locale]}</p>
                <p className="text-sm text-fg-muted">
                  {e.institution[locale]}
                  {e.period && <> · {formatPeriod(e.period, locale, t.common.present)}</>}
                </p>
              </li>
            ))}
            {certifications.map((c) => (
              <li key={c.id} className="flex flex-col gap-1 border-t border-line py-5.5">
                <p className="text-h4">{c.name}</p>
                <p className="text-sm text-fg-muted">
                  {c.issuer} · {formatDate(c.date, locale, "month")}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
