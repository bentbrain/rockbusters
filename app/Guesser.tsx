"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Artists from "./artists";
import Select from "react-select";
import CryptoJS from "crypto-js";
import { resourceUsage } from "process";

type Props = {
  hint: string;
  initials: string;
  answer: string;
  id: string;
  day: string;
};

const cryptKey = process.env.NEXT_PUBLIC_CRYPT_KEY;

const decryptData = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, cryptKey ? cryptKey : "cryptKey");
  const data = bytes.toString(CryptoJS.enc.Utf8);

  return data;
};

function Guesser({ hint, initials, answer, id, day }: Props) {
  const [playable, setPlayable] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [selection, setSelection] = useState("");
  const [guesses, setGuesses] = useState<String[]>([]);
  const artists = Artists();

  const makeResultsString = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.currentTarget.innerText = "Copied";
    const guessCount = 3;
    const answerPosition = guesses.indexOf(decryptData(answer));
    let resultString = [];

    if (answerPosition < 0)
      return `Rockbusters #${day}

🙈 ⬜️ ⬜️ ⬜️
https://rockbusters.vercel.app/`;

    for (var i = 0; i < guessCount; i++) {
      i == answerPosition ? resultString.push("🟩") : resultString.push("⬜️");
    }
    return `Rockbusters #${day}

🙊 ${resultString.join(" ")}
https://rockbusters.vercel.app/`;
  };

  useEffect(() => {
    const gameData = window.localStorage.getItem("rockbusters_game");
    const currentAnswer = window.localStorage.getItem("current_answer");
    if (
      gameData != null &&
      currentAnswer != null &&
      currentAnswer != undefined &&
      JSON.parse(currentAnswer ? currentAnswer : "else") == id
    ) {
      const sessionGuesses = JSON.parse(gameData);
      if (sessionGuesses.guesses.length >= 3) {
        setPlayable(false);
      }
      setGuesses(sessionGuesses.guesses);
      if (sessionGuesses.guesses.includes(decryptData(answer))) {
        setCorrect(true);
        setPlayable(false);
      }
    }
  }, []);

  useEffect(() => {
    guesses.length >= 1 &&
      window.localStorage.setItem(
        "rockbusters_game",
        JSON.stringify({ guesses: guesses })
      );
  }, [guesses]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.localStorage.setItem("current_answer", JSON.stringify(id));

    setGuesses((guesses) => [...guesses, selection]);
    if (selection == decryptData(answer)) {
      setCorrect(true);
      setPlayable(false);
    } else {
      console.log("changed");
      setCorrect(false);
    }
    if (guesses.length == 2) {
      setPlayable(false);
    }
    setSelection("");
  };

  const options = artists
    .filter((a) => !guesses.includes(a))
    .map((a, i) => {
      return {
        value: a,
        label: a,
      };
    });

  return (
    <div>
      <div className="guesses flex flex-col gap-2  [&>*]:p-2 my-4 [&>*]:rounded-md text-center">
        <div
          className={`guess ${
            guesses[0]
              ? guesses[0] == decryptData(answer)
                ? "bg-green-100"
                : "bg-red-100"
              : "bg-slate-100"
          }`}
        >
          <p>{guesses[0]} &nbsp;</p>
        </div>
        <div
          className={`guess ${
            guesses[1]
              ? guesses[1] == decryptData(answer)
                ? "bg-green-100"
                : "bg-red-100"
              : "bg-slate-100"
          }`}
        >
          <p>{guesses[1]} &nbsp;</p>
        </div>
        <div
          className={`guess ${
            guesses[2]
              ? guesses[2] == decryptData(answer)
                ? "bg-green-100"
                : "bg-red-100"
              : "bg-slate-100"
          }`}
        >
          <p>{guesses[2]} &nbsp;</p>
        </div>
      </div>
      {playable ? (
        <form
          className="grid grid-cols-4 gap-2 items-center"
          onSubmit={(e) => handleSubmit(e)}
          action=""
        >
          <Select
            id="selector"
            className="col-span-3"
            onChange={(value) => setSelection(value ? value.value : selection)}
            options={options}
          />
          <button
            disabled={selection ? false : true}
            className="bg-blue-500 text-white disabled:text-stone-500 disabled:bg-stone-200 b-2 w-full ml-auto p-2 leading-none font-bold rounded "
          >
            Submit
          </button>
        </form>
      ) : correct ? (
        <div className="flex flex-col col-span-4 justify-center items-center gap-2">
          <span className="col-span-4" id="correct">
            Right, well done then 🍻
          </span>
          <button
            className="bg-green-800 text-white b-2 w-min px-2 py-1 leading-none font-medium rounded uppercase"
            onClick={(e) => {
              navigator.clipboard.writeText(makeResultsString(e));
            }}
          >
            Share
          </button>
        </div>
      ) : (
        <div className="flex flex-col col-span-4 justify-center items-center gap-2">
          <span className="mx-auto text-center" id="fail">
            Answer was <span className="font-bold">{decryptData(answer)}</span>.
            Play a record.
          </span>
          <button
            className="bg-green-800 text-white  b-2 w-min  px-2 py-1 leading-none font-medium rounded uppercase"
            onClick={(e) => {
              navigator.clipboard.writeText(makeResultsString(e));
            }}
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}

export default Guesser;
