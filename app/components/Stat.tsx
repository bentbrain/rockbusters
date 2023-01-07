import React from "react";

type Props = {
  stat: number;
  text: string;
};

function Stat({ stat, text }: Props) {
  return (
    <div>
      <p className="text-3xl mb-2 font-bold">{stat.toString()}</p>
      <p className="text-xs text-stone-600">{text}</p>
    </div>
  );
}

export default Stat;
