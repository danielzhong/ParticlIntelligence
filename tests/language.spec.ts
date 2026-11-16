import { expect, test } from "@playwright/test";

test("language preference persists across pages", async ({ page }) => {
  await page.goto("about/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.getByRole("button", { name: "Switch to Chinese" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator("h1")).toContainText(
    "我们创立 Particle Intelligence",
  );
  await expect(page.locator(".story-copy")).toContainText("为什么创业");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await page
    .getByRole("link", { name: "联系我们", exact: true })
    .first()
    .click();
  await expect(page).toHaveTitle("联系我们 — Particle Intelligence");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});
