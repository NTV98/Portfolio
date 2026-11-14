import { describe, expect, it } from "vitest";
import { getVisibleProjects, parseProjects, selectVisible } from "@/lib/content/projects";

const base = {
  type: "COMPANY",
  status: "COMPLETED",
  title: { vi: "T", en: "T" },
  summary: { vi: "S", en: "S" },
  role: { vi: "R", en: "R" },
  stack: ["X"],
} as const;

describe("project visibility rules", () => {
  it("rejects repo/demo links on PRIVATE projects (schema is strict)", () => {
    expect(() =>
      parseProjects([{ ...base, slug: "a", visibility: "PRIVATE", repoUrl: "https://github.com/x/y" }]),
    ).toThrow();
  });

  it("rejects non-https links on PUBLIC projects", () => {
    expect(() => parseProjects([{ ...base, slug: "a", visibility: "PUBLIC", repoUrl: "http://x.y" }])).toThrow();
  });

  it("rejects duplicate slugs", () => {
    expect(() =>
      parseProjects([
        { ...base, slug: "a", visibility: "PRIVATE" },
        { ...base, slug: "a", visibility: "PRIVATE" },
      ]),
    ).toThrow(/Duplicate/);
  });

  it("drops CONFIDENTIAL projects unless showGeneric, and strips details when shown", () => {
    const parsed = parseProjects([
      { ...base, slug: "hidden", visibility: "CONFIDENTIAL", showGeneric: false, overview: { vi: "secret", en: "secret" } },
      { ...base, slug: "generic", visibility: "CONFIDENTIAL", showGeneric: true, overview: { vi: "secret", en: "secret" } },
    ]);
    const visible = selectVisible(parsed);
    expect(visible.map((p) => p.slug)).toEqual(["generic"]);
    expect(visible[0]!.overview).toBeUndefined();
  });

  it("sorts featured first", () => {
    const parsed = parseProjects([
      { ...base, slug: "b", visibility: "PRIVATE", order: 1 },
      { ...base, slug: "a", visibility: "PRIVATE", featured: true, order: 5 },
    ]);
    expect(selectVisible(parsed).map((p) => p.slug)).toEqual(["a", "b"]);
  });

  it("real project data is valid", () => {
    expect(getVisibleProjects().length).toBeGreaterThan(0);
  });
});
