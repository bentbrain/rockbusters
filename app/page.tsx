import React from "react";
import sanityClient from "./client.js";
import Guesser from "./Guesser";

const fetchURL = process.env.FETCH_URL;

async function getData() {
  const res = await fetch(`${fetchURL}api/question`, {
    next: { revalidate: 60 },
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

// async function tempGetData() {
//   return {
//     hint: "temporary",
//     initials: "temporary",
//     answer: "temporary",
//   };
// }

async function Home() {
  const question = await getData();

  return (
    <div>
      <h1 className="text-3xl mb-2">{question.hint}</h1>
      <h2 className="text-xl mb-1">Initials: {question.initials}</h2>
      <Guesser
        hint={question.hint}
        initials={question.initials}
        answer={question.answer}
      />
    </div>
  );
}

export default Home;
