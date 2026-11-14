import { describe, expect, it } from "vitest";
import { isLocale, localePath, switchLocalePath } from "@/i18n/config";
import { en } from "@/messages/en";
import { vi } from "@/messages/vi";

function keys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe("i18n helpers", () => {
  it("builds localized paths", () => {
    expect(localePath("vi")).toBe("/vi");
    expect(localePath("en", "/projects")).toBe("/en/projects");
  });

  it("switches the locale segment and keeps the rest of the path", () => {
    expect(switchLocalePath("/vi/projects/x", "en")).toBe("/en/projects/x");
    expect(switchLocalePath("/en", "vi")).toBe("/vi");
    expect(switchLocalePath("/projects", "en")).toBe("/en/projects");
  });

  it("validates locales", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it("vi and en dictionaries have identical keys", () => {
    expect(keys(en).sort()).toEqual(keys(vi).sort());
  });
});
