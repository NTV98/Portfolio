import type { Metadata } from "next";
import { Suspense } from "react";
import { social } from "@/config/social";
import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { getPosts } from "@/lib/content/posts";
import { pageMetadata } from "@/lib/seo";
import { PostGrid } from "@/components/blog/PostCard";
import { PostExplorer } from "@/components/blog/PostExplorer";
import { toPostCard } from "@/components/blog/to-card";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/blog", title: t.blog.eyebrow, description: t.blog.lead });
}

export default async function BlogPage() {
  const { locale, t } = await getMessages();
  const b = t.blog;
  const posts = getPosts(locale).map((p) => toPostCard(p, locale, t));
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <>
      <PageHeader eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
      <Section first label={b.eyebrow}>
        {posts.length === 0 ? (
          <EmptyState
            title={b.emptyTitle}
            description={b.emptyBody}
            action={
              <div className="flex flex-wrap gap-3">
                <Button href={localePath(locale, "/projects")} size="sm">
                  {t.nav.projects}
                </Button>
                {social.github && (
                  <Button href={social.github} external newTabLabel={t.common.opensInNewTab} variant="ghost" size="sm">
                    GitHub
                  </Button>
                )}
              </div>
            }
          />
        ) : (
          <Suspense fallback={<PostGrid posts={posts} headingLevel={2} />}>
            <PostExplorer
              posts={posts}
              tags={tags}
              labels={{
                filterLabel: b.tagsLabel,
                all: b.all,
                resultCount: b.resultCount,
                noResultsTitle: b.noResultsTitle,
                noResultsBody: b.noResultsBody,
                clearFilters: b.clearFilters,
              }}
            />
          </Suspense>
        )}
      </Section>
    </>
  );
}
