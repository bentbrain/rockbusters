import React from "react";
import InformationButton from "./InformationButton";
import StatsButton from "./StatsButton";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
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
    <header className="bg-white dark:bg-stone-800 p-4 shadow">
      <div className="inner max-w-[min(1200px,100%)] mx-auto text-center flex justify-between ">
        <div className="hidden md:flex gap-2">
          <IoInformationCircleOutline
            className="invisible"
            opacity={0}
            size={30}
          />
          <BsBarChart className="invisible" opacity={0} size={25} />
        </div>
        <div className="center md:-translate-x-5 flex gap-2 items-center">
          <img
            className="w-10"
            width={40}
            height={40}
            src={
              question.hint.toLowerCase().includes("jamaican")
                ? `/karl-jamaican.png`
                : `/karl.png`
            }
            alt="Karl Pilkington Head"
          />
          <h2 className="font-black text-xl dark:text-white text-stone-800">
            Rockbusters
          </h2>
        </div>
        <div className="buttons flex gap-2">
          <StatsButton />
          <InformationButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
