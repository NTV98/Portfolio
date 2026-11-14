import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { locales, type Locale } from "@/i18n/config";
import { postFrontmatterSchema, type PostFrontmatter } from "./schemas";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = PostFrontmatter & {
  slug: string;
  locale: Locale;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

/** Drafts are visible in development only. */
const includeDrafts = process.env.NODE_ENV !== "production";

function readPost(slug: string, locale: Locale): Post | undefined {
  const file = path.join(BLOG_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const result = postFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return {
    ...result.data,
    slug,
    locale,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    body: content,
  };
}

function allSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * Post in the requested locale, falling back to the other locale
 * (rendered with a language badge — never machine-translated).
 */
export function getPost(slug: string, locale: Locale): Post | undefined {
  const post = readPost(slug, locale) ?? locales.map((l) => readPost(slug, l)).find(Boolean);
  if (!post || (post.draft && !includeDrafts)) return undefined;
  return post;
}

export function getPosts(locale: Locale): PostMeta[] {
  return allSlugs()
    .map((slug) => getPost(slug, locale))
    .filter((p): p is Post => !!p)
    .map(({ body: _body, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostSlugs(): string[] {
  return allSlugs().filter((slug) => locales.some((l) => getPost(slug, l)));
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  return getPosts(post.locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: p.tags.filter((t) => post.tags.includes(t)).length }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}
