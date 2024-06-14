"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Separator } from "./separator";

export function InformationDisplay() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Info className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How to play</DialogTitle>
          </DialogHeader>
          <InformationContent className="grid gap-4" />
          <Separator />
          <DialogFooter>
            <p className="text-sm">
              These questions were written by the genius, Karl&nbsp;Pilkington.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>How to play</DrawerTitle>
        </DrawerHeader>
        <InformationContent className="p-4 pt-2 grid gap-4" />
        <Separator />
        <DrawerFooter className="py-4 pb-6">
          <p className="text-sm">
            These questions were written by the genius, Karl&nbsp;Pilkington.
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function InformationContent({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("", className)}>
      <p>
        I give you like a cryptic clue and some initials and it sort of makes up
        a band. So an easy one is, uh..
      </p>
      <p>
        <span className="font-semibold">Hint:</span> An Exploding Pet
      </p>
      <p>
        <span className="font-semibold">Initials:</span> A.K
      </p>
      <p>
        <span className="font-semibold">Answer:</span> Atomic Kitten
      </p>
      <p>Yeah, that&apos;s how it works. 1 clue per day, 5 guesses.</p>
    </div>
  );
}
