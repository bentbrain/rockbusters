import React from "react";
import sanityClient from "./client.js";

const fetchURL = process.env.FETCH_URL;

async function getData() {
  const res = await fetch(`${fetchURL}api/question`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Home() {
  const question = await getData();

  return (
    <div>
      <h1>{question.hint}</h1>
    </div>
  );
}

export default Home;
