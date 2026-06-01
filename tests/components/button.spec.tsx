import { expect, test } from "@playwright/experimental-ct-react";
import { Button } from "@/components/ui/button";

test("renders button content and forwards disabled state", async ({ mount }) => {
  const component = await mount(<Button disabled>Submit</Button>);

  await expect(component).toHaveText("Submit");
  await expect(component).toBeDisabled();
  await expect(component).toHaveClass(/inline-flex/);
});

test("applies the destructive variant classes", async ({ mount }) => {
  const component = await mount(<Button variant="destructive">Reset</Button>);

  await expect(component).toHaveText("Reset");
  await expect(component).toHaveClass(/bg-destructive/);
});
