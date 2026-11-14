import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { profile } from "@/config/profile";
import { experience } from "@/data/experience";
import { localePath, pickText } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { codeCard, ordinal, services, stackCards } from "@/lib/content/highlights";
import { getFeaturedProjects, getProjectTypesInUse } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";
import { CodeCard } from "@/components/home/CodeCard";
import { HeroArt } from "@/components/home/HeroArt";
import { Section, SectionHeader } from "@/components/layout/Primitives";
import { ExperienceSummary } from "@/components/experience/ExperienceSummary";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { keyBg, type Tone } from "@/components/projects/ProjectThumb";
import { toProjectCard } from "@/components/projects/to-card";
import { Button } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/", description: t.meta.siteDescription, type: "profile" });
}

export default async function HomePage() {
  const { locale, t } = await getMessages();
  const h = t.home;
  const featured = getFeaturedProjects(3).map((p) => toProjectCard(p, locale, t));
  const hasOpenSource = getProjectTypesInUse().includes("OPEN_SOURCE");

  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <section className="container-page page-top grid-fit-xl relative items-center gap-12 pb-10">
        <HeroArt />
        <div className="relative flex items-stretch gap-6.5">
          <div aria-hidden className="flex flex-none flex-col items-center">
            <span className="size-3.5 rounded-full bg-accent shadow-dot" />
            <span className="anim-grow w-0.75 flex-1 rounded-full bg-linear-to-b from-accent to-transparent" />
          </div>
          <div className="flex flex-col items-start gap-5.5 pb-2">
            {profile.availability && (
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-fg-muted">
                <span aria-hidden className="anim-live size-2 rounded-full bg-live" />
                {profile.availability[locale]}
              </p>
            )}
            <h1 className="text-display">
              {h.greeting} <span className="text-accent-text">{profile.name}</span>
            </h1>
            <p className="max-w-hero text-lead">{profile.headline[locale]}</p>
            <p className="max-w-lead text-body-md text-fg-muted">{profile.intro[locale]}</p>
            <div className="mt-1.5 flex flex-wrap gap-3.5">
              <Button href={localePath(locale, "/projects")} icon={<ArrowRight aria-hidden strokeWidth={2} />}>
                {h.ctaProjects}
              </Button>
              <Button href={localePath(locale, "/contact")} variant="ghost" icon={<MessageCircle aria-hidden strokeWidth={2} />}>
                {h.ctaContact}
              </Button>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center py-5">
          <CodeCard name={profile.name} data={codeCard} label={h.codeLabel} />
        </div>
      </section>

      {/* Stack ------------------------------------------------------------ */}
      <Section labelledBy="stack-title" first className="pt-24">
        <SectionHeader
          id="stack-title"
          eyebrow={h.stackEyebrow}
          title={h.stackTitle}
          action={
            <Button href={localePath(locale, "/skills")} variant="ghost" size="sm" icon={<ArrowRight aria-hidden strokeWidth={2} />}>
              {h.allSkills}
            </Button>
          }
        />
        <ul className="grid-fit-xl gap-6">
          {stackCards.map((card) => (
            <li key={card.id} className="panel flex flex-col gap-5.5 p-7 md:p-9">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className={`size-3 rounded-full ${keyBg[card.tone as Tone]}`} />
                <h3 className="text-h3">{card.title[locale]}</h3>
              </div>
              <p className="text-fg-muted">{card.text[locale]}</p>
              <ChipList items={card.items.map((item) => pickText(item, locale))} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Services --------------------------------------------------------- */}
      <Section labelledBy="services-title">
        <SectionHeader id="services-title" title={h.servicesTitle} />
        <ul className="grid-fit-sm gap-5">
          {services.map((item, i) => (
            <li key={item.title.en} className="panel panel-row flex flex-col gap-3.5 p-7">
              <span className="font-mono text-xs text-accent-text">{ordinal(i)}</span>
              <h3 className="text-h4">{item.title[locale]}</h3>
              <p className="text-sm text-fg-muted">{item.text[locale]}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Featured projects ------------------------------------------------ */}
      {featured.length > 0 && (
        <Section labelledBy="featured-title">
          <SectionHeader
            id="featured-title"
            eyebrow={h.featuredEyebrow}
            title={h.featuredTitle}
            className="mb-12"
            action={
              <Button href={localePath(locale, "/projects")} variant="ghost" size="sm" icon={<ArrowRight aria-hidden strokeWidth={2} />}>
                {h.allProjects}
              </Button>
            }
          />
          <ProjectGrid projects={featured} variant="featured" />
        </Section>
      )}

      {/* Experience ------------------------------------------------------- */}
      {experience.length > 0 && (
        <Section labelledBy="experience-title" className="grid-fit-lg gap-14">
          <div className="flex flex-col items-start gap-5.5">
            <Eyebrow>{h.experienceEyebrow}</Eyebrow>
            <h2 id="experience-title" className="text-h2">
              {h.experienceTitle}
            </h2>
            <p className="max-w-110 text-body-md text-fg-muted">{profile.experienceSummary[locale]}</p>
            <Button href={localePath(locale, "/experience")} variant="ghost" size="sm" icon={<ArrowRight aria-hidden strokeWidth={2} />}>
              {h.experienceMore}
            </Button>
          </div>
          <ExperienceSummary items={experience.slice(0, 3)} locale={locale} presentLabel={t.common.present} />
        </Section>
      )}

      {/* Open source banner ----------------------------------------------- */}
      {hasOpenSource && (
        <Section labelledBy="oss-title">
          <div className="panel relative flex flex-wrap items-center justify-between gap-7 overflow-hidden p-7 md:p-12">
            <div aria-hidden className="glow-blob -top-30 -right-20 size-80 opacity-16 blur-3xl" />
            <div className="relative flex max-w-160 flex-col gap-3">
              <h2 id="oss-title" className="text-title">
                {h.ossTitle}
              </h2>
              <p className="text-fg-muted">{profile.openSourceBlurb[locale]}</p>
            </div>
            <Button href={`${localePath(locale, "/projects")}?f=OPEN_SOURCE`} className="relative" icon={<ArrowUpRight aria-hidden strokeWidth={2} />}>
              {h.ossCta}
            </Button>
          </div>
        </Section>
      )}

      {/* Final CTA -------------------------------------------------------- */}
      <Section labelledBy="cta-title">
        <div className="relative flex flex-col items-start gap-7 overflow-hidden rounded-3xl border border-line bg-surface px-6 py-10 md:px-16 md:py-20">
          <div aria-hidden className="glow-blob -bottom-40 -left-30 size-110 opacity-20 blur-3xl" />
          <h2 id="cta-title" className="relative max-w-215 text-display">
            {h.ctaTitle}
          </h2>
          <Button href={localePath(locale, "/contact")} size="lg" className="relative" icon={<ArrowRight aria-hidden strokeWidth={2} />}>
            {h.ctaButton}
          </Button>
        </div>
      </Section>
    </>
  );
}
