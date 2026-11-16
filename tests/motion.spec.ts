import { expect, test } from "@playwright/test";

test("reduced-motion preference keeps page content visible without overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("about/");

  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".founder-card")).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);

  await page.goto("../");
  await expect(page.locator(".hero-halo")).toHaveCSS("animation-name", "none");
});
