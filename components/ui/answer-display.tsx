import { DummyInputOTPSlot, InputOTPGroup } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { UpdateIcon } from "@radix-ui/react-icons";
import type { RefObject } from "react";
import { Fragment } from "react";

function AnswerDisplay({
  answer,
  inputRef,
  isPending,
  isIncorrect,
}: Readonly<{
  answer: string;
  inputRef: RefObject<{ focus: () => void } | null>;
  isPending: boolean;
  isIncorrect: boolean;
}>) {
  const words = answer.split(" ");
  let globalIndex = 0;
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="uppercase justify-center grid"
    >
      <div className="flex flex-wrap justify-center font-bold items-center gap-2">
        {words.map((word, i) => (
          <Fragment key={`group-${i}`}>
            <InputOTPGroup className="flex">
              {word.split("").map((letter) => (
                <DummyInputOTPSlot
                  key={`${letter}-${globalIndex}`}
                  index={globalIndex++}
                  className={cn(" !opacity-100 !cursor-default", {
                    "bg-emerald-200 dark:bg-emerald-900": letter != "#",
                    "bg-slate-50 dark:bg-blue-950": letter === "#",
                    "bg-red-200": isIncorrect,
                  })}
                >
                  {letter == "#" ? (
                    isPending ? (
                      <UpdateIcon className="text-blue-300 dark:text-indigo-500 animate-spin" />
                    ) : (
                      " "
                    )
                  ) : (
                    letter
                  )}
                </DummyInputOTPSlot>
              ))}
            </InputOTPGroup>
          </Fragment>
        ))}
      </div>

      <span className="sr-only">{answer}</span>
    </div>
  );
}

export default AnswerDisplay;
