"use client";

import { revalidateGame } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card } from "./card";

const CountdownTimer = ({ serverTime }: { serverTime: string }) => {
  const router = useRouter();
  const hasExpiredRef = useRef(false);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    hasExpiredRef.current = false;
    if (serverTime) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const resetDate = new Date(serverTime);
        resetDate.setUTCHours(24, 0, 0, 0); // Set to midnight UTC
        if (now.getTime() >= resetDate.getTime()) router.refresh();
        if (
          now.getUTCHours() === 0 &&
          now.getUTCMinutes() === 0 &&
          now.getUTCSeconds() === 0
        ) {
          resetDate.setDate(resetDate.getDate() + 1); // Move to the next day if it's exactly midnight
        }
        const rawTimeLeft = resetDate.getTime() - now.getTime();
        const clampedTimeLeft = Math.max(rawTimeLeft, 0);
        const hours = Math.floor((clampedTimeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((clampedTimeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((clampedTimeLeft / 1000) % 60);
        const milliseconds = Math.floor(clampedTimeLeft % 1000);

        if (!hasExpiredRef.current && clampedTimeLeft === 0) {
          hasExpiredRef.current = true;
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
      const timer = setInterval(updateTimer, 10);
      updateTimer(); // Initial call to set the timer
      return () => clearInterval(timer);
    }
  }, [serverTime, router]);

  const formatTime = (value: number, width = 2) =>
    value.toString().padStart(width, "0");

  return (
    <div className="text-sm grid gap-1 text-muted-foreground font-mono">
      <h2>Next Rockbuster</h2>
      <div className="flex items-center   justify-center gap-0.5 ">
        <Card className="w-[3.5ch] h-[3.5ch] grid  place-items-center text-muted-foreground  shadow-none rounded-sm">
          {formatTime(timeLeft.hours)}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {formatTime(timeLeft.minutes)}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {formatTime(timeLeft.seconds)}
        </Card>
        :
        <Card className="w-[4.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {formatTime(timeLeft.milliseconds, 3)}
        </Card>
      </div>
    </div>
  );
};
export default CountdownTimer;
