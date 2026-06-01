import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { questions } from "./questions";
import { startingDate } from "./config";
import type { Guess } from "@/components/ui/guesser";
import type { Stats } from "@/hooks/use-statistics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const REGEXP_ALL_CHARACTERS = "^[^\\s]+$";

export function ConcealAnswer(answer: string) {
  const maskedAnswer = answer.replace(
    /\b(\w)(\w*)/g,
    (_match: string, firstLetter: string, rest: string) => {
      return firstLetter + rest.replace(/\w/g, "#");
    },
  );
  return maskedAnswer;
}

export function mergeProgress(currentProgress: string, updatedAnswer: string) {
  let mergedProgress = "";
  for (let i = 0; i < currentProgress.length; i++) {
    if (currentProgress[i] !== "#" && currentProgress[i] !== " ") {
      mergedProgress += currentProgress[i];
    } else {
      mergedProgress += updatedAnswer[i];
    }
  }
  return mergedProgress;
}

export function UpdateAnswer(guess: string, answer: string) {
  const answerLower = answer.toLowerCase();
  const guessLower = guess.toLowerCase();
  let updatedAnswer = "";
  let guessIndex = 0;
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === " ") {
      updatedAnswer += " ";
    } else if (
      guessIndex < guess.length &&
      answerLower[i] === guessLower[guessIndex]
    ) {
      updatedAnswer += answer[i];
      guessIndex++;
    } else {
      updatedAnswer += "#";
      if (guessIndex < guess.length && guessLower[guessIndex] !== " ") {
        guessIndex++;
      }
    }
  }
  return updatedAnswer;
}

export function CheckAnswer(
  guess: string,
  answer: string,
  currentProgress: string,
) {
  const updatedAnswer = mergeProgress(
    currentProgress,
    UpdateAnswer(guess, answer),
  );
  const sanitizedGuess = updatedAnswer.toLowerCase().replaceAll(" ", "");
  const sanitizedAnswer = answer.toLowerCase().replaceAll(" ", "");
  const isCorrect = sanitizedGuess === sanitizedAnswer;
  return { isCorrect, updatedAnswer };
}

export function replaceCharAt(
  str: string,
  index: number,
  char: string,
): string {
  const strArray = Array.from(str);
  if (index < 0 || index >= strArray.length) {
    throw new Error("Index out of bounds");
  }
  if (Array.from(char).length !== 1) {
    throw new Error("Replacement character must be a single character");
  }
  strArray[index] = char;
  return strArray.join("");
}

export function getDayCount(): number {
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - startingDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export function getCurrentItem() {
  const dayCount = getDayCount() + 525;
  const cycleDay = dayCount % questions.length;
  return {
    hint: questions[cycleDay],
    dayID: dayCount,
  };
}

export function GetServerTime() {
  return { serverTime: new Date() };
}

export function calculateTimeLeft(startTime: string) {
  const { serverTime } = GetServerTime();
  const nextClueDate = new Date(startTime);
  nextClueDate.setUTCHours(24, 0, 0, 0); // Set to midnight UTC
  if (
    serverTime.getUTCHours() === 0 &&
    serverTime.getUTCMinutes() === 0 &&
    serverTime.getUTCSeconds() === 0
  ) {
    nextClueDate.setDate(nextClueDate.getDate() + 1); // Move to the next day if it's exactly midnight
  }
  const timeLeft = nextClueDate.getTime() - serverTime.getTime();
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return {
    hours,
    minutes,
    seconds,
  };
}

export function CalculatePercentage(total: number, partial: number) {
  if (total === 0 && partial === 0) return 0;
  return (100 * partial) / total;
}

export function CalculateGuesses(state: Guess[], guesses: Stats["guesses"]) {
  const correctIndex = state.findIndex((guess) => guess.isCorrect);

  const updatedGuesses = { ...guesses };
  if (correctIndex > 0) {
    updatedGuesses[correctIndex.toString()] =
      updatedGuesses[correctIndex.toString()] + 1;
  } else {
    updatedGuesses["0"] = updatedGuesses["0"] + 1;
  }

  return updatedGuesses;
}

export function TransformOldStats(score: number) {
  const newFormat: Record<number, string> = {
    5: "💔💔💔💔💚",
    4: "💔💔💔💚💚",
    3: "💔💔💚💚💚",
    2: "💔💚💚💚💚",
    1: "💚💚💚💚💚",
    0: "💔💔💔💔💔",
  };
  return newFormat[score];
}
