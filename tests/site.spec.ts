import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { waitForMotion } from "./helpers";

const pages = ["about/", "applications/", "contact/", "technology/"];

test("homepage presents the company and links to its main pages", async ({
  page,
}) => {
  await page.goto("./");

  await expect(page).toHaveTitle(/Particle Intelligence/);
  await expect(page.locator("h1")).toContainText("See how particles move.");
  await expect(page.locator("h1")).toContainText("Explore what comes next.");

  for (const path of pages) {
    await expect(page.locator(`.desktop-nav a[href="/${path}"]`)).toHaveCount(
      1,
    );
  }
});

for (const path of [...pages, "privacy/"]) {
  test(`${path} loads directly with a page title and heading`, async ({
    page,
  }) => {
    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Particle Intelligence/);
    await expect(page.locator("h1")).toHaveCount(1);
    if (path !== "privacy/") {
      await expect(page.locator(".page-breadcrumb")).toBeVisible();
    }
  });
}

test("About page tells the founding story and introduces all five founders", async ({
  page,
}) => {
  await page.goto("about/");

  await expect(page.locator("h1")).toContainText(
    "We started Particle Intelligence",
  );
  await expect(page.locator(".story-copy")).toContainText(
    "We are developing Phora",
  );
  await expect(page.locator(".founder-card")).toHaveCount(5);

  for (const founder of [
    "Daniel Zhong",
    "Langqi Xing",
    "Chunyang Li",
    "Ruize Hou",
    "Yeqing Ni",
  ]) {
    await expect(page.getByRole("heading", { name: founder })).toBeVisible();
  }
  await expect(page.locator(".founder-card").first()).not.toContainText(
    /graphics|GPU|rendering/i,
  );
});

test("contact links address the published contact email without a web form", async ({
  page,
}) => {
  await page.goto("contact/");

  await expect(
    page.getByRole("link", { name: "contact@partintell.com" }).first(),
  ).toHaveAttribute("href", "mailto:contact@partintell.com");
  await expect(
    page.getByRole("link", { name: "Send an email" }),
  ).toHaveAttribute("href", /^mailto:contact@partintell\.com\?/);
  await expect(page.locator("form")).toHaveCount(0);
});

test("mobile navigation opens and follows a page link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Technology" }).click();
  await expect(page).toHaveURL(/\/technology\/$/);
  await expect(navigation).toBeHidden();
});

test("About and contact pages pass automated accessibility checks", async ({
  page,
}) => {
  for (const path of ["about/", "contact/"]) {
    await page.goto(path);
    await waitForMotion(page);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, path).toEqual([]);
  }
});
