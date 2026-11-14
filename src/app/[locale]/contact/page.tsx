import type { Metadata } from "next";
import type { ReactNode } from "react";
import { profile } from "@/config/profile";
import { getMessages } from "@/i18n/server";
import { isPlaceholder } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MessageCircle } from "lucide-react";
import { getPublicEmail, getPublicPhone, getSocialLinks, getZaloHref, SocialLinks } from "@/components/contact/SocialLinks";
import { Button } from "@/components/ui/Button";
import { PageHeader, Section } from "@/components/layout/Primitives";
import { EmptyState } from "@/components/ui/EmptyState";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getMessages();
  return pageMetadata({ locale, path: "/contact", title: t.contact.eyebrow, description: t.contact.lead });
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-5.5">
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="text-h4 break-words">{children}</dd>
    </div>
  );
}

/**
 * Contact without a backend (site.contactMode = "mailto"): the form composes an email in the
 * visitor's mail app. While the email is a placeholder, the form is replaced by an honest notice.
 */
export default async function ContactPage() {
  const { locale, t } = await getMessages();
  const c = t.contact;
  const email = getPublicEmail();
  const phone = getPublicPhone();
  const zalo = getZaloHref();
  const location = profile.location && !isPlaceholder(profile.location[locale]) ? profile.location[locale] : undefined;
  const hasSocial = getSocialLinks().length > 0;
  const pending = <span className="text-body font-normal text-fg-muted">{c.notConfigured}</span>;

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section first label={c.eyebrow} className="grid-fit-lg items-start gap-14">
        <dl className="flex flex-col">
          <Row label={c.email}>
            {email ? (
              <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">
                {email}
              </a>
            ) : (
              pending
            )}
          </Row>
          {(phone || zalo) && (
            <Row label={c.phone}>
              <span className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {phone && (
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="underline-offset-4 hover:underline">
                    {phone}
                  </a>
                )}
                {zalo && (
                  <Button
                    href={zalo}
                    external
                    newTabLabel={t.common.opensInNewTab}
                    variant="ghost"
                    size="sm"
                    icon={<MessageCircle aria-hidden strokeWidth={2} />}
                  >
                    {c.zalo}
                  </Button>
                )}
              </span>
            </Row>
          )}
          <Row label={c.location}>{location ?? pending}</Row>
          {hasSocial && (
            <div className="flex flex-col gap-3.5 border-t border-line py-5.5">
              <dt className="text-xs text-fg-muted">{c.social}</dt>
              <dd>
                <SocialLinks newTabLabel={t.common.opensInNewTab} />
              </dd>
            </div>
          )}
        </dl>

        {email ? (
          <ContactForm to={email} labels={c.form} />
        ) : (
          <EmptyState title={c.form.unconfiguredTitle} description={c.form.unconfiguredBody} />
        )}
      </Section>
    </>
  );
}
