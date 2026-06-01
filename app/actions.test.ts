import { SubmitAnswer } from "./actions";
import { maxGuesses } from "@/lib/config";
import { ConcealAnswer, getCurrentItem } from "@/lib/utils";

const previousState = {
  isCorrect: false,
  updatedAnswer: "",
  guessNumber: 0,
  progress: "💚".repeat(maxGuesses),
};

function createSubmissionForm({
  answer,
  answerProgress,
  currentProgress,
  guessNumber,
}: {
  answer?: string;
  answerProgress: string;
  currentProgress: string;
  guessNumber: number;
}) {
  const formData = new FormData();

  if (answer !== undefined) {
    formData.set("answer", answer);
  }
  formData.set("answer-progress", answerProgress);
  formData.set("current-progress", currentProgress);
  formData.set("guess-number", guessNumber.toString());

  return formData;
}

describe("SubmitAnswer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-11T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("returns the initial failure state when the answer is empty", async () => {
    await expect(
      SubmitAnswer(
        previousState,
        createSubmissionForm({
          answerProgress: "",
          currentProgress: "💔💚💚💚💚",
          guessNumber: 2,
        })
      )
    ).resolves.toEqual({
      isCorrect: false,
      updatedAnswer: "",
      guessNumber: 0,
      progress: "💚💚💚💚💚",
    });
  });

  test("marks a correct answer and advances the guess count", async () => {
    const { hint } = getCurrentItem();
    const answerProgress = ConcealAnswer(hint.answer);

    await expect(
      SubmitAnswer(
        previousState,
        createSubmissionForm({
          answer: hint.answer.replaceAll(" ", ""),
          answerProgress,
          currentProgress: "💚💚💚💚💚",
          guessNumber: 0,
        })
      )
    ).resolves.toEqual({
      isCorrect: true,
      updatedAnswer: hint.answer,
      guessNumber: 1,
      progress: "💚💚💚💚💚",
    });
  });

  test("marks an incorrect answer and preserves revealed progress", async () => {
    const { hint } = getCurrentItem();

    await expect(
      SubmitAnswer(
        previousState,
        createSubmissionForm({
          answer: "wrongguess",
          answerProgress: ConcealAnswer(hint.answer),
          currentProgress: "💚💚💚💚💚",
          guessNumber: 1,
        })
      )
    ).resolves.toMatchObject({
      isCorrect: false,
      guessNumber: 2,
      progress: "💚💔💚💚💚",
    });
  });

  test("reveals the answer after the final guess", async () => {
    const { hint } = getCurrentItem();

    await expect(
      SubmitAnswer(
        previousState,
        createSubmissionForm({
          answer: "wrongguess",
          answerProgress: ConcealAnswer(hint.answer),
          currentProgress: "💔💔💔💔💚",
          guessNumber: maxGuesses - 1,
        })
      )
    ).resolves.toMatchObject({
      isCorrect: false,
      updatedAnswer: hint.answer,
      guessNumber: maxGuesses,
      progress: "💔💔💔💔💔",
    });
  });
});
