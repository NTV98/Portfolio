import { cn } from "@/lib/cn";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

/**
 * `featured`: 3-up row of compact cards (Home).
 * `list`: 2-up large cards, even ones dropped on wide screens (Projects page).
 */
export function ProjectGrid({
  projects,
  variant = "list",
  headingLevel = 3,
}: {
  projects: ProjectCardData[];
  variant?: "featured" | "list";
  headingLevel?: 2 | 3;
}) {
  const list = variant === "list";
  return (
    <ul className={cn(list ? "grid-fit-xl items-start gap-x-8 gap-y-10" : "grid-fit-md gap-8")}>
      {projects.map((project) => (
        <li key={project.slug} className={cn(list && "stagger-even")}>
          <ProjectCard project={project} size={list ? "md" : "sm"} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
