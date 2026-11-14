import { localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { PageHeader } from "@/components/layout/Primitives";
import { Button } from "@/components/ui/Button";

/** Rendered when a page calls notFound() (e.g. unknown project slug). */
export default async function NotFound() {
  const { locale, t } = await getMessages();
  return (
    <PageHeader
      eyebrow={t.notFound.eyebrow}
      title={t.notFound.title}
      lead={t.notFound.body}
      actions={
        <>
          <Button href={localePath(locale)}>{t.notFound.home}</Button>
          <Button href={localePath(locale, "/projects")} variant="ghost">
            {t.nav.projects}
          </Button>
        </>
      }
    />
  );
}
