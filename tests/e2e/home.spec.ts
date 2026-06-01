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

test("submits a guess without leaving the page", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const answerInput = page.locator('input[name="answer"]');
  const submitButton = page.getByRole("button", { name: "Submit" });
  const maxLength = await answerInput.getAttribute("maxlength");

  if (maxLength === null) {
    throw new Error("Expected answer input to define a maxlength");
  }

  await answerInput.fill("z".repeat(Number(maxLength)));
  await expect(submitButton).toBeEnabled();

  await submitButton.click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText("💔💚💚💚💚")).toBeVisible();
  await expect(answerInput).toHaveValue("");
  await expect(submitButton).toBeDisabled();

  await page.reload();

  await expect(page.getByText("💔💚💚💚💚")).toBeVisible();
});
