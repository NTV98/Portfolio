import { z } from "zod";
import { projects as rawProjects } from "@/data/projects";
import { projectSchema, type Project, type ProjectType } from "./schemas";

/** Parse + validate. Throws at build time on invalid data or duplicate slugs. */
export function parseProjects(input: unknown[]): Project[] {
  const parsed = z.array(projectSchema).parse(input);
  const seen = new Set<string>();
  for (const project of parsed) {
    if (seen.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
    seen.add(project.slug);
  }
  return parsed;
}

/**
 * The ONLY gate deciding what is public.
 * CONFIDENTIAL projects are dropped unless showGeneric — and then reduced to generic fields.
 */
export function selectVisible(all: Project[]): Project[] {
  return all
    .filter((p) => p.visibility !== "CONFIDENTIAL" || p.showGeneric)
    .map((p) =>
      p.visibility === "CONFIDENTIAL"
        ? {
            ...p,
            overview: undefined,
            problem: undefined,
            solution: undefined,
            responsibilities: undefined,
            features: undefined,
            cover: undefined,
          }
        : p,
    )
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
}

const visibleProjects = selectVisible(parseProjects(rawProjects));

export function getVisibleProjects(): Project[] {
  return visibleProjects;
}

export function getFeaturedProjects(limit = 3): Project[] {
  return visibleProjects.filter((p) => p.featured).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
  return visibleProjects.find((p) => p.slug === slug);
}

/** Detail pages exist only for PUBLIC and PRIVATE projects (CONFIDENTIAL stays list-only). */
export function getProjectSlugs(): string[] {
  return visibleProjects.filter((p) => p.visibility !== "CONFIDENTIAL").map((p) => p.slug);
}

export function hasDetailPage(project: Project): boolean {
  return project.visibility !== "CONFIDENTIAL";
}

/** Related = shares type, tags or stack; scored, excluding itself. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const score = (other: Project) =>
    (other.type === project.type ? 2 : 0) +
    other.tags.filter((t) => project.tags.includes(t)).length * 2 +
    other.stack.filter((s) => project.stack.includes(s)).length;
  return visibleProjects
    .filter((p) => p.slug !== project.slug && hasDetailPage(p))
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Previous / next project with a detail page (wraps around). Undefined when it is the only one. */
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const list = visibleProjects.filter(hasDetailPage);
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1 || list.length < 2) return {};
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

export function getProjectTypesInUse(): ProjectType[] {
  return [...new Set(visibleProjects.map((p) => p.type))];
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs.map(getProject).filter((p): p is Project => !!p && hasDetailPage(p));
}
