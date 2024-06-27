"use server";

import { maxGuesses } from "@/lib/config";
import { CheckAnswer, ConcealAnswer, replaceCharAt } from "@/lib/utils";
import { getCurrentItem } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function SubmitAnswer(
  previousState: {
    isCorrect: boolean;
    updatedAnswer: string;
    guessNumber: number;
    progress: string;
  },
  formData: FormData
) {
  const guess = formData.get("answer")?.toString();
  const answerProgress = formData.get("answer-progress")?.toString();
  const currentProgress = formData.get("current-progress")?.toString();
  const guessNumber = parseInt(formData.get("guess-number")?.toString() ?? "0");

  if (!guess) {
    return {
      isCorrect: false,
      updatedAnswer: "",
      guessNumber: previousState.guessNumber,
      progress: "💚".repeat(maxGuesses),
    };
  }

  const { hint } = getCurrentItem();

  const { isCorrect, updatedAnswer } = CheckAnswer(
    guess,
    hint.answer,
    answerProgress ?? ConcealAnswer(hint.answer)
  );

  const newProgress = replaceCharAt(
    currentProgress ?? previousState.progress,
    guessNumber ?? previousState.guessNumber,
    isCorrect ? "💚" : "💔"
  );

  console.log(updatedAnswer);

  return {
    isCorrect: isCorrect,
    updatedAnswer: guessNumber === maxGuesses - 1 ? hint.answer : updatedAnswer,
    guessNumber: guessNumber + 1,
    progress: newProgress,
  };
}

export async function revalidateGame() {
  revalidatePath("/", "layout");
}
