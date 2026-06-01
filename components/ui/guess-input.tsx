import { Button } from "@/components/ui/button";
import {
  DummyInputOTPSlot,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ALL_CHARACTERS } from "@/lib/utils";
import type { FormEvent, RefObject } from "react";
import { Fragment, useState } from "react";

const GuessInput = ({
  answer,
  onSubmitGuess,
  ref,
}: Readonly<{
  answer: string;
  onSubmitGuess: (guess: string) => void;
  ref: RefObject<HTMLInputElement | null>;
}>) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const words = answer.split(" ");
  let globalIndex = 0;
  const isComplete = currentGuess.length === answer.replaceAll(" ", "").length;
  const submitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete) return;

    onSubmitGuess(currentGuess);
    setCurrentGuess("");
  };

  return (
    <form
      onSubmit={submitGuess}
      className="grid place-items-center gap-8 uppercase"
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
      <Button disabled={!isComplete}>Submit</Button>
    </form>
  );
};

GuessInput.displayName = "GuessInput";

export function GuessInputSkeleton({ answer }: Readonly<{ answer: string }>) {
  const words = answer.split(" ");
  let globalIndex = 0;

  return (
    <div
      aria-hidden="true"
      className="grid place-items-center gap-8 uppercase"
    >
      <div className="flex flex-wrap justify-center items-center gap-2">
        {words.map((word, i) => (
          <Fragment key={`skeleton-group-${i}`}>
            <InputOTPGroup className="flex">
              {word.split("").map((letter) => (
                <DummyInputOTPSlot
                  key={`skeleton-${letter}-${globalIndex}`}
                  index={globalIndex++}
                  className="bg-slate-50 dark:bg-blue-950"
                >
                  {" "}
                </DummyInputOTPSlot>
              ))}
            </InputOTPGroup>
          </Fragment>
        ))}
      </div>
      <Button disabled>Submit</Button>
    </div>
  );
}

export default GuessInput;
