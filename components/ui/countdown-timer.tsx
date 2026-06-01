"use client";

import { revalidateGame } from "@/app/actions";
import { getTimeLeft } from "@/lib/countdown";
import type { TimeLeft } from "@/lib/countdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "./card";

const CountdownTimer = ({
  initialTimeLeft,
  serverTime,
}: {
  initialTimeLeft: TimeLeft;
  serverTime: string;
}) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (serverTime) {
      const calculateTimeLeft = () => {
        const nextTimeLeft = getTimeLeft(serverTime);

        if (
          nextTimeLeft.hours === 0 &&
          nextTimeLeft.minutes === 0 &&
          nextTimeLeft.seconds === 0
        ) {
          void revalidateGame();
          router.refresh();
        }

        return nextTimeLeft;
      };
      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft());
      };
      const timer = setInterval(updateTimer, 1000);
      updateTimer(); // Initial call to set the timer
      return () => clearInterval(timer);
    }
  }, [serverTime, router]);
  return (
    <div className="text-sm grid gap-1 text-muted-foreground font-mono">
      <h2>Next Rockbuster</h2>
      <div className="flex items-center   justify-center gap-0.5 ">
        <Card className="w-[3.5ch] h-[3.5ch] grid  place-items-center text-muted-foreground  shadow-none rounded-sm">
          {timeLeft.hours}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {timeLeft.minutes}
        </Card>
        :
        <Card className="w-[3.5ch] h-[3.5ch] grid place-items-center text-muted-foreground  shadow-none rounded-sm">
          {timeLeft.seconds}
        </Card>
      </div>
    </div>
  );
};
export default CountdownTimer;
