import { localePath, type Locale } from "@/i18n/config";
import { getVisibleProjects, hasDetailPage } from "@/lib/content/projects";
import type { Project } from "@/lib/content/schemas";
import type { Messages } from "@/messages/vi";
import type { ProjectCardData } from "./ProjectCard";
import { toneFor, type Tone } from "./ProjectThumb";

/** Stable color per project: its position in the full visible list (same on every page). */
export function projectTone(project: Project): Tone {
  return toneFor(Math.max(0, getVisibleProjects().findIndex((p) => p.slug === project.slug)));
}

/** Video exists only on PUBLIC projects (schema-enforced). */
export function projectVideo(project: Project) {
  return project.visibility === "PUBLIC" ? project.video : undefined;
}

export function toProjectCard(project: Project, locale: Locale, t: Messages): ProjectCardData {
  return {
    slug: project.slug,
    href: hasDetailPage(project) ? localePath(locale, `/projects/${project.slug}`) : undefined,
    title: project.title[locale],
    summary: project.summary[locale],
    type: project.type,
    typeLabel: t.projects.types[project.type],
    stackText: project.stack.join(" · "),
    tone: projectTone(project),
    cover: project.cover ? { src: project.cover.src, alt: project.cover.alt[locale] } : undefined,
    videoLabel: projectVideo(project) ? t.projects.videoBadge : undefined,
  };
}
