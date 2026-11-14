import { localeLabels, localePath, type Locale } from "@/i18n/config";
import type { PostMeta } from "@/lib/content/posts";
import { formatDate, interpolate } from "@/lib/format";
import type { Messages } from "@/messages/vi";
import type { PostCardData } from "./PostCard";

export function toPostCard(post: PostMeta, pageLocale: Locale, t: Messages): PostCardData {
  return {
    slug: post.slug,
    href: localePath(pageLocale, `/blog/${post.slug}`),
    title: post.title,
    description: post.description,
    dateLabel: formatDate(post.date, pageLocale),
    isoDate: post.date,
    readingLabel: interpolate(t.blog.readingTime, { minutes: post.readingMinutes }),
    tags: post.tags,
    languageNote: post.locale !== pageLocale ? localeLabels[post.locale].name : undefined,
    lang: localeLabels[post.locale].htmlLang,
    draftLabel: post.draft ? t.blog.draft : undefined,
  };
}
