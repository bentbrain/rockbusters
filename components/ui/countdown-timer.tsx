"use client";

import { revalidateGame } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "./card";

const CountdownTimer = ({ serverTime }: { serverTime: string }) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    if (serverTime) {
      const calculateTimeLeft = () => {
        const now = Date.now();
        const resetDate = new Date(serverTime);
        resetDate.setUTCHours(24, 0, 0, 0); // Set to midnight UTC
        const timeLeft = Math.max(0, resetDate.getTime() - now);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const milliseconds = timeLeft % 1000;

        if (timeLeft === 0) {
          revalidateGame();
          router.refresh();
        }

        return {
          hours,
          minutes,
          seconds,
          milliseconds,
        };
      };
      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft());
      };
      const timer = setInterval(updateTimer, 50);
      updateTimer(); // Initial call to set the timer
      return () => clearInterval(timer);
    }
  }, [serverTime, router]);
  return (
    <div className="text-sm grid gap-1 text-muted-foreground font-mono">
      <h2>Next Rockbuster</h2>
      <div className="flex items-center   justify-center gap-0.5 ">
        <Card className="w-[3.5ch] h-[3.5ch] grid  place-items-center text-muted-foreground  shadow-none rounded-sm">
          {String(timeLeft.hours).padStart(2, "0")}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {String(timeLeft.minutes).padStart(2, "0")}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {String(timeLeft.seconds).padStart(2, "0")}
        </Card>
        .
        <Card className="w-[4ch] h-[3.5ch] grid place-items-center text-muted-foreground shadow-none rounded-sm">
          {String(timeLeft.milliseconds).padStart(3, "0")}
        </Card>
      </div>
    </div>
  );
};
export default CountdownTimer;
