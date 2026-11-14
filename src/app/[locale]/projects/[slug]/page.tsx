import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { ordinal } from "@/lib/content/highlights";
import { getAdjacentProjects, getProject, getProjectSlugs } from "@/lib/content/projects";
import type { Project } from "@/lib/content/schemas";
import { formatPeriod } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Primitives";
import { ProjectThumb } from "@/components/projects/ProjectThumb";
import { projectTone } from "@/components/projects/to-card";
import { Button } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { TextLink } from "@/components/ui/TextLink";

/** Unknown slugs render on demand and call notFound() → localized 404 with site chrome. */
export const dynamicParams = true;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getMessages();
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.title[locale],
    description: project.summary[locale],
    type: "article",
  });
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-5.5">
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getMessages();
  const project = getProject(slug);
  if (!project || project.visibility === "CONFIDENTIAL") notFound();

  const d = t.projects.detail;
  const pub = project.visibility === "PUBLIC" ? (project as Extract<Project, { visibility: "PUBLIC" }>) : undefined;
  const { prev, next } = getAdjacentProjects(project.slug);

  // Numbered story blocks (design: 01 Bài toán · 02 Giải pháp · 03 Kết quả) — only those with content.
  const blocks: { title: string; body: ReactNode }[] = [];
  const text = (value?: { vi: string; en: string }) => value && <p>{value[locale]}</p>;
  const list = (value?: { vi: string[]; en: string[] }) =>
    value && (
      <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-accent-text">
        {value[locale].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if (project.overview) blocks.push({ title: d.overview, body: text(project.overview) });
  if (project.problem) blocks.push({ title: d.problem, body: text(project.problem) });
  if (project.solution) blocks.push({ title: d.solution, body: text(project.solution) });
  if (project.responsibilities) blocks.push({ title: d.responsibilities, body: list(project.responsibilities) });
  if (project.features) blocks.push({ title: d.features, body: list(project.features) });
  if (pub?.architecture) blocks.push({ title: d.architecture, body: text(pub.architecture) });
  if (project.outcome) blocks.push({ title: d.outcome, body: text(project.outcome) });

  const links = pub && (pub.repoUrl || pub.demoUrl);

  return (
    <>
      <section className="container-page page-top flex flex-col items-start gap-4.5 pb-12">
        <TextLink href={localePath(locale, "/projects")}>
          <ArrowLeft aria-hidden strokeWidth={2} />
          {d.back}
        </TextLink>
        <p className="eyebrow">{t.projects.types[project.type]}</p>
        <h1 className="max-w-heading text-h1">{project.title[locale]}</h1>
        <p className="max-w-170 text-body-lg text-fg-muted">{project.summary[locale]}</p>
        {!pub && (
          <p className="inline-flex items-center gap-2 text-sm text-fg-muted">
            <Lock aria-hidden className="size-4" strokeWidth={2} />
            {d.privateNote}
          </p>
        )}
      </section>

      <Section first label={d.role}>
        <dl className="grid-fit-sm gap-6">
          <Meta label={d.role}>{project.role[locale]}</Meta>
          <Meta label={d.timeline}>
            {project.period ? formatPeriod(project.period, locale, t.common.present) : t.projects.status[project.status]}
          </Meta>
          <Meta label={d.stack}>{project.stack.join(" · ")}</Meta>
          <Meta label={d.links}>
            {links ? (
              <span className="flex flex-wrap gap-x-4">
                {pub.repoUrl && (
                  <a href={pub.repoUrl} target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-4">
                    {d.sourceCode}
                    <span className="sr-only">{t.common.opensInNewTab}</span>
                  </a>
                )}
                {pub.demoUrl && (
                  <a href={pub.demoUrl} target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-4">
                    {d.liveDemo}
                    <span className="sr-only">{t.common.opensInNewTab}</span>
                  </a>
                )}
              </span>
            ) : (
              <span className="font-normal text-fg-muted">{d.noLinks}</span>
            )}
          </Meta>
        </dl>
      </Section>

      <Section first className="pt-6" label={project.title[locale]}>
        <ProjectThumb
          tone={projectTone(project)}
          size="lg"
          priority
          image={project.cover ? { src: project.cover.src, alt: project.cover.alt[locale] } : undefined}
        />
      </Section>

      {pub?.video && (
        <Section labelledBy="video-title" className="pt-18" first>
          <h2 id="video-title" className="mb-6 text-title">
            {d.video}
          </h2>
          <figure className="overflow-hidden rounded-2xl border border-line bg-code-bg">
            {/* Native player: keyboard accessible, no autoplay, loads only metadata until played. */}
            <video
              controls
              preload="metadata"
              playsInline
              poster={pub.video.poster}
              aria-label={pub.video.title[locale]}
              className="aspect-video w-full"
            >
              <source src={pub.video.src} type={pub.video.type} />
              {d.videoFallback}
            </video>
            <figcaption className="px-6 py-4 text-sm text-code-muted">{pub.video.title[locale]}</figcaption>
          </figure>
        </Section>
      )}

      <Section first className="pt-18" label={d.stack}>
        <ChipList items={project.stack} className="mb-10" />
        {blocks.length > 0 && (
          <ol className="flex flex-col border-b border-line">
            {blocks.map((block, i) => (
              <li key={block.title} className="flex gap-4.5 border-t border-line py-7.5">
                <span className="w-14 flex-none font-mono text-accent-text">{ordinal(i)}</span>
                <div className="flex max-w-175 flex-col gap-2.5">
                  <h2 className="text-h3">{block.title}</h2>
                  <div className="text-body-md text-fg-muted">{block.body}</div>
                </div>
              </li>
            ))}
          </ol>
        )}
        {pub && pub.screenshots.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-title">{d.gallery}</h2>
            <ul className="grid-fit-lg gap-6">
              {pub.screenshots.map((shot) => (
                <li key={shot.src}>
                  <figure className="flex flex-col gap-3">
                    <Image
                      src={shot.src}
                      alt={shot.alt[locale]}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 900px) 50vw, 100vw"
                      className="rounded-xl border border-line"
                    />
                    <figcaption className="text-sm text-fg-muted">{shot.alt[locale]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {(prev || next) && (
        <nav aria-label={t.projects.eyebrow} className="container-page flex flex-wrap justify-between gap-4 pt-10">
          {prev && (
            <Button
              href={localePath(locale, `/projects/${prev.slug}`)}
              variant="ghost"
              iconStart={<ArrowLeft aria-hidden strokeWidth={2} />}
            >
              {d.prev}
            </Button>
          )}
          {next && (
            <Button
              href={localePath(locale, `/projects/${next.slug}`)}
              icon={<ArrowRight aria-hidden strokeWidth={2} />}
              className="ml-auto"
            >
              {d.next}
            </Button>
          )}
        </nav>
      )}
    </>
  );
}
