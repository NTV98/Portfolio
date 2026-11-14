"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLinks, type NavLinkItem } from "./NavLinks";

/**
 * Full-screen menu below lg, built on native <dialog> (focus trap + Esc for free).
 * Closes on navigation. Body scroll is locked via `html:has(dialog[open])`.
 */
export function MobileNav({
  items,
  openLabel,
  closeLabel,
  navLabel,
  brand,
  footer,
}: {
  items: NavLinkItem[];
  openLabel: string;
  closeLabel: string;
  navLabel: string;
  brand: ReactNode;
  footer?: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="icon-btn"
      >
        <Menu aria-hidden className="size-5" strokeWidth={2} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={navLabel}
        className="z-modal m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg backdrop:bg-transparent"
      >
        <div className="header-safe container-page flex min-h-full flex-col py-6">
          <div className="flex items-center justify-between gap-4">
            {brand}
            <button type="button" aria-label={closeLabel} onClick={close} className="icon-btn">
              <X aria-hidden className="size-5" strokeWidth={2} />
            </button>
          </div>
          <nav aria-label={navLabel} className="flex-1 py-10">
            <NavLinks items={items} layout="stack" onNavigate={close} />
          </nav>
          {footer && <div className="flex items-center gap-3 border-t border-line pt-6">{footer}</div>}
        </div>
      </dialog>
    </>
  );
}
