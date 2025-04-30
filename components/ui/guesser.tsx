"use client";
import { Button } from "@/components/ui/button";
import { maxGuesses } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";
import { SubmitAnswer } from "../../app/actions";
import AnswerDisplay from "./answer-display";
import CopyButton from "./copy-button";
import GuessInput from "./guess-input";
import { Card } from "./card";
import { Stats, useStatistics } from "@/hooks/use-statistics";
import { StatisticDisplay } from "./statistic-display";
import { CalculateGuesses, cn } from "@/lib/utils";

type Props = {
  answer: string;
  hint: string;
  id: number;
};

export type Guess = {
  updatedAnswer: string;
  isCorrect: boolean;
  guessNumber: number;
  progress: string;
};

const ResetButton = ({ removeAnswers }: { removeAnswers: () => void }) => {
  const router = useRouter();

  const handleReset = () => {
    removeAnswers();
    console.log("removed");
    router.refresh();
  };

  return (
    <Button variant={"destructive"} onMouseDown={handleReset}>
      Reset
    </Button>
  );
};

function Guesser({ answer, hint, id }: Readonly<Props>) {
  const initialState: Guess = {
    updatedAnswer: answer,
    isCorrect: false,
    guessNumber: 0,
    progress: "💚".repeat(maxGuesses),
  };
  const [state, formAction, isPending] = useActionState(
    SubmitAnswer,
    initialState
  );
  const [answers, setAnswers, { removeItem: removeAnswers }] =
    useLocalStorageState<Guess[]>("rockbusters_todays_answers", {
      defaultValue: [
        {
          updatedAnswer: answer,
          isCorrect: false,
          guessNumber: 0,
          progress: "💚".repeat(maxGuesses),
        },
      ],
    });
  const [currentGame, setCurrentGame] = useLocalStorageState<number>(
    "rockbusters_game_id",
    {
      defaultValue: 0,
    }
  );
  const [stats, setStats] = useStatistics();
  const latestGuess = answers.at(-1);
  const currentGuesses = answers.filter((answer) => answer.guessNumber != 0);
  const gameOver =
    currentGuesses.length === maxGuesses && !latestGuess?.isCorrect;
  const gameWon = latestGuess?.isCorrect;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentGame === id) return;
    setCurrentGame((prev) => {
      if (prev !== id) {
        removeAnswers();
      }
      return id;
    });
  }, [id, currentGame, removeAnswers, setCurrentGame]);

  useEffect(() => {
    if (state.guessNumber === 0) return;
    if (gameOver || gameWon) return;
    const { updatedAnswer, isCorrect, guessNumber, progress } = state;
    if (!updatedAnswer) return;
    setAnswers((prev) => [
      ...prev,
      {
        updatedAnswer,
        isCorrect,
        guessNumber,
        progress,
      },
    ]);
  }, [state]);

  useEffect(() => {
    if (state.guessNumber === 0) return;

    if (gameOver) {
      setStats((prev) => {
        return {
          currentStreak: 0,
          maxStreak: prev.maxStreak,
          played: prev.played + 1,
          wins: prev.wins,
          guesses: CalculateGuesses(answers, prev.guesses),
        };
      });
    }

    if (gameWon) {
      setStats((prev) => {
        return {
          currentStreak: prev.currentStreak + 1,
          maxStreak: prev.maxStreak + 1,
          played: prev.played + 1,
          wins: prev.wins + 1,
          guesses: CalculateGuesses(answers, prev.guesses),
        };
      });
    }
  }, [gameOver, gameWon]);

  return (
    <div className="grid  gap-4">
      <Card className=" shadow-sm p-3">
        <p className=" text-balance">
          <span className="font-bold">#{id}: </span>
          {hint}
        </p>
      </Card>

      <Card className="px-3  py-4">
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
              }
            )}
          >
            {latestGuess?.progress}
          </div>
          <AnswerDisplay
            isIncorrect={gameOver}
            isPending={isPending}
            inputRef={inputRef}
            answer={
              latestGuess?.guessNumber === 0
                ? answer
                : latestGuess?.updatedAnswer ?? answer
            }
          />
          {!gameOver && !gameWon && (
            <GuessInput
              key={answer}
              ref={inputRef}
              isPending={isPending}
              answer={answer}
              formAction={formAction}
              answerProgress={latestGuess?.updatedAnswer ?? ""}
              currentProgress={latestGuess?.progress ?? initialState.progress}
              guessNumber={latestGuess?.guessNumber ?? initialState.guessNumber}
            />
          )}
        </div>
        {(gameOver || gameWon) && (
          <div className="grid mt-6 gap-4">
            {gameWon && <p>Right, well done then 🍻</p>}
            {gameOver && <p>You&apos;re an idiot. Play a record.</p>}
            <div className="flex items-center justify-center gap-3">
              <StatisticDisplay displayType="text" />
              <CopyButton id={id} text={latestGuess?.progress ?? ""} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
export default Guesser;
