import { maxGuesses } from "@/lib/config";
import { CheckAnswer, ConcealAnswer, replaceCharAt } from "@/lib/utils";

export interface Guess {
  updatedAnswer: string;
  isCorrect: boolean;
  guessNumber: number;
  progress: string;
  submittedAnswer: string;
}

interface ProcessGuessInput {
  guess: string;
  answer: string;
  answerProgress: string;
  currentProgress: string;
  guessNumber: number;
}

export function createInitialGuess(answer: string): Guess {
  return {
    updatedAnswer: answer,
    isCorrect: false,
    guessNumber: 0,
    progress: "💚".repeat(maxGuesses),
    submittedAnswer: "",
  };
}

export function processGuess({
  guess,
  answer,
  answerProgress,
  currentProgress,
  guessNumber,
}: ProcessGuessInput): Guess {
  if (!guess) {
    return createInitialGuess("");
  }

  const { isCorrect, updatedAnswer } = CheckAnswer(
    guess,
    answer,
    answerProgress || ConcealAnswer(answer),
  );
  const progress = replaceCharAt(
    currentProgress,
    guessNumber,
    isCorrect ? "💚" : "💔",
  );

  return {
    isCorrect,
    updatedAnswer: guessNumber === maxGuesses - 1 ? answer : updatedAnswer,
    guessNumber: guessNumber + 1,
    progress,
    submittedAnswer: guess,
  };
}
