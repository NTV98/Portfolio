import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { EmptyState } from "@/components/ui/EmptyState";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/experience", title: t.experience.eyebrow, description: t.experience.lead });
}

export default async function ExperiencePage() {
  const { locale, t } = await getMessages();
  const e = t.experience;
  return (
    <>
      <PageHeader eyebrow={e.eyebrow} title={e.title} />
      <Section first label={e.eyebrow}>
        {experience.length > 0 ? (
          <ExperienceList items={experience} locale={locale} t={t} />
        ) : (
          <EmptyState title={e.emptyTitle} description={e.emptyBody} />
        )}
      </Section>
    </>
  );
}
