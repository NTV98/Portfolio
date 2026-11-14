import { describe, expect, it } from "vitest";
import { formatDate, formatPeriod, initials, interpolate, isPlaceholder, normalize } from "@/lib/format";

describe("format helpers", () => {
  it("interpolates tokens", () => {
    expect(interpolate("{count} dự án", { count: 3 })).toBe("3 dự án");
  });

  it("formats dates deterministically per locale (UTC)", () => {
    expect(formatDate("2026-11-14", "en")).toBe("Nov 14, 2026");
    expect(formatDate("2026-11-14", "vi")).toContain("2026");
    expect(formatDate("2024-03", "en")).toBe("Mar 2024");
  });

  it("formats open-ended periods", () => {
    expect(formatPeriod({ start: "2024-03" }, "en", "Present")).toBe("Mar 2024 — Present");
  });

  it("detects placeholders", () => {
    expect(isPlaceholder("[PLACEHOLDER] Name")).toBe(true);
    expect(isPlaceholder("Real Name")).toBe(false);
    expect(isPlaceholder(undefined)).toBe(true);
  });

  it("builds initials and accent-insensitive search text", () => {
    expect(initials("Portfolio Website")).toBe("PW");
    expect(normalize("Đường Ống Dữ Liệu")).toBe("duong ong du lieu");
  });
});
