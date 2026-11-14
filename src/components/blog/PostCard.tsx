import Link from "next/link";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";

/** Serializable, localized post card data. */
export type PostCardData = {
  slug: string;
  href: string;
  title: string;
  description: string;
  dateLabel: string;
  isoDate: string;
  readingLabel: string;
  tags: string[];
  /** Set when the post is shown in another language than the page. */
  languageNote?: string;
  /** Lang attribute of the post content (may differ from page). */
  lang: string;
  draftLabel?: string;
};

export function PostMeta({ post, className }: { post: Pick<PostCardData, "dateLabel" | "isoDate" | "readingLabel">; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-accent-text", className)}>
      <time dateTime={post.isoDate}>{post.dateLabel}</time>
      <span aria-hidden>·</span>
      <span>{post.readingLabel}</span>
    </p>
  );
}

/** Article card: panel with date, title (stretched link), description, tags. */
export function PostCard({ post, headingLevel = 3 }: { post: PostCardData; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="panel panel-row relative flex h-full flex-col gap-3.5 p-7">
      <PostMeta post={post} />
      <Heading className="line-clamp-2 text-h4" lang={post.lang}>
        <Link href={post.href} className="stretched-link">
          {post.title}
        </Link>
      </Heading>
      <p className="line-clamp-3 text-sm text-fg-muted" lang={post.lang}>
        {post.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {post.draftLabel && <Chip>{post.draftLabel}</Chip>}
        {post.languageNote && <Chip>{post.languageNote}</Chip>}
        {post.tags.slice(0, 3).map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </article>
  );
}

export function PostGrid({ posts, headingLevel = 3 }: { posts: PostCardData[]; headingLevel?: 2 | 3 }) {
  return (
    <ul className="grid-fit-md gap-5">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
