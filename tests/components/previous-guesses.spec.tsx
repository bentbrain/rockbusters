import { expect, test } from "@playwright/experimental-ct-react";
import { PreviousGuesses } from "@/components/ui/previous-guesses";

test("renders colour-coded previous guesses", async ({ mount }) => {
  const component = await mount(
    <PreviousGuesses
      answer="hello world"
      guesses={[
        {
          guessNumber: 1,
          isCorrect: false,
          progress: "💔💚💚💚💚",
          submittedAnswer: "hellowzrld",
          updatedAnswer: "hello w#rld",
        },
        {
          guessNumber: 2,
          isCorrect: true,
          progress: "💔💚💚💚💚",
          submittedAnswer: "helloworld",
          updatedAnswer: "hello world",
        },
      ]}
    />,
  );

  await expect(component.getByText("Previous guesses")).toBeHidden();
  await expect(component.getByLabel("Guess 1").locator(".bg-transparent")).toHaveCount(9);
  await expect(component.getByLabel("Guess 1").locator(".bg-rose-100")).toHaveCount(1);
  await expect(component.getByLabel("Guess 1").locator(".text-rose-700")).toHaveCount(1);
  await expect(component.getByLabel("Guess 1").locator(".rounded-l-md.bg-rose-100")).toHaveCount(1);
  await expect(component.getByLabel("Guess 1").locator(".rounded-r-md.bg-rose-100")).toHaveCount(1);
  await expect(component.getByLabel("Guess 1")).toContainText("z");
  await expect(component.getByLabel("Guess 1")).not.toContainText("h");
  await expect(component.getByLabel("Guess 2")).toBeHidden();
});

test("hides when there are no submitted guesses", async ({ mount }) => {
  const component = await mount(
    <PreviousGuesses
      answer="hello world"
      guesses={[
        {
          guessNumber: 0,
          isCorrect: false,
          progress: "💚💚💚💚💚",
          submittedAnswer: "",
          updatedAnswer: "h#### w####",
        },
      ]}
    />,
  );

  await expect(component).toBeEmpty();
});
