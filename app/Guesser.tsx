"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { decryptData } from "./utils/crypt";
import { makeResultsString } from "./utils/clipboard";
import { SetStats } from "./utils/stats";
import AudioPlayer from "./components/AudioPlayer";

type Props = {
  answer: string;
  id: string;
  day: string;
  question_audio?: string;
  answer_audio?: string;
};

function Guesser({ answer, id, day, question_audio, answer_audio }: Props) {
  const [playable, setPlayable] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [selection, setSelection] = useState("");
  const [clueInitials, setClueInitials] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const answerString = decryptData(answer).toLowerCase();
  const allInitials = answerString.split("");

  const maxGuesses = allInitials.length < 5 ? allInitials.length : 5;

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
    const initials = window.localStorage.getItem("rockbusters_initials");

    if (
      initials != null &&
      JSON.parse(currentAnswer ? currentAnswer : "else") == id
    ) {
      const gameInitials = JSON.parse(initials);
      setClueInitials(gameInitials.initials);
    }

    if (
      gameData != null &&
      currentAnswer != null &&
      currentAnswer != undefined &&
      JSON.parse(currentAnswer ? currentAnswer : "else") == id
    ) {
      const sessionGuesses = JSON.parse(gameData);

      if (sessionGuesses.guesses.length >= maxGuesses) {
        setPlayable(false);
        setClueInitials([...allInitials]);
      }
      setGuesses(sessionGuesses.guesses);

      const stripGuess = sessionGuesses.guesses.map((a: string) =>
        a
          .toLowerCase()
          .trim()
          .replaceAll(/[^\w\s]/g, "")
      );

      // If the answer was guessed in > the max guesses
      if (
        stripGuess.includes(
          answerString
            .toLowerCase()
            .trim()
            .replaceAll(/[^\w\s]/g, "")
        )
      ) {
        setCorrect(true);
        setPlayable(false);
        setClueInitials([...allInitials]);
      }
    }
  }, []);

  useEffect(() => {
    guesses.length >= 1 &&
      window.localStorage.setItem(
        "rockbusters_initials",
        JSON.stringify({ initials: clueInitials })
      );
  }, [guesses]);

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
    const currentLetters = [...clueInitials];
    const lettersToReveal =
      guesses.length + 1 == allLetters.length - 1
        ? 0
        : (allInitials.length - spaces * 2) / maxGuesses;
    let lettersLeft = [];

    for (let i = 0; i < allInitials.length; i++) {
      if (currentLetters[i] == allInitials[i]) {
        lettersLeft.push("");
      } else {
        lettersLeft.push(allInitials[i]);
      }
    }

    let newClues = [...clueInitials];

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

    setGuesses((guesses) => [...guesses, selection.toLowerCase().trim()]);
    if (
      selection
        .toLowerCase()
        .trim()
        .replaceAll(/[^\w\s]/g, "") ==
      answerString.trim().replaceAll(/[^\w\s]/g, "")
    ) {
      setCorrect(true);
      setPlayable(false);
      setClueInitials([...allInitials]);
      SetStats(true, guesses.length + 1);
    } else {
      setCorrect(false);
    }
    if (guesses.length == maxGuesses - 1) {
      setPlayable(false);
      SetStats(false, 0);
      setClueInitials([...allInitials]);
    }
    setSelection("");
  };

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div>
      {question_audio && (
        <AudioPlayer label="Question Audio" source={question_audio} />
      )}
      <div className="letters flex gap-1 flex-wrap max-w-[min(400px,100%)] mx-auto text-xs md:text-sm  justify-center mb-4">
        {clueInitials.includes(" ")
          ? clueInitials
              .join("")
              .split(" ")
              .map((a, i) => {
                return (
                  <div key={`word: ${i}`} className="flex mx-1   gap-1">
                    {a.split("").map((b, index) => {
                      return b == "§" ? (
                        <span
                          key={`initial${index}`}
                          className="uppercase  w-[2em] bg-stone-200 dark:bg-stone-900 rounded py-1 px-2"
                        >
                          &nbsp;
                        </span>
                      ) : (
                        <span
                          key={`initial${index}`}
                          className="uppercase  w-[2em] bg-stone-200 dark:bg-stone-900 rounded py-1 px-2"
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
                  key={`initial${i}-thing`}
                  className="uppercase w-[2em] bg-stone-200 dark:bg-stone-900 rounded py-1 px-2"
                >
                  &nbsp;
                </span>
              ) : (
                <span
                  key={`initial${i}-thing`}
                  className="uppercase w-[2em] bg-stone-200 dark:bg-stone-900 rounded py-1 px-2"
                >
                  {a}
                </span>
              );
            })}
      </div>

      <div className="guesses gap-2 my-2 flex flex-col">
        {guesses.map((a, i) => {
          return (
            <div
              key={`guess ${i}`}
              className={`guess ${
                a.replaceAll(/[^\w\s]/g, "") ==
                answerString.replaceAll(/[^\w\s]/g, "")
                  ? "bg-emerald-200 dark:bg-emerald-800"
                  : "bg-rose-200 dark:bg-pink-800"
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
            placeholder="Type your guess here..."
            value={selection}
            onChange={(e) => setSelection(e.currentTarget.value)}
            className="border-2 border-stone-200 rounded col-span-3 dark:text-stone-900"
          />
          <button className="bg-blue-500 uppercase text-white disabled:text-stone-500 disabled:bg-stone-200 b-2 w-full ml-auto p-2 leading-none font-bold rounded ">
            {selection ? "submit" : "skip"}
          </button>
        </form>
      ) : correct ? (
        <div className="flex flex-col col-span-4 justify-center items-center gap-2">
          {answer_audio && (
            <AudioPlayer label="Answer Audio" source={answer_audio} />
          )}
          <span className="col-span-4" id="correct">
            Right, well done then 🍻
          </span>
          <button
            className="bg-emerald-800 dark:bg-emerald-400 text-white dark:text-stone-700 b-2 w-min px-2 py-1 leading-none font-medium rounded uppercase"
            onClick={(e) => {
              navigator.clipboard.writeText(
                makeResultsString(e, guesses, answerString, maxGuesses, day)
              );
            }}
          >
            Share
          </button>
        </div>
      ) : (
        <div className="flex flex-col col-span-4 justify-center items-center gap-2">
          {answer_audio && (
            <AudioPlayer label="Answer Audio" source={answer_audio} />
          )}
          <span className="mx-auto text-center" id="fail">
            Answer was{" "}
            <span className="font-bold capitalize">{answerString}</span>. Play a
            record.
          </span>
          <button
            className="bg-emerald-800  dark:bg-emerald-400 text-white  dark:text-stone-700 b-2 w-min  px-2 py-1 leading-none font-medium rounded uppercase"
            onClick={(e) => {
              navigator.clipboard.writeText(
                makeResultsString(e, guesses, answerString, maxGuesses, day)
              );
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
