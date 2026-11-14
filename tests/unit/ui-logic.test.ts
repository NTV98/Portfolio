import { describe, expect, it } from "vitest";
import { buildMailto } from "@/components/contact/ContactForm";
import { isPalette, palettes, themeScript } from "@/components/layout/theme";
import { pickText } from "@/i18n/config";
import { codeCard, ordinal, services, skillGroups, stackCards, workSteps } from "@/lib/content/highlights";
import { getAdjacentProjects, getProjectSlugs } from "@/lib/content/projects";

describe("contact mailto", () => {
  it("encodes subject and body, falls back to the default subject", () => {
    const url = buildMailto(
      "me@example.com",
      { name: "Nguyễn A", email: "a@b.c", subject: "  ", message: "Xin chào & hi" },
      "Liên hệ",
    );
    expect(url.startsWith("mailto:me@example.com?subject=")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Liên hệ");
    expect(params.get("body")).toBe("Xin chào & hi\n\n— Nguyễn A\na@b.c");
  });
});

describe("palettes", () => {
  it("keeps the six design palettes first, then the extra ones", () => {
    expect(palettes.slice(0, 6)).toEqual(["violet", "light", "blue", "teal", "orange", "pink"]);
    expect(palettes).toHaveLength(18);
    expect(new Set(palettes).size).toBe(palettes.length);
    expect(isPalette("teal")).toBe(true);
    expect(isPalette("dark")).toBe(false);
  });

  it("head script only applies whitelisted values", () => {
    expect(themeScript).toContain(JSON.stringify(palettes));
    expect(themeScript).toContain("data-palette");
  });
});

describe("highlight content", () => {
  it("parses and is complete in both locales", () => {
    expect(codeCard.backend.length).toBeGreaterThan(0);
    expect(stackCards).toHaveLength(2);
    expect(services).toHaveLength(4);
    expect(workSteps).toHaveLength(4);
    for (const group of skillGroups) {
      for (const item of group.items) {
        expect(pickText(item, "vi")).not.toBe("");
        expect(pickText(item, "en")).not.toBe("");
      }
    }
  });

  it("formats ordinals", () => {
    expect(ordinal(0)).toBe("01");
    expect(ordinal(9)).toBe("10");
  });
});

describe("project navigation", () => {
  it("wraps around detail-page projects", () => {
    const slugs = getProjectSlugs();
    const first = slugs[0]!;
    const { prev, next } = getAdjacentProjects(first);
    expect(next?.slug).toBe(slugs[1]);
    expect(prev?.slug).toBe(slugs[slugs.length - 1]);
    expect(getAdjacentProjects("does-not-exist")).toEqual({});
  });
});

describe("project media visibility", () => {
  it("only PUBLIC projects may carry a review video", async () => {
    const { getVisibleProjects } = await import("@/lib/content/projects");
    for (const p of getVisibleProjects()) {
      if (p.visibility !== "PUBLIC") expect("video" in p).toBe(false);
    }
  });
});
