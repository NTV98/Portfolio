"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips, useUrlFilter, type FilterOption } from "@/components/ui/FilterChips";
import { interpolate } from "@/lib/format";
import type { ProjectCardData } from "./ProjectCard";
import { ProjectGrid } from "./ProjectGrid";

export type ExplorerLabels = {
  filterLabel: string;
  all: string;
  resultCount: string;
  noResultsTitle: string;
  noResultsBody: string;
  clearFilters: string;
};

/** Filter chips (?f=TYPE) + project grid. */
export function ProjectExplorer({
  projects,
  typeOptions,
  labels,
}: {
  projects: ProjectCardData[];
  typeOptions: FilterOption[];
  labels: ExplorerLabels;
}) {
  const [filter, setFilter] = useUrlFilter();
  const results = projects.filter((p) => !filter || p.type === filter);

  return (
    <div className="flex flex-col gap-9">
      {typeOptions.length > 1 && (
        <FilterChips
          value={filter}
          options={typeOptions}
          allLabel={labels.all}
          label={labels.filterLabel}
          onChange={setFilter}
        />
      )}
      <p aria-live="polite" className="sr-only">
        {interpolate(labels.resultCount, { count: results.length })}
      </p>
      {results.length > 0 ? (
        <ProjectGrid projects={results} headingLevel={2} />
      ) : (
        <EmptyState
          title={labels.noResultsTitle}
          description={labels.noResultsBody}
          action={
            <Button variant="ghost" size="sm" onClick={() => setFilter("")}>
              {labels.clearFilters}
            </Button>
          }
        />
      )}
    </div>
  );
}
