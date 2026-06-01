import { maxGuesses } from "@/lib/config";
import { ConcealAnswer } from "@/lib/utils";
import { createInitialGuess, processGuess } from "./guess";

describe("guess processing", () => {
  test("creates the initial guess state", () => {
    expect(createInitialGuess("h#### w####")).toEqual({
      isCorrect: false,
      updatedAnswer: "h#### w####",
      guessNumber: 0,
      progress: "💚💚💚💚💚",
    });
  });

  test("marks a correct answer and advances the guess count", () => {
    const answer = "hello world";

    expect(
      processGuess({
        guess: "helloworld",
        answer,
        answerProgress: ConcealAnswer(answer),
        currentProgress: "💚💚💚💚💚",
        guessNumber: 0,
      }),
    ).toEqual({
      isCorrect: true,
      updatedAnswer: answer,
      guessNumber: 1,
      progress: "💚💚💚💚💚",
    });
  });

  test("marks an incorrect answer and preserves revealed progress", () => {
    const answer = "hello world";

    expect(
      processGuess({
        guess: "hellowzrld",
        answer,
        answerProgress: ConcealAnswer(answer),
        currentProgress: "💚💚💚💚💚",
        guessNumber: 1,
      }),
    ).toMatchObject({
      isCorrect: false,
      guessNumber: 2,
      progress: "💚💔💚💚💚",
      updatedAnswer: "hello w#rld",
    });
  });

  test("reveals the answer after the final guess", () => {
    const answer = "hello world";

    expect(
      processGuess({
        guess: "wrongguess",
        answer,
        answerProgress: ConcealAnswer(answer),
        currentProgress: "💔💔💔💔💚",
        guessNumber: maxGuesses - 1,
      }),
    ).toMatchObject({
      isCorrect: false,
      updatedAnswer: answer,
      guessNumber: maxGuesses,
      progress: "💔💔💔💔💔",
    });
  });
});
