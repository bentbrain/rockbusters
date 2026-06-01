"use server";

import { maxGuesses } from "@/lib/config";
import { CheckAnswer, ConcealAnswer, replaceCharAt } from "@/lib/utils";
import { getCurrentItem } from "@/lib/utils";
import { revalidatePath } from "next/cache";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function SubmitAnswer(
  previousState: {
    isCorrect: boolean;
    updatedAnswer: string;
    guessNumber: number;
    progress: string;
  },
  formData: FormData
) {
  const guess = getStringValue(formData, "answer");
  const answerProgress = getStringValue(formData, "answer-progress");
  const currentProgress = getStringValue(formData, "current-progress");
  const guessNumber = parseInt(getStringValue(formData, "guess-number") ?? "0");

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
    guessNumber,
    isCorrect ? "💚" : "💔"
  );

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
