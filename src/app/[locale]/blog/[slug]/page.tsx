import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { localeLabels, localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/content/posts";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { MdxContent } from "@/components/blog/MdxContent";
import { PostGrid, PostMeta } from "@/components/blog/PostCard";
import { toPostCard } from "@/components/blog/to-card";
import { Container, Section, SectionHeader } from "@/components/layout/Primitives";
import { Chip } from "@/components/ui/Chip";
import { TextLink } from "@/components/ui/TextLink";

/** Unknown slugs render on demand and call notFound() → localized 404 with site chrome. */
export const dynamicParams = true;

export function generateStaticParams() {
  // No posts → no article pages (the listing shows an empty state).
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getMessages();
  const post = getPost(slug, locale);
  if (!post) return {};
  return pageMetadata({ locale, path: `/blog/${slug}`, title: post.title, description: post.description, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getMessages();
  const post = getPost(slug, locale);
  if (!post) notFound();

  const card = toPostCard(post, locale, t);
  const related = getRelatedPosts(post).map((p) => toPostCard(p, locale, t));

  return (
    <>
      <Container size="prose" className="page-top">
        <TextLink href={localePath(locale, "/blog")}>
          <ArrowLeft aria-hidden strokeWidth={2} />
          {t.blog.back}
        </TextLink>
        <article lang={localeLabels[post.locale].htmlLang} className="mt-6">
          <header className="flex flex-col gap-4.5 border-b border-line pb-10">
            <PostMeta post={card} />
            <h1 className="text-h2">{post.title}</h1>
            <p className="text-body-lg text-fg-muted">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.draft && <Chip>{t.blog.draft}</Chip>}
              {card.languageNote && <Chip>{card.languageNote}</Chip>}
              {post.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            {post.updated && (
              <p className="text-xs text-fg-muted">
                {t.blog.updatedOn} {formatDate(post.updated, locale)}
              </p>
            )}
          </header>
          <div className="pt-10">
            <MdxContent source={post.body} />
          </div>
        </article>
      </Container>

      {related.length > 0 && (
        <Section labelledBy="related-title">
          <SectionHeader id="related-title" title={t.blog.related} />
          <PostGrid posts={related} />
        </Section>
      )}
    </>
  );
}
