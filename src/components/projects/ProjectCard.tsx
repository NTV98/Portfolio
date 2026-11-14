import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { ProjectThumb, type Tone } from "./ProjectThumb";

/** Serializable, localized card data (built by to-card.ts). */
export type ProjectCardData = {
  slug: string;
  /** Undefined for CONFIDENTIAL projects (list-only, no detail page). */
  href?: string;
  title: string;
  summary: string;
  type: string;
  typeLabel: string;
  stackText: string;
  tone: Tone;
  cover?: { src: string; alt: string };
  /** Label of the "has video" badge; undefined when the project has no video. */
  videoLabel?: string;
};

/** Design project card: cover (or tinted mock), category, title, short summary, stack, round arrow. */
export function ProjectCard({
  project,
  size = "md",
  headingLevel = 3,
  className,
}: {
  project: ProjectCardData;
  size?: "sm" | "md";
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const badge = project.videoLabel && (
    <span className="chip gap-1.5 border-transparent bg-surface/90 text-xs shadow-pop">
      <Play aria-hidden className="size-3.5 fill-current" strokeWidth={2} />
      {project.videoLabel}
    </span>
  );
  return (
    <article className={cn("project-card relative flex flex-col gap-4.5", className)}>
      <ProjectThumb tone={project.tone} size={size} image={project.cover} badge={badge} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="label-cat">{project.typeLabel}</p>
          <Heading className={size === "sm" ? "text-h4" : "text-h3"}>
            {project.href ? (
              <Link href={project.href} className="stretched-link">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </Heading>
          <p className={cn("line-clamp-2 text-fg-muted", size === "sm" ? "text-xs" : "text-sm")}>{project.summary}</p>
          <p className="font-mono text-3xs text-accent-text">{project.stackText}</p>
        </div>
        {project.href && (
          <span
            aria-hidden
            className="card-arrow edge-bold flex size-11 flex-none items-center justify-center rounded-full border-line-strong"
          >
            <ArrowUpRight className="size-4.5" strokeWidth={2} />
          </span>
        )}
      </div>
    </article>
  );
}
