import React from "react";

type Props = {
  source: string;
};

function AudioPlayer({ source }: Props) {
  return (
    <audio className="w-full my-4" controls>
      <source src={source} type="audio/wav" />
    </audio>
  );
}

export default AudioPlayer;
