"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
import { GetStats } from "../utils/stats";
import { Tapestry } from "@next/font/google";
import Stat from "./Stat";
import StatBar from "./StatBar";
import { useEffect, useState } from "react";

type Stats = {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guesses: { [key: string]: number };
};

const initialGameData = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guesses: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

function InformationButton() {
  const [stats, setStats] = useState<Stats>(initialGameData);

  const openModal = () => {
    setStats(GetStats());
    const modal: HTMLDialogElement = document.querySelector("#stats")!;
    modal.showModal();
  };

  const closeModal = () => {
    const modal: HTMLDialogElement = document.querySelector("#stats")!;
    modal.close();
  };

  const backdropClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal: HTMLDialogElement = document.querySelector("#stats")!;
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
        <BsBarChart size={25} />
      </button>
      <dialog
        id="stats"
        className=" backdrop:bg-stone-100/80 bg-white max-w-[min(55ch,calc(100%-2rem))] rounded-md shadow"
        onClick={(e) => backdropClose(e)}
      >
        <div className="flex justify-between gap-2 mb-3">
          <IoCloseCircleOutline opacity={0} size={30} />
          <h3 className="font-black text-xl text-stone-800 ">Statistics</h3>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <IoCloseCircleOutline size={30} />
          </button>
        </div>

        <div className="grid grid-cols-4 [&>*]:flex [&>*]:flex-col text-center mb-5  ">
          <Stat stat={stats.played} text="Played" />
          <Stat
            stat={stats.played ? (100 * stats.wins) / stats.played : 0}
            text="Win %"
          />
          <Stat stat={stats.currentStreak} text="Current Streak" />
          <Stat stat={stats.maxStreak} text="Max Streak" />
        </div>
        <div>
          <p className="font-semibold mb-1">Distribution</p>
          <div className="flex flex-col gap-1">
            {Object.keys(stats.guesses).map((a, i) => {
              return i != 0 ? (
                <StatBar
                  index={parseInt(a)}
                  size={stats.guesses[a] * (100 / stats.played)}
                  value={stats.guesses[a]}
                />
              ) : null;
            })}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default InformationButton;
