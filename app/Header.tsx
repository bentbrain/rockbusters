import React from "react";
import InformationButton from "./InformationButton";

const headerText = `Uh, I give you like a cryptic clue and some initials and it sort of makes up a band. So an easy one that we did at the start was, uh, an exploding pet, A.K – Atomic Kitten. Yeah, that's how it works.`;

function Header() {
  return (
    <header className="bg-white p-4 shadow">
      <div className="inner max-w-[min(1200px,100%)] mx-auto text-center flex ">
        <div className="center -translate-x-5 flex gap-2 items-center mx-auto">
          <img className="w-10" src="/karl.png" alt="Karl Pilkington Head" />
          <h2 className="font-black text-xl text-stone-800">Rockbusters</h2>
        </div>
        <InformationButton />
      </div>
    </header>
  );
}

export default Header;
