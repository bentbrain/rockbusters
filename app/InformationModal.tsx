"use client";

import React, { Dispatch, SetStateAction } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const closeModal = () => {
  const modal: HTMLDialogElement = document.querySelector("#information")!;
  modal.close();
};

function InformationModal({ isOpen, setOpen }: Props) {
  if (isOpen) {
    const modal: HTMLDialogElement = document.querySelector("#information")!;
    if (!modal.open) {
      modal.showModal();
    }
  } else {
  }

  return (
    <dialog
      id="information"
      className=" backdrop:bg-stone-100/80 bg-white max-w-[min(55ch,calc(100%-2rem))] rounded-md shadow"
    >
      <div className="flex justify-between gap-2 mb-3">
        <IoCloseCircleOutline opacity={0} size={30} />
        <h3 className="font-black text-xl text-stone-800 ">How to Play</h3>
        <button
          onClick={() => {
            setOpen(false);
            closeModal();
          }}
        >
          <IoCloseCircleOutline size={30} />
        </button>
      </div>

      <p className="mb-2">
        Uh, I give you like a cryptic clue and some initials and it sort of
        makes up a band. So an easy one that we did at the start was, uh, an{" "}
        <strong>exploding pet, A.K – Atomic Kitten</strong>. Yeah, that's how it
        works.
      </p>
      <p className="font-medium">1 clue per day, 3 guesses.</p>
    </dialog>
  );
}

export default InformationModal;
