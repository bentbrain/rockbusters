import React from "react";

type Props = {
  index: number;
  size: number;
  value: number;
};

function StatBar({ index, size, value }: Props) {
  return (
    <div className="grid gap-1 text-center text-sm grid-cols-[1em,1fr]">
      <p className="font-semibold">{index.toString()}</p>
      <p
        style={{
          width: `${size}%`,
        }}
        className={` rounded text-stone-500 min-w-[2em] bg-stone-300`}
      >
        {value}
      </p>
    </div>
  );
}

export default StatBar;
