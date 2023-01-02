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
  const [correct, setCorrect] = useState("wrong");
  const [selection, setSelection] = useState("Initial Value");
  const artists = Artists();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (selection == answer) {
      setCorrect("correct");
    }
  };

  const options = artists.map((a, i) => {
    return {
      value: a,
      label: a,
    };
  });

  console.log(options);

  return (
    <div>
      <h3>{correct}</h3>
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <Select
          id="selector"
          onChange={(value) => setSelection(value ? value.value : selection)}
          options={options}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Guesser;
