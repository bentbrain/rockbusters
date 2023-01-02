import React from "react";
import sanityClient from "./client.js";
import Guesser from "./Guesser";

const fetchURL = process.env.FETCH_URL;

async function getData() {
  const res = await fetch(`${fetchURL}api/question`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function tempGetData() {
  return {
    hint: "temporary",
    initials: "N.S!",
    answer: "Lou Reed",
    id: "1220",
  };
}

async function Home() {
  const question = await getData();

  console.log(question);

  return (
    <div>
      <img className="h-14" src="/karl.png" alt="Karl Pilkington Head" />
      <h1 className="text-3xl mb-2">{question.hint}</h1>

      <h2 className="text-xl mb-1">
        Initials:{" "}
        {question.initials.includes("!") ? (
          <dfn
            title="Remember, Karl is a moron – this could be wrong"
            className="underline decoration-dotted"
          >
            {question.initials.replace("!", "")}
          </dfn>
        ) : (
          question.initials
        )}
      </h2>
      <Guesser
        id={question.id}
        hint={question.hint}
        initials={question.initials}
        answer={question.answer}
      />
    </div>
  );
}

export default Home;
