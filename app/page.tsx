import React from "react";
import Guesser from "./Guesser";
import CryptoJS from "crypto-js";
import AudioPlayer from "./components/AudioPlayer";
import { VideoPlayer } from "./components/VideoPlayer";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

const fetchURL = process.env.FETCH_URL;
const cryptKey = process.env.NEXT_PUBLIC_CRYPT_KEY;

async function getData() {
  const res = await fetch(`${fetchURL}api/datequestion`, {
    next: { revalidate: 60 * 10 },
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
    answer: "This is a really long name with a lot of words",
    id: "1220",
    day: "4",
    question_audio: "",
    answer_audio: "",
  };
}

async function Home() {
  const question = await getData();

  return (
    <div className="text-center">
      {/* {question.question_audio != "false" ? (
        <VideoPlayer
          hint={`#${question.day}: ${question.hint}`}
          audio={question.question_audio}
        />
      ) : (
        <h1 className="text-2xl font-bold mb-2">
          #{question.day}: {question.hint}
        </h1>
      )} */}
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
