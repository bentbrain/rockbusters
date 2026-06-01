import { DummyInputOTPSlot, InputOTPGroup } from "@/components/ui/input-otp";
import type { Guess } from "@/lib/guess";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

function getGuessCharacter(guess: string, index: number) {
  return guess.charAt(index);
}

function getRevealedCharacter(answer: string, index: number) {
  return answer.replaceAll(" ", "").charAt(index);
}

function hasVisibleMiss(guess: Guess) {
  return Array.from(guess.submittedAnswer).some((_, index) => {
    return getRevealedCharacter(guess.updatedAnswer, index) === "#";
  });
}

function guessSlotClassName({
  hasCharacter,
  isLeftEdge,
  isRevealed,
  isRightEdge,
}: {
  hasCharacter: boolean;
  isLeftEdge: boolean;
  isRevealed: boolean;
  isRightEdge: boolean;
}) {
  if (!hasCharacter) {
    return "bg-slate-50 text-slate-400 dark:bg-blue-950 dark:text-slate-500";
  }

  if (isRevealed) {
    return "border-transparent bg-transparent text-transparent shadow-none dark:border-transparent dark:bg-transparent";
  }

  return cn(
    "rounded-none border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200",
    isLeftEdge && "rounded-l-md border-l",
    isRightEdge && "rounded-r-md",
  );
}

export function PreviousGuesses({
  answer,
  guesses,
}: Readonly<{
  answer: string;
  guesses: Guess[];
}>) {
  const previousGuesses = guesses.filter(
    (guess) =>
      guess.guessNumber > 0 &&
      guess.submittedAnswer.length > 0 &&
      hasVisibleMiss(guess),
  );

  if (previousGuesses.length === 0) {
    return null;
  }

  const words = answer.split(" ");

  return (
    <div
      aria-label="Previous guesses"
      className="grid gap-2 uppercase"
      data-testid="previous-guesses"
    >
      <div className="grid gap-2">
        {previousGuesses.map((guess) => {
          let globalIndex = 0;

          return (
            <div
              key={`${guess.guessNumber}-${guess.submittedAnswer}`}
              aria-label={`Guess ${guess.guessNumber}`}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {words.map((word, wordIndex) => (
                <Fragment key={`previous-${guess.guessNumber}-${wordIndex}`}>
                  <InputOTPGroup className="flex">
                    {word.split("").map((letter, letterIndex) => {
                      const character = getGuessCharacter(
                        guess.submittedAnswer,
                        globalIndex,
                      );
                      const revealedCharacter = getRevealedCharacter(
                        guess.updatedAnswer,
                        globalIndex,
                      );
                      const previousRevealedCharacter =
                        letterIndex === 0
                          ? ""
                          : getRevealedCharacter(
                              guess.updatedAnswer,
                              globalIndex - 1,
                            );
                      const nextRevealedCharacter =
                        letterIndex === word.length - 1
                          ? ""
                          : getRevealedCharacter(
                              guess.updatedAnswer,
                              globalIndex + 1,
                            );
                      const hasCharacter = character.length > 0;
                      const isRevealed = revealedCharacter !== "#";
                      const isLeftEdge =
                        previousRevealedCharacter.length === 0 ||
                        previousRevealedCharacter !== "#";
                      const isRightEdge =
                        nextRevealedCharacter.length === 0 ||
                        nextRevealedCharacter !== "#";
                      const slotIndex = globalIndex;
                      globalIndex += 1;

                      return (
                        <DummyInputOTPSlot
                          key={`${guess.guessNumber}-${letter}-${slotIndex}`}
                          index={slotIndex}
                          className={cn(
                            "!cursor-default !opacity-100",
                            guessSlotClassName({
                              hasCharacter,
                              isLeftEdge,
                              isRevealed,
                              isRightEdge,
                            }),
                          )}
                        >
                          {hasCharacter && !isRevealed ? character : " "}
                        </DummyInputOTPSlot>
                      );
                    })}
                  </InputOTPGroup>
                </Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
