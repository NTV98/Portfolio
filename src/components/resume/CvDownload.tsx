import { Download } from "lucide-react";
import { asset } from "@/lib/base-path";
import { localePath, type Locale } from "@/i18n/config";
import { getCvHref } from "@/lib/content/assets";
import type { Messages } from "@/messages/vi";
import { Button } from "@/components/ui/Button";

/**
 * Real download when the PDF exists in /public; otherwise an honest "on request" note
 * with a link to Contact — never a dead button.
 */
export function CvDownload({ locale, t }: { locale: Locale; t: Messages }) {
  const href = getCvHref(locale);
  if (href) {
    return (
      <Button href={asset(href)} download icon={<Download aria-hidden />}>
        {t.resume.download}
      </Button>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-fg-muted">{t.resume.unavailable}</p>
      <Button href={localePath(locale, "/contact")} variant="ghost" size="sm">
        {t.resume.requestCv}
      </Button>
    </div>
  );
}
