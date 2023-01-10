import React from "react";

type Props = {
  source: string;
  label?: string;
};

function AudioPlayer({ source, label }: Props) {
  return (
    <figure className="w-full mb-4 mt-2">
      <audio controlsList="nodownload" className="w-full" controls>
        <source src={source} type="audio/wav" />
      </audio>
      {label && (
        <figcaption className="text-xs mt-0.5 text-stone-400">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default AudioPlayer;
