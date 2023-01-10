import React from "react";
import Guesser from "./Guesser";
import CryptoJS from "crypto-js";
import AudioPlayer from "./components/AudioPlayer";

const fetchURL = process.env.FETCH_URL;
const cryptKey = process.env.NEXT_PUBLIC_CRYPT_KEY;

async function getData() {
  const res = await fetch(`${fetchURL}api/datequestion`, {
    next: { revalidate: 60 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data from ${fetchURL}api/datequestion`);
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
    answer: "cher",
    id: "1220",
    day: "4",
  };
}

async function Home() {
  const question = await getData();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">
        #{question.day}: {question.hint}
      </h1>
      <Guesser
        id={question.id}
        day={question.day}
        answer={encryptData(question.answer)}
        question_audio={question.question_audio}
        answer_audio={question.answer_audio}
      />
    </div>
  );
}

export default Home;
