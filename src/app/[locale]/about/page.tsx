import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/config/profile";
import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { ordinal, workSteps } from "@/lib/content/highlights";
import { interpolate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/about", title: t.about.eyebrow, description: profile.intro[locale] });
}

export default async function AboutPage() {
  const { locale, t } = await getMessages();
  const a = t.about;
  const [lead, ...rest] = profile.about[locale];

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} />

      <Section first className="grid-fit-lg items-center gap-14" label={a.eyebrow}>
        {/* Portrait panel with accent disc (design). */}
        <div className="panel relative min-h-125 overflow-hidden rounded-2xl">
          <div aria-hidden className="absolute -top-25 -right-25 size-90 rounded-full bg-accent opacity-75" />
          {profile.avatar ? (
            <Image
              src={profile.avatar.src}
              width={profile.avatar.width}
              height={profile.avatar.height}
              alt={interpolate(a.portraitAlt, { name: profile.name })}
              sizes="(min-width: 900px) 560px, 100vw"
              priority
              className="relative h-full min-h-125 w-full object-cover"
            />
          ) : (
            <p className="absolute right-7.5 bottom-6.5 left-7.5 text-h4">{a.portraitPending}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-5.5">
          {lead && <p className="text-body-xl">{lead}</p>}
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-body-md text-fg-muted">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-3.5">
            <Button href={localePath(locale, "/contact")}>{a.workWithMe}</Button>
            <Button href={localePath(locale, "/experience")} variant="ghost">
              {a.seeExperience}
            </Button>
          </div>
        </div>
      </Section>

      <Section labelledBy="how-title" className="grid-fit-lg gap-14">
        <div className="flex flex-col gap-4.5">
          <Eyebrow>{a.howEyebrow}</Eyebrow>
          <h2 id="how-title" className="text-title">
            {a.howTitle}
          </h2>
        </div>
        <ol className="flex flex-col">
          {workSteps.map((step, i) => (
            <li key={step.title.en} className="flex gap-4.5 border-t border-line py-6.5">
              <span className="w-14 flex-none font-mono text-body text-accent-text">{ordinal(i)}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h4">{step.title[locale]}</h3>
                <p className="text-fg-muted">{step.text[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
