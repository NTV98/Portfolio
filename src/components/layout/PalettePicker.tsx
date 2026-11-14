"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PALETTE_KEY, isPalette, paletteSwatch, palettes, type Palette } from "./theme";

/** Palette actually shown: saved attribute, else the OS default (violet dark / light). */
function currentPalette(): Palette {
  const attr = document.documentElement.getAttribute("data-palette");
  if (isPalette(attr)) return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "violet";
}

function applyPalette(palette: Palette, label: string) {
  const root = document.documentElement;
  root.setAttribute("data-palette", palette);
  try {
    localStorage.setItem(PALETTE_KEY, palette);
  } catch {
    /* storage unavailable — palette still applies for this page view */
  }
  // TEMPORARY (owner request 2026-11-14): log the pick so the owner can choose the default palette.
  // Remove once the default is decided (Docs/ROADMAP.md).
  const css = getComputedStyle(root);
  const read = (name: string) => css.getPropertyValue(name).trim();
  console.info(
    `%c🎨 Bảng màu: ${palette}%c (${label}) — muốn đặt làm mặc định, gửi tên "${palette}" cho dev.`,
    `background:${read("--p-b1")};color:${read("--p-on")};padding:2px 8px;border-radius:999px;font-weight:700`,
    "color:inherit",
    { palette, bg: read("--p-bg"), surface: read("--p-surface"), accent: read("--p-b1"), accentText: read("--p-atext") },
  );
}

/**
 * Round button showing the current accent; opens a grid of 12 swatches (design header picker, extended).
 * Closes on selection, Escape and outside click.
 */
export function PalettePicker({
  buttonLabel,
  groupLabel,
  labels,
  placement = "header",
  className,
}: {
  buttonLabel: string;
  groupLabel: string;
  labels: Record<Palette, string>;
  /** "header": opens below, right-aligned. "menu": opens above, left-aligned (mobile menu footer). */
  placement?: "header" | "menu";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Palette | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        className="icon-btn"
        aria-label={buttonLabel}
        aria-expanded={open}
        onClick={() => {
          setActive(currentPalette());
          setOpen((v) => !v);
        }}
      >
        {/* bg-accent always equals the live palette's accent — no hydration mismatch. */}
        <span aria-hidden className="swatch bg-accent" />
      </button>
      {open && (
        <div
          role="group"
          aria-label={groupLabel}
          className={cn(
            "edge-bold anim-pop absolute z-dropdown grid w-max grid-cols-6 rounded-xl border-line-strong bg-surface px-1.5 py-1 shadow-pop",
            placement === "header" ? "top-13 right-0" : "bottom-13 left-0",
          )}
        >
          {palettes.map((palette) => (
            <button
              key={palette}
              type="button"
              className="swatch-btn"
              aria-label={labels[palette]}
              title={labels[palette]}
              aria-pressed={active === palette}
              onClick={() => {
                applyPalette(palette, labels[palette]);
                setActive(palette);
                setOpen(false);
              }}
            >
              {/* Inline style is the swatch itself: it depicts a palette, not a UI color. */}
              <span aria-hidden className="swatch" style={{ background: paletteSwatch[palette] }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
