"use client";

import React, { useEffect, useState } from "react";

let currentTime = new Date();
const rockbusterTime = new Date("2023-01-02T14:00:00.000Z");
const difference = getNumberOfDays(rockbusterTime, currentTime);
const dateOffset = 24 * 60 * 60 * 1000 * difference; //5 days

const currentDiff = () => {
  const now = new Date();
  var countdownDate = new Date();
  countdownDate.setTime(now.getTime() - dateOffset);
  return countdownDate;
};

function getNumberOfDays(start: Date, end: Date) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const altDiff = Math.ceil(
    Math.abs(date1.getTime() - date2.getTime()) / 36e5 / 24
  );

  return altDiff;
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<number>();

  useEffect(() => {
    timerInterval();
  }, []);

  const timerInterval = () => setInterval(startCountdown, 1000);

  const startCountdown = () => {
    const difference = rockbusterTime.getTime() - currentDiff().getTime();
    setTimeLeft(difference / 1000);
  };

  return (
    <div>
      <div id="timer" className="text-stone-400 w-full">
        <p>
          <span className="font-semibold">Next Rockbuster: </span>
          <span role="timer" id="hours">
            {timeLeft
              ? Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60))
                  .toString()
                  .padStart(2, "0")
              : "00"}
            :
          </span>
          <span role="timer" id="minutes">
            {timeLeft
              ? Math.floor((timeLeft! % (60 * 60)) / 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
            :
          </span>
          <span role="timer" id="seconds">
            {timeLeft
              ? Math.floor(timeLeft! % 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Countdown;
