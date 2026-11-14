import { social } from "@/config/social";
import { isPlaceholder } from "@/lib/format";
import { cn } from "@/lib/cn";

export type SocialLink = { label: string; href: string };

/** Only configured, non-placeholder channels are returned — no dead links. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (social.github) links.push({ label: "GitHub", href: social.github });
  if (social.linkedin) links.push({ label: "LinkedIn", href: social.linkedin });
  if (social.facebook) links.push({ label: "Facebook", href: social.facebook });
  for (const other of social.others) links.push({ label: other.label, href: other.url });
  return links;
}

export function getPublicEmail(): string | undefined {
  return social.email && !isPlaceholder(social.email) ? social.email : undefined;
}

export function getPublicPhone(): string | undefined {
  return social.phone && !isPlaceholder(social.phone) ? social.phone : undefined;
}

/** Zalo chat link (https://zalo.me/<digits>) or undefined when not configured. */
export function getZaloHref(): string | undefined {
  const digits = social.zalo?.replace(/\D/g, "");
  return digits && digits.length >= 9 ? `https://zalo.me/${digits}` : undefined;
}

/** Social chips: accent outline + soft wash on hover. */
export function SocialLinks({ newTabLabel, className }: { newTabLabel: string; className?: string }) {
  const links = getSocialLinks();
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="chip chip-link">
            {link.label}
            <span className="sr-only">{newTabLabel}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
