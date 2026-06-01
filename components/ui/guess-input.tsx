import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ALL_CHARACTERS } from "@/lib/utils";
import type { RefObject} from "react";
import { Fragment, useState } from "react";

const GuessInput = ({
  answer,
  formAction,
  answerProgress,
  currentProgress,
  guessNumber,
  isPending,
  ref,
}: Readonly<{
  answer: string;
  formAction: (payload: FormData) => void;
  answerProgress: string;
  currentProgress: string;
  guessNumber: number;
  isPending: boolean;
  ref: RefObject<HTMLInputElement | null>;
}>) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const words = answer.split(" ");
  let globalIndex = 0;
  return (
    <form
      onSubmit={() => {
        setCurrentGuess("");
      }}
      className="grid place-items-center gap-8 uppercase"
      action={formAction}
    >
      <InputOTP
        name="answer"
        spellCheck={false}
        ref={ref}
        pattern={REGEXP_ALL_CHARACTERS}
        maxLength={words.join("").length}
        value={currentGuess}
        inputMode={"text"}
        onChange={(e) => {
          setCurrentGuess(e);
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2">
          {words.map((word, i) => (
            <Fragment key={`group-${i}`}>
              <InputOTPGroup className="flex">
                {word.split("").map((letter) => (
                  <InputOTPSlot
                    key={`${letter}-${globalIndex}`}
                    index={globalIndex++}
                    ref={globalIndex === 1 ? ref : null}
                  />
                ))}
              </InputOTPGroup>
            </Fragment>
          ))}
        </div>
      </InputOTP>
      <input
        type="text"
        hidden
        readOnly
        value={answerProgress}
        className="hidden"
        name="answer-progress"
      />
      <input
        type="text"
        hidden
        readOnly
        value={currentProgress}
        className="hidden"
        name="current-progress"
      />
      <input
        type="text"
        hidden
        readOnly
        value={guessNumber}
        className="hidden"
        name="guess-number"
      />
      <Button
        disabled={
          currentGuess.length != answer.replaceAll(" ", "").length || isPending
        }
      >
        Submit
      </Button>
    </form>
  );
};

GuessInput.displayName = "GuessInput";

export default GuessInput;
