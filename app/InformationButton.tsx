"use client";
import InformationModal from "./InformationModal";
import {
  IoInformationCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

function InformationButton() {
  const openModal = () => {
    const modal: HTMLDialogElement = document.querySelector("#information")!;
    modal.showModal();
  };

  const closeModal = () => {
    const modal: HTMLDialogElement = document.querySelector("#information")!;
    modal.close();
  };

  const backdropClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal: HTMLDialogElement = document.querySelector("#information")!;
    const rect = e.currentTarget.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      modal.close();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => openModal()}>
        <IoInformationCircleOutline size={30} />
      </button>
      <dialog
        id="information"
        className=" backdrop:bg-stone-100/80 bg-white max-w-[min(55ch,calc(100%-2rem))] rounded-md shadow"
        onClick={(e) => backdropClose(e)}
      >
        <div className="flex justify-between gap-2 mb-3">
          <IoCloseCircleOutline opacity={0} size={30} />
          <h3 className="font-black text-xl text-stone-800 ">How to Play</h3>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <IoCloseCircleOutline size={30} />
          </button>
        </div>

        <p className="mb-2 italic">
          Uh, I give you like a cryptic clue and some initials and it sort of
          makes up a band. So an easy one that we did at the start was, uh, an{" "}
          <strong>exploding pet, A.K – Atomic Kitten</strong>. Yeah, that's how
          it works.
        </p>
        <p className="font-medium text-lg mb-2">1 clue per day, 5 guesses.</p>
        <p className="my-2">
          After each failed guess, more letters will be revealed.
        </p>
        <p className="text-sm text-stone-400">
          These questions were written by the genius,{" "}
          <a
            className="underline"
            href="https://www.facebook.com/KarlPilkington/"
          >
            Karl Pilkington
          </a>
          .
        </p>
      </dialog>
    </div>
  );
}

export default InformationButton;
