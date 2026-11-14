import type { Metadata } from "next";
import { site } from "@/config/site";
import { getMessages } from "@/i18n/server";
import { formatDate, interpolate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHeader } from "@/components/layout/Primitives";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/privacy", title: t.privacy.title, description: t.privacy.sections[0]!.body });
}

export default async function PrivacyPage() {
  const { locale, t } = await getMessages();
  return (
    <>
      <PageHeader
        size="prose"
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        lead={interpolate(t.privacy.updated, { date: formatDate(site.privacyUpdated, locale) })}
      />
      <Container size="prose">
        <div className="prose">
          {t.privacy.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
