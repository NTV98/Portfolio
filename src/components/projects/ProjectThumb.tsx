import type { ReactNode } from "react";
import { asset } from "@/lib/base-path";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type Tone = 1 | 2 | 3 | 4 | 5 | 6;

const tint: Record<Tone, string> = {
  1: "bg-tint-1",
  2: "bg-tint-2",
  3: "bg-tint-3",
  4: "bg-tint-4",
  5: "bg-tint-5",
  6: "bg-tint-6",
};
export const keyBg: Record<Tone, string> = {
  1: "bg-key-1",
  2: "bg-key-2",
  3: "bg-key-3",
  4: "bg-key-4",
  5: "bg-key-5",
  6: "bg-key-6",
};

export function toneFor(index: number): Tone {
  return ((index % 6) + 1) as Tone;
}

/**
 * Abstract browser-window illustration on a category tint (design thumbs).
 * With `image` (the project cover) the picture fills the frame instead.
 * `.thumb` / `.thumb-inner` hook into `project-card` hover.
 */
export function ProjectThumb({
  tone,
  size = "md",
  image,
  priority = false,
  badge,
  className,
}: {
  tone: Tone;
  size?: "sm" | "md" | "lg";
  /** Cover image; `alt` is used only on the large (detail) frame — card thumbs are decorative. */
  image?: { src: string; alt: string };
  priority?: boolean;
  /** Small label in the top-left corner (e.g. "Video"). */
  badge?: ReactNode;
  className?: string;
}) {
  const lg = size === "lg";
  const frame = cn(
    "thumb relative overflow-hidden",
    tint[tone],
    size === "sm" && "h-65 rounded-xl",
    size === "md" && "h-75 rounded-xl",
    lg && "media-tall rounded-2xl border border-line",
    className,
  );

  if (image) {
    return (
      <div className={frame} aria-hidden={lg ? undefined : true}>
        <div className="thumb-inner absolute inset-0">
          <Image
            src={asset(image.src)}
            alt={lg ? image.alt : ""}
            fill
            priority={priority}
            sizes={lg ? "(min-width: 1200px) 1100px, 100vw" : "(min-width: 900px) 560px, 100vw"}
            className="object-cover object-top"
          />
        </div>
        {badge && <span className="absolute bottom-4 left-4">{badge}</span>}
      </div>
    );
  }

  return (
    <div aria-hidden className={frame}>
      {badge && <span className="absolute bottom-4 left-4 z-raised">{badge}</span>}
      <div className="thumb-inner absolute inset-0">
        <div
          className={cn(
            "absolute border border-line bg-surface shadow-mock",
            lg ? "inset-x-1/7 top-1/8 -bottom-1/16 rounded-t-2xl" : "inset-x-1/8 top-1/6 -bottom-1/12 rounded-t-lg",
          )}
        >
          <div className={cn("flex", lg ? "gap-2 px-5 py-4.5" : "gap-1.5 px-3.5 py-3")}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("rounded-full bg-line-strong", lg ? "size-2.75" : "size-2")} />
            ))}
          </div>
          <div className={cn("rounded-full", keyBg[tone], lg ? "mx-8 mt-2.5 h-5 w-1/3" : "mx-4.5 mt-1 h-3 w-11/25")} />
          <div className={cn("rounded-full bg-line", lg ? "mx-8 mt-5 h-3 w-7/10" : "mx-4.5 mt-3 h-2.25 w-18/25")} />
          <div className={cn("rounded-full bg-line", lg ? "mx-8 mt-3 h-3 w-27/50" : "mx-4.5 mt-2.5 h-2.25 w-14/25")} />
          {size !== "sm" && (
            <div className={cn("flex", lg ? "mx-8 mt-8 gap-5" : "mx-5 mt-5 gap-3")}>
              <div className={cn("flex-1 rounded-md", tint[tone], lg ? "h-35" : "h-15")} />
              <div className={cn("flex-1 rounded-md bg-surface-2", lg ? "h-35" : "h-15")} />
              {lg && <div className={cn("h-35 flex-1 rounded-md", tint[tone])} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
