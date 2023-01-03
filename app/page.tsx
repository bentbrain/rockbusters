import React from "react";
import sanityClient from "./client.js";
import Guesser from "./Guesser";
import CryptoJS from "crypto-js";

const fetchURL = process.env.FETCH_URL;
const cryptKey = process.env.NEXT_PUBLIC_CRYPT_KEY;

async function getData() {
  const res = await fetch(`${fetchURL}api/datequestion`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const encryptData = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    text,
    cryptKey ? cryptKey : "somethingElse"
  ).toString();

  return encrypted;
};

async function tempGetData() {
  return {
    hint: "temporary",
    initials: "N.S!",
    answer: "NSYNC",
    id: "1220",
  };
}

async function Home() {
  const question = await getData();

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-2">{question.hint}</h1>
      <h2 className="text-xl mb-1">
        <span className="font-medium">Initials: </span>
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
        day={question.day}
        answer={encryptData(question.answer)}
      />
    </div>
  );
}

export default Home;
