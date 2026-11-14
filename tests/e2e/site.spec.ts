import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "",
  "/about",
  "/skills",
  "/projects",
  "/projects/portfolio-website",
  "/experience",
  "/resume",
  "/blog",
  "/contact",
  "/privacy",
];
const widths = [360, 768, 1280];

test.describe("routing & i18n", () => {
  test("root redirects by Accept-Language", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "en-US" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await ctx.close();
  });

  test("every page renders with one h1 and correct lang in both locales", async ({ page }) => {
    test.slow(); // visits every page twice
    for (const locale of ["vi", "en"]) {
      for (const path of pages) {
        const res = await page.goto(`/${locale}${path}`);
        expect(res?.status(), `${locale}${path}`).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1"), `${locale}${path}`).toHaveCount(1);
      }
    }
  });

  test("language switcher keeps the current path", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/vi/projects/portfolio-website");
    await page.getByRole("link", { name: /English/ }).first().click();
    await expect(page).toHaveURL(/\/en\/projects\/portfolio-website$/);
    await expect(page.locator("h1")).toHaveText("Personal Portfolio Website");
  });

  test("unknown paths and slugs return a localized 404 with site chrome", async ({ page }) => {
    for (const path of ["/vi/does-not-exist", "/vi/projects/does-not-exist", "/vi/blog/does-not-exist"]) {
      expect((await page.goto(path))?.status(), path).toBe(404);
      await expect(page.locator("h1"), path).toHaveText("Không tìm thấy trang");
      await expect(page.locator("header"), path).toBeVisible();
    }
    await page.goto("/en/nope");
    await expect(page.locator("h1")).toHaveText("Page not found");
  });

  test("all internal links on every page resolve", async ({ page, request }) => {
    test.slow();
    const seen = new Set<string>();
    for (const locale of ["vi", "en"]) {
      for (const path of pages) {
        await page.goto(`/${locale}${path}`);
        const hrefs = await page
          .locator("a[href^='/']")
          .evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
        hrefs.forEach((h) => seen.add(h.split("#")[0] ?? h));
      }
    }
    for (const href of seen) {
      const res = await request.get(href, { maxRedirects: 0 });
      expect([200, 307, 308], href).toContain(res.status());
    }
  });
});

test.describe("palette", () => {
  test("picker applies a palette and it persists across reloads", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/vi");
    const html = page.locator("html");
    await expect(html).not.toHaveAttribute("data-palette", /.+/);
    await page.getByRole("button", { name: "Chọn màu chủ đề" }).click();
    const logged = page.waitForEvent("console", (msg) => msg.text().includes("Bảng màu: teal"));
    await page.getByRole("button", { name: "Màu xanh ngọc" }).click();
    await expect(html).toHaveAttribute("data-palette", "teal");
    await logged; // pick is logged so the owner can choose a default
    // Full reload: the inline head script must restore the palette before paint.
    await page.goto("/vi/projects");
    await expect(html).toHaveAttribute("data-palette", "teal");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(8, 17, 15)");
  });

  test("picker closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en");
    await page.getByRole("button", { name: "Choose color theme" }).click();
    const group = page.getByRole("group", { name: "Color theme" });
    await expect(group).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(group).toBeHidden();
  });
});

test.describe("projects", () => {
  test("type filter chips update results and URL", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.locator("main article")).toHaveCount(6);
    await page.getByRole("button", { name: "Company" }).click();
    await expect(page).toHaveURL(/f=COMPANY/);
    await expect(page.getByRole("button", { name: "Company" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("main article")).toHaveCount(2);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.locator("main article")).toHaveCount(6);
  });

  test("private project never exposes repository links", async ({ page }) => {
    await page.goto("/en/projects/b2b-order-portal");
    await expect(page.getByText(/Internal project/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Source code/ })).toHaveCount(0);
  });

  test("public project links open safely in a new tab", async ({ page }) => {
    await page.goto("/en/projects/portfolio-website");
    const link = page.getByRole("link", { name: /Source code/ });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test.describe("honest states", () => {
  test("missing CV shows an on-request note, not a dead download", async ({ page }) => {
    await page.goto("/en/resume");
    await expect(page.getByText("PDF CV available on request.").first()).toBeVisible();
    await expect(page.locator("a[download]")).toHaveCount(0);
  });

  test("contact form is available once the email is configured", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.getByRole("form", { name: "Message form" })).toBeVisible();
    await expect(page.locator("a[href^='mailto:']")).toHaveCount(1);
  });

  test("public project shows its review video; private project never does", async ({ page }) => {
    await page.goto("/en/projects/taskflow");
    await expect(page.locator("video source[type='video/webm']")).toHaveCount(1);
    await page.goto("/en/projects/b2b-order-portal");
    await expect(page.locator("video")).toHaveCount(0);
  });

  test("blog shows an empty state in production (draft hidden)", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.getByText("Articles coming soon")).toBeVisible();
  });
});

test.describe("responsive", () => {
  for (const width of widths) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      test.slow();
      await page.setViewportSize({ width, height: 900 });
      for (const path of pages) {
        await page.goto(`/vi${path}`);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `/vi${path} @${width}`).toBeLessThanOrEqual(0);
      }
    });
  }

  test("mobile menu opens, closes on Escape and on navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/vi");
    await page.getByRole("button", { name: "Mở menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await page.getByRole("button", { name: "Mở menu" }).click();
    await dialog.getByRole("link", { name: "Dự án" }).click();
    await expect(page).toHaveURL(/\/vi\/projects$/);
    await expect(dialog).toBeHidden();
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const scheme of ["light", "dark"] as const) {
    test(`no violations — ${scheme}`, async ({ browser }) => {
      test.slow();
      // Reduced motion: measure the final state, not a frame of the entrance animation.
      const ctx = await browser.newContext({ colorScheme: scheme, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      for (const path of pages) {
        await page.goto(`/vi${path}`);
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        const summary = result.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`,
        );
        expect(summary, `/vi${path} (${scheme})`).toEqual([]);
      }
      await ctx.close();
    });
  }
});
