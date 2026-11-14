import Image from "next/image";
import { asset } from "@/lib/base-path";
import { profile } from "@/config/profile";
import { cn } from "@/lib/cn";

const sizes = {
  sm: { box: "size-10", px: 40 },
  md: { box: "size-14", px: 56 },
} as const;

/**
 * Round profile photo (cropped from the 4:5 portrait, face near the top).
 * Falls back to the monogram ring when no avatar is configured.
 */
export function Avatar({ size = "sm", alt = "", className }: { size?: keyof typeof sizes; alt?: string; className?: string }) {
  const s = sizes[size];
  if (!profile.avatar) {
    return (
      <span
        aria-hidden={!alt}
        className={cn(
          "flex flex-none items-center justify-center rounded-full border-2 border-accent-text text-sm font-bold text-accent-text",
          s.box,
          className,
        )}
      >
        {profile.monogram}
      </span>
    );
  }
  return (
    <span className={cn("relative flex-none overflow-hidden rounded-full ring-2 ring-accent", s.box, className)}>
      <Image
        src={asset(profile.avatar.src)}
        alt={alt}
        width={s.px * 2}
        height={Math.round((s.px * 2 * profile.avatar.height) / profile.avatar.width)}
        sizes={`${s.px}px`}
        className="size-full object-cover object-top"
      />
    </span>
  );
}
