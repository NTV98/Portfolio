import { cn } from "@/lib/cn";

/** 40 bezier strands fanning from the bottom-left corner (generated once, server-side). */
function strands(count = 40): string {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  let d = "";
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const s = Math.sin(t * Math.PI);
    const points = [
      [lerp(30, 70, t), 690],
      [lerp(-90, 560, t), lerp(570, 90, t) + s * 60],
      [lerp(660, 80, t), lerp(30, 420, t) - s * 40],
      [lerp(300, 570, t), lerp(70, 130, t)],
    ].map(([x, y]) => `${x!.toFixed(1)} ${y!.toFixed(1)}`);
    d += `M${points[0]} C${points[1]} ${points[2]} ${points[3]} `;
  }
  return d.trim();
}

const path = strands();

/** Decorative line art behind the hero; sways slowly, fades on small screens. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute -top-15 -right-30 size-180 max-md:opacity-45", className)}>
      <svg viewBox="0 0 600 700" width="100%" height="100%" fill="none" className="anim-sway">
        <path d={path} stroke="var(--color-accent)" strokeOpacity={0.5} strokeWidth={1} />
      </svg>
    </div>
  );
}
