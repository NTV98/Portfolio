"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips, useUrlFilter } from "@/components/ui/FilterChips";
import type { ExplorerLabels } from "@/components/projects/ProjectExplorer";
import { interpolate } from "@/lib/format";
import { PostGrid, type PostCardData } from "./PostCard";

/** Tag chips (?f=tag) + article grid. */
export function PostExplorer({ posts, tags, labels }: { posts: PostCardData[]; tags: string[]; labels: ExplorerLabels }) {
  const [filter, setFilter] = useUrlFilter();
  const results = posts.filter((p) => !filter || p.tags.includes(filter));

  return (
    <div className="flex flex-col gap-9">
      {tags.length > 1 && (
        <FilterChips
          value={filter}
          options={tags.map((tag) => ({ value: tag, label: tag }))}
          allLabel={labels.all}
          label={labels.filterLabel}
          onChange={setFilter}
        />
      )}
      <p aria-live="polite" className="sr-only">
        {interpolate(labels.resultCount, { count: results.length })}
      </p>
      {results.length > 0 ? (
        <PostGrid posts={results} headingLevel={2} />
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
