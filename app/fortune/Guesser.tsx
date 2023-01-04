"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Artists from "./../artists";
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
  const [allInitials, setAllInitials] = useState(decryptData(answer).split(""));
  const [clueInitials, setClueInitials] = useState<String[]>([]);
  const [guesses, setGuesses] = useState<String[]>([]);
  const artists = Artists();

  const maxGuesses =
    decryptData(answer).length < 5 ? decryptData(answer).length : 5;

  const makeResultsString = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.currentTarget.innerText = "Copied";

    const answerPosition = guesses.indexOf(decryptData(answer).toLowerCase());
    let resultString: string[] = [];

    if (answerPosition < 0)
      return `Rockbusters #${day}

🙈 🟥 🟥 🟥 🟥 🟥
https://rockbusters.vercel.app/fortune`;

    for (var i = 0; i < maxGuesses; i++) {
      if (resultString.includes("🟩")) {
        resultString.push("⬜️");
      } else {
        i == answerPosition ? resultString.push("🟩") : resultString.push("🟥");
      }
    }
    return `Rockbusters #${day}

🙊 ${resultString.join(" ")}
https://rockbusters.vercel.app/fortune`;
  };

  useEffect(() => {
    const initials = [...allInitials];
    let tempInitials = [];
    let capitalNext = false;
    for (let i = 0; i < initials.length; i++) {
      if (capitalNext) {
        tempInitials.push(initials[i]);
        capitalNext = false;
      } else if (i == 0) {
        tempInitials.push(initials[i]);
        capitalNext = false;
      } else if (initials[i] == " ") {
        tempInitials.push(" ");
        capitalNext = true;
      } else {
        tempInitials.push("§");
        capitalNext = false;
      }
    }

    setClueInitials(tempInitials);
  }, []);

  useEffect(() => {
    const gameData = window.localStorage.getItem("rockbusters_game_fortune");
    const currentAnswer = window.localStorage.getItem("current_answer_fortune");
    if (
      gameData != null &&
      currentAnswer != null &&
      currentAnswer != undefined &&
      JSON.parse(currentAnswer ? currentAnswer : "else") == id
    ) {
      const sessionGuesses = JSON.parse(gameData);
      if (sessionGuesses.guesses.length >= maxGuesses) {
        setPlayable(false);
      }
      setGuesses(sessionGuesses.guesses);
      if (sessionGuesses.guesses.includes(decryptData(answer).toLowerCase())) {
        setCorrect(true);
        setPlayable(false);
        setClueInitials([...allInitials]);
      }
    }
  }, []);

  useEffect(() => {
    guesses.length >= 1 &&
      window.localStorage.setItem(
        "rockbusters_game_fortune",
        JSON.stringify({ guesses: guesses })
      );
  }, [guesses]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.localStorage.setItem("current_answer_fortune", JSON.stringify(id));

    const allLetters = [...allInitials];
    const spaces = allLetters.filter((x) => x === " ").length;
    console.log(spaces);
    const currentLetters = [...clueInitials];
    const lettersToReveal = (allInitials.length - 1 - spaces * 2) / maxGuesses;
    let lettersLeft = [];

    for (let i = 0; i < allInitials.length; i++) {
      if (currentLetters[i] == allInitials[i]) {
        lettersLeft.push("");
      } else {
        lettersLeft.push(allInitials[i]);
      }
    }

    let newClues = [...clueInitials];

    console.log(lettersToReveal);
    for (let i = 0; i < Math.floor(lettersToReveal); ) {
      let randomInt = randomIntFromInterval(0, lettersLeft.length - 1);
      let letter = lettersLeft[randomInt];
      if (letter == "" || letter == " ") {
        continue;
      } else {
        newClues.splice(randomInt, 1, letter);
        lettersLeft.splice(randomInt, 1, "");
        i++;
        continue;
      }
      i++;
    }

    setClueInitials(newClues);

    setGuesses((guesses) => [...guesses, selection.toLowerCase()]);
    if (selection.toLowerCase() == decryptData(answer).toLowerCase()) {
      setCorrect(true);
      setPlayable(false);
      setClueInitials([...allInitials]);
    } else {
      setCorrect(false);
    }
    if (guesses.length == maxGuesses - 1) {
      setPlayable(false);
      setClueInitials([...allInitials]);
    }
    setSelection("");
  };

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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
      <div className="letters flex gap-1 flex-wrap max-w-[min(400px,100%)] mx-auto  justify-center mb-4">
        {clueInitials.includes(" ")
          ? clueInitials
              .join("")
              .split(" ")
              .map((a, i) => {
                return (
                  <div className="flex mx-1  gap-1">
                    {a.split("").map((b, index) => {
                      return b == "§" ? (
                        <span
                          key={`initial${index}`}
                          className="uppercase  w-[2em] bg-stone-200 rounded py-1 px-2"
                        >
                          &nbsp;
                        </span>
                      ) : (
                        <span
                          key={`initial${index}`}
                          className="uppercase  w-[2em] bg-stone-200 rounded py-1 px-2"
                        >
                          {b}
                        </span>
                      );
                    })}
                  </div>
                );
              })
          : clueInitials.map((a, i) => {
              return a == "§" ? (
                <span
                  key={`initial${i}`}
                  className="uppercase w-[2em] bg-stone-200 rounded py-1 px-2"
                >
                  &nbsp;
                </span>
              ) : (
                <span
                  key={`initial${i}`}
                  className="uppercase w-[2em] bg-stone-200 rounded py-1 px-2"
                >
                  {a}
                </span>
              );
            })}
      </div>
      <div className="guesses gap-2 my-2 flex flex-col">
        {guesses.map((a) => {
          return (
            <div
              className={`guess ${
                a == decryptData(answer).toLowerCase()
                  ? "bg-green-100"
                  : "bg-red-100"
              } rounded capitalize p-1 `}
            >
              {a ? a : "–"}
            </div>
          );
        })}
      </div>
      {playable ? (
        <form
          className="grid grid-cols-4 gap-2 items-center"
          onSubmit={(e) => handleSubmit(e)}
          action=""
        >
          <input
            type="text"
            onChange={(e) => setSelection(e.currentTarget.value)}
            className="border-2 border-stone-200 rounded col-span-3"
          />
          <button className="bg-blue-500 uppercase text-white disabled:text-stone-500 disabled:bg-stone-200 b-2 w-full ml-auto p-2 leading-none font-bold rounded ">
            {selection ? "submit" : "skip"}
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
