import type { Metadata } from "next";
import { Suspense } from "react";
import { getMessages } from "@/i18n/server";
import { getProjectTypesInUse, getVisibleProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { toProjectCard } from "@/components/projects/to-card";
import { EmptyState } from "@/components/ui/EmptyState";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/projects", title: t.projects.eyebrow, description: t.projects.lead });
}

export default async function ProjectsPage() {
  const { locale, t } = await getMessages();
  const p = t.projects;
  const cards = getVisibleProjects().map((project) => toProjectCard(project, locale, t));
  const typeOptions = getProjectTypesInUse().map((type) => ({ value: type, label: p.filters[type] }));

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} className="pb-10" />
      <Section first label={p.eyebrow}>
        {cards.length === 0 ? (
          <EmptyState title={p.emptyTitle} description={p.emptyBody} />
        ) : (
          // Static HTML contains the full list (works without JS); the client island adds filtering.
          <Suspense fallback={<ProjectGrid projects={cards} headingLevel={2} />}>
            <ProjectExplorer
              projects={cards}
              typeOptions={typeOptions}
              labels={{
                filterLabel: p.filterLabel,
                all: p.all,
                resultCount: p.resultCount,
                noResultsTitle: p.noResultsTitle,
                noResultsBody: p.noResultsBody,
                clearFilters: p.clearFilters,
              }}
            />
          </Suspense>
        )}
      </Section>
    </>
  );
}
