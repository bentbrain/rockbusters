"use client";

import React, { FormEvent, useState } from "react";
import Artists from "./artists";
import Select from "react-select";

type Props = {
  hint: string;
  initials: string;
  answer: string;
};

function Guesser({ hint, initials, answer }: Props) {
  const [playable, setPlayable] = useState(true);
  const [correct, setCorrect] = useState("");
  const [selection, setSelection] = useState("Initial Value");
  const artists = Artists();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selection == answer) {
      setCorrect("correct");
      setPlayable(false);
    } else {
      setCorrect("wrong");
    }
  };

  const options = artists.map((a, i) => {
    return {
      value: a,
      label: a,
    };
  });

  return (
    <div>
      <h3>{correct}</h3>
      <form
        className="grid grid-cols-4"
        onSubmit={(e) => handleSubmit(e)}
        action=""
      >
        {playable ? (
          <>
            <Select
              id="selector"
              className="col-span-3"
              onChange={(value) =>
                setSelection(value ? value.value : selection)
              }
              options={options}
            />
            <button className="bg-[#ffb3b6] w-min mx-auto px-2 leading-none font-bold rounded-full">
              Submit
            </button>
          </>
        ) : (
          <span id="correct"></span>
        )}
      </form>
    </div>
  );
}

export default Guesser;
