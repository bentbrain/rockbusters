import { expect, test } from "@playwright/test";

test("renders the daily Rockbusters game", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Rockbusters" })
  ).toBeVisible();
  await expect(page.getByText(/^#\d+:/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
  await expect(page.getByText(/\(built by @bent\.brain\)/)).toBeVisible();
});
