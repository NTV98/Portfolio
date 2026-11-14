import { z } from "zod";

const text = z.string().trim().min(1);
const month = z.string().regex(/^\d{4}-\d{2}$/, "Expected YYYY-MM");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected kebab-case slug");
const httpsUrl = z.url({ protocol: /^https$/ });

export const localized = z.object({ vi: text, en: text });
export const localizedList = z.object({ vi: z.array(text), en: z.array(text) });
/** Same text in every locale (tech names) or one value per locale. */
export const textOrLocalized = z.union([text, localized]);
/** Accent key 1–6 (maps to key-N / tint-N color tokens). */
export const tone = z.number().int().min(1).max(6);

export const period = z.object({ start: month, end: month.optional() });

export const imageRef = z.object({
  src: z.string().startsWith("/"),
  alt: localized,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const projectTypes = ["PERSONAL", "OPEN_SOURCE", "COMPANY", "EXPERIMENTAL", "SIDE_PROJECT"] as const;
export const projectStatuses = ["COMPLETED", "IN_PROGRESS", "MAINTAINED", "ARCHIVED"] as const;

const projectBase = z.object({
  slug,
  type: z.enum(projectTypes),
  status: z.enum(projectStatuses),
  featured: z.boolean().default(false),
  order: z.number().int().default(100),
  title: localized,
  summary: localized,
  overview: localized.optional(),
  problem: localized.optional(),
  solution: localized.optional(),
  /** Real results only (numbers, feedback). Omit when unknown. */
  outcome: localized.optional(),
  role: localized,
  responsibilities: localizedList.optional(),
  features: localizedList.optional(),
  stack: z.array(text).min(1),
  tags: z.array(text).default([]),
  period: period.optional(),
  cover: imageRef.optional(),
});

/**
 * Visibility is enforced by the schema:
 * - PUBLIC may carry links, screenshots and architecture.
 * - PRIVATE (sanitized company work) is strict: unknown keys such as repoUrl are rejected.
 * - CONFIDENTIAL is never listed unless showGeneric is true (then only title/summary/type).
 */
export const projectSchema = z.discriminatedUnion("visibility", [
  projectBase.extend({
    visibility: z.literal("PUBLIC"),
    repoUrl: httpsUrl.optional(),
    demoUrl: httpsUrl.optional(),
    architecture: localized.optional(),
    screenshots: z.array(imageRef).default([]),
    /** Review / demo video (self-hosted under /public). PUBLIC only — never for company work. */
    video: z
      .object({
        src: z.string().startsWith("/"),
        type: z.enum(["video/webm", "video/mp4"]),
        poster: z.string().startsWith("/").optional(),
        title: localized,
      })
      .optional(),
  }),
  projectBase.extend({ visibility: z.literal("PRIVATE") }).strict(),
  projectBase.extend({ visibility: z.literal("CONFIDENTIAL"), showGeneric: z.boolean() }).strict(),
]);

export const experienceSchema = z.object({
  id: slug,
  organization: localized,
  title: localized,
  period: period.optional(),
  location: localized.optional(),
  summary: localized.optional(),
  responsibilities: localizedList,
  contributions: localizedList.optional(),
  technologies: z.array(text).default([]),
  projectSlugs: z.array(slug).default([]),
});

export const educationSchema = z.object({
  id: slug,
  institution: localized,
  degree: localized,
  period: period.optional(),
  note: localized.optional(),
});

export const certificationSchema = z.object({
  id: slug,
  name: text,
  issuer: text,
  date: month,
  url: httpsUrl.optional(),
});

export const skillGroupIds = ["backend", "frontend", "tools", "practices"] as const;

/** Skills by group. Items are plain names; NO levels, percentages or years (PRD §4). */
export const skillGroupSchema = z.object({
  id: z.enum(skillGroupIds),
  tone,
  items: z.array(textOrLocalized),
});

/** Home "stack" cards (Backend / Frontend). */
export const stackCardSchema = z.object({
  id: slug,
  title: localized,
  text: localized,
  tone,
  items: z.array(textOrLocalized).min(1),
});

/** Home "how I can help" items and About "how I work" steps share one shape. */
export const numberedItemSchema = z.object({ title: localized, text: localized });

/** Hero code card: values shown inside `const dev = { … }`. */
export const codeCardSchema = z.object({
  filename: text,
  backend: z.array(text).min(1),
  frontend: z.array(text).min(1),
  openToWork: z.boolean(),
});

export const postFrontmatterSchema = z.object({
  title: text,
  description: text.max(200),
  date: isoDate,
  updated: isoDate.optional(),
  tags: z.array(text).default([]),
  draft: z.boolean().default(false),
});

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema>;
export type ProjectType = (typeof projectTypes)[number];
export type Experience = z.output<typeof experienceSchema>;
export type Education = z.output<typeof educationSchema>;
export type Certification = z.output<typeof certificationSchema>;
export type SkillGroup = z.output<typeof skillGroupSchema>;
export type SkillGroupId = (typeof skillGroupIds)[number];
export type TextOrLocalized = z.output<typeof textOrLocalized>;
export type StackCard = z.output<typeof stackCardSchema>;
export type NumberedItem = z.output<typeof numberedItemSchema>;
export type CodeCard = z.output<typeof codeCardSchema>;
export type PostFrontmatter = z.output<typeof postFrontmatterSchema>;
