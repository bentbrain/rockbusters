"use client";
import { useStatistics } from "@/hooks/use-statistics";
import {
  trackGameCompleted,
  trackGameLoaded,
  trackGuessSubmitted,
} from "@/lib/analytics";
import { maxGuesses } from "@/lib/config";
import { createInitialGuess, processGuess } from "@/lib/guess";
import type { Guess } from "@/lib/guess";
import { CalculateGuesses, cn } from "@/lib/utils";
import { useEffect, useRef, useSyncExternalStore } from "react";
import useLocalStorageState from "use-local-storage-state";
import AnswerDisplay from "./answer-display";
import { Card } from "./card";
import CopyButton from "./copy-button";
import GuessInput, { GuessInputSkeleton } from "./guess-input";
import { StatisticDisplay } from "./statistic-display";

interface Props {
  answer: string;
  hint: string;
  id: number;
  targetAnswer: string;
}

function subscribeToHydration() {
  return () => undefined;
}

function getHydratedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function countRevealedCharacters(answer: string) {
  return answer.replaceAll("#", "").replaceAll(" ", "").length;
}

function Guesser({ answer, hint, id, targetAnswer }: Readonly<Props>) {
  const initialState = createInitialGuess(answer);
  const [answers, setAnswers, { removeItem: removeAnswers }] =
    useLocalStorageState<Guess[]>("rockbusters_todays_answers", {
      defaultValue: [initialState],
    });
  const [currentGame, setCurrentGame] = useLocalStorageState<number>(
    "rockbusters_game_id",
    {
      defaultValue: 0,
    },
  );
  const [, setStats] = useStatistics();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const activeAnswers =
    hasHydrated && currentGame === id ? answers : [initialState];
  const latestGuess = activeAnswers.at(-1);
  const currentGuesses = activeAnswers.filter(
    (answer) => answer.guessNumber != 0,
  );
  const gameOver =
    currentGuesses.length === maxGuesses && !latestGuess?.isCorrect;
  const gameWon = latestGuess?.isCorrect;

  const inputRef = useRef<HTMLInputElement>(null);
  const trackedGameLoadRef = useRef<number | null>(null);

  const submitGuess = (guess: string) => {
    if (gameOver || gameWon) return;

    const nextGuess = processGuess({
      guess,
      answer: targetAnswer,
      answerProgress: latestGuess?.updatedAnswer ?? answer,
      currentProgress: latestGuess?.progress ?? initialState.progress,
      guessNumber: latestGuess?.guessNumber ?? initialState.guessNumber,
    });
    const nextAnswers = [...activeAnswers, nextGuess];
    const nextGuesses = nextAnswers.filter((answer) => answer.guessNumber != 0);
    const nextGameOver =
      nextGuesses.length === maxGuesses && !nextGuess.isCorrect;
    const isFinalGuess = nextGameOver || nextGuess.isCorrect;
    const result = nextGuess.isCorrect ? "won" : "lost";

    setAnswers(nextAnswers);
    trackGuessSubmitted({
      dayId: id,
      guessNumber: nextGuess.guessNumber,
      guessesRemaining: maxGuesses - nextGuess.guessNumber,
      isCorrect: nextGuess.isCorrect,
      isFinalGuess,
      revealedCharacters: countRevealedCharacters(nextGuess.updatedAnswer),
    });

    if (nextGameOver) {
      trackGameCompleted({
        dayId: id,
        guessCount: nextGuess.guessNumber,
        result,
      });
      setStats((prev) => ({
        currentStreak: 0,
        maxStreak: prev.maxStreak,
        played: prev.played + 1,
        wins: prev.wins,
        guesses: CalculateGuesses(nextAnswers, prev.guesses),
      }));
    }

    if (nextGuess.isCorrect) {
      trackGameCompleted({
        dayId: id,
        guessCount: nextGuess.guessNumber,
        result,
      });
      setStats((prev) => ({
        currentStreak: prev.currentStreak + 1,
        maxStreak: prev.maxStreak + 1,
        played: prev.played + 1,
        wins: prev.wins + 1,
        guesses: CalculateGuesses(nextAnswers, prev.guesses),
      }));
    }
  };

  useEffect(() => {
    if (!hasHydrated) return;
    if (currentGame !== id) return;
    if (trackedGameLoadRef.current === id) return;

    trackedGameLoadRef.current = id;
    trackGameLoaded({
      dayId: id,
      guessesMade: currentGuesses.length,
      hasSavedProgress: currentGuesses.length > 0,
      isComplete: Boolean(gameOver || gameWon),
    });
  }, [currentGame, currentGuesses.length, gameOver, gameWon, hasHydrated, id]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (currentGame === id) return;
    setCurrentGame((prev) => {
      if (prev !== id) {
        removeAnswers();
      }
      return id;
    });
  }, [id, currentGame, hasHydrated, removeAnswers, setCurrentGame]);

  return (
    <div className="grid  gap-4">
      <Card className=" shadow-sm p-3">
        <p className=" text-balance">
          <span className="font-bold">#{id}: </span>
          {hint}
        </p>
      </Card>

      <Card aria-busy={!hasHydrated} className="px-3 py-4">
        <div className="grid gap-4">
          <div
            className={cn(
              "w-max rounded-full mx-auto mb-2 border-solid transition-colors bg-green-50 dark:border-green-900 dark:bg-green-950 border-input border  px-2 pt-1 pb-[2px]",
              {
                "bg-amber-50 border-amber-200 dark:bg-lime-950 dark:border-lime-900":
                  latestGuess?.progress.includes("💔"),
                "bg-red-50 border-red-200 dark:bg-yellow-950 dark:border-yellow-900":
                  latestGuess?.progress.includes("💔".repeat(maxGuesses - 3)),
                "bg-red-100 border-red-200 dark:bg-orange-950 dark:border-orange-900":
                  latestGuess?.progress.includes("💔".repeat(maxGuesses - 2)),
                " bg-red-200 border-red-500 dark:bg-red-950 dark:border-red-900":
                  latestGuess?.progress.includes("💔".repeat(maxGuesses - 1)),
                "animate-pulse ":
                  latestGuess?.progress.includes("💔".repeat(maxGuesses - 1)) &&
                  !gameOver &&
                  !gameWon,
                "opacity-70": !hasHydrated,
              },
            )}
          >
            {hasHydrated && currentGame === id
              ? latestGuess?.progress
              : initialState.progress}
          </div>
          <AnswerDisplay
            isIncorrect={gameOver}
            isPending={false}
            inputRef={inputRef}
            answer={
              !hasHydrated || currentGame !== id || latestGuess?.guessNumber === 0
                ? answer
                : latestGuess?.updatedAnswer ?? answer
            }
          />
          {!hasHydrated && <GuessInputSkeleton answer={answer} />}
          {hasHydrated && !gameOver && !gameWon && (
            <GuessInput
              key={answer}
              ref={inputRef}
              answer={answer}
              onSubmitGuess={submitGuess}
            />
          )}
        </div>
        {(gameOver || gameWon) && (
          <div className="grid mt-6 gap-4">
            {gameWon && <p>Right, well done then 🍻</p>}
            {gameOver && <p>You&apos;re an idiot. Play a record.</p>}
            <div className="flex items-center justify-center gap-3">
              <StatisticDisplay displayType="text" />
              <CopyButton
                guessCount={latestGuess?.guessNumber ?? 0}
                id={id}
                result={gameWon ? "won" : "lost"}
                text={latestGuess?.progress ?? ""}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
export default Guesser;
