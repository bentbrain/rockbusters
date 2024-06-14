"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Stats, useStatistics } from "@/hooks/use-statistics";
import { CalculatePercentage, TransformOldStats, cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "./progress";
import { Separator } from "./separator";

export function StatisticDisplay({
  displayType,
}: {
  displayType: "icon" | "text";
}) {
  const [open, setOpen] = React.useState(false);
  const [stats, setStats] = useStatistics();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            {...(displayType === "icon" && { size: "icon" })}
          >
            {displayType === "icon" ? (
              <BarChart3 className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" /> View stats
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Statistics</DialogTitle>
          </DialogHeader>
          <InformationContent stats={stats} className="grid gap-4" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          {...(displayType === "icon" && { size: "icon" })}
        >
          {displayType === "icon" ? (
            <BarChart3 className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <>
              <BarChart3 className="h-4 w-4 mr-2" /> View stats
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Statistics</DrawerTitle>
        </DrawerHeader>
        <InformationContent stats={stats} className="p-4 pt-2 grid gap-4" />
      </DrawerContent>
    </Drawer>
  );
}

const InfoChip = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="grid place-items-center gap-2 text-center">
      <div className="border font-medium border-input bg-background rounded-md grid place-items-center shadow-sm h-12 w-12">
        {value}
      </div>
      <p className="text-xs">{label}</p>
    </div>
  );
};

const DistBar = ({
  label,
  value,
  total,
  index,
}: {
  label: string;
  value: number;
  total: number;
  index: number;
}) => {
  const [percentage, setPercentage] = useState(0);

  const calcPercent = CalculatePercentage(total, value);

  useEffect(() => {
    const timer = setTimeout(() => setPercentage(calcPercent), 50 * index);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-[12ch,1fr] items-center font-medium">
      <p>{label}</p> <Progress value={percentage} />
    </div>
  );
};

function OrderOldStats(guesses: Stats["guesses"]) {
  const arrayFromOldStats = Object.keys(guesses);
  const indexOfZero = arrayFromOldStats.indexOf("0");
  if (indexOfZero != arrayFromOldStats.length - 1) {
    arrayFromOldStats.splice(indexOfZero, 1);
    arrayFromOldStats.push("0");
  }
  return arrayFromOldStats;
}

function InformationContent({
  className,
  stats,
}: Readonly<{
  className: string;
  stats: Stats;
}>) {
  const totalWins = stats.played - stats.guesses[0];
  const winPercentage = CalculatePercentage(stats.played, totalWins);
  const orderedGuesses = OrderOldStats(stats.guesses);

  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-4 gap-2 items-start pb-2 pt-3">
        <InfoChip label="Played" value={stats.played} />
        <InfoChip label="Win %" value={parseFloat(winPercentage.toFixed(1))} />
        <InfoChip label="Current streak" value={stats.currentStreak} />
        <InfoChip label="Max streak" value={stats.maxStreak} />
      </div>
      <Separator />
      <h3 className="font-semibold">Distribution</h3>
      <div className="grid gap-1">
        {orderedGuesses.map((stat) => {
          return (
            <DistBar
              key={stat}
              index={parseInt(stat)}
              label={TransformOldStats(parseInt(stat))}
              value={stats.guesses[stat]}
              total={stats.played}
            />
          );
        })}
      </div>
    </div>
  );
}
