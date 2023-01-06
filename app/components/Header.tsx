import React from "react";
import InformationButton from "./InformationButton";
import { IoInformationCircleOutline } from "react-icons/io5";
const headerText = `Uh, I give you like a cryptic clue and some initials and it sort of makes up a band. So an easy one that we did at the start was, uh, an exploding pet, A.K – Atomic Kitten. Yeah, that's how it works.`;

const fetchURL = process.env.FETCH_URL;

async function getData() {
  const res = await fetch(`${fetchURL}api/datequestion`, {
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

async function Header() {
  const question = await getData();

  return (
    <header className="bg-white p-4 shadow">
      <div className="inner max-w-[min(1200px,100%)] mx-auto text-center flex ">
        <IoInformationCircleOutline
          className="invisible"
          opacity={0}
          size={30}
        />
        <div className="center -translate-x-5 flex gap-2 items-center mx-auto">
          <img
            className="w-10"
            src={
              question.hint.toLowerCase().includes("jamaican")
                ? `/karl-jamaican.png`
                : `/karl.png`
            }
            alt="Karl Pilkington Head"
          />
          <h2 className="font-black text-xl text-stone-800">Rockbusters</h2>
        </div>
        <InformationButton />
      </div>
    </header>
  );
}

export default Header;
