"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { basePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";

export type FilterOption = { value: string; label: string };

/** URL-synced single-select filter (?f=). Shareable and back-button safe. */
export function useUrlFilter(): [string, (value: string) => void] {
  const params = useSearchParams();
  const pathname = usePathname();
  const filter = params.get("f") ?? "";
  const set = (value: string) => {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set("f", value);
    else sp.delete("f");
    const qs = sp.toString();
    // Native history API: Next syncs useSearchParams without a server round-trip.
    // usePathname() omits basePath (GitHub Pages "/Portfolio"); the History API needs the full URL.
    const url = `${basePath}${pathname}`;
    window.history.replaceState(null, "", qs ? `${url}?${qs}` : url);
  };
  return [filter, set];
}

/** Pill toggle group: "All" + one chip per option. Selected chip is filled with the accent. */
export function FilterChips({
  value,
  options,
  allLabel,
  label,
  onChange,
  className,
}: {
  value: string;
  options: FilterOption[];
  allLabel: string;
  label: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const all: FilterOption[] = [{ value: "", label: allLabel }, ...options];
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2.5", className)}>
      {all.map((option) => (
        <button
          key={option.value || "all"}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="chip chip-button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
