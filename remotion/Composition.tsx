import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

type Props = {
  text: string;
  audio: string;
};

export const MyComposition = ({ text, audio }: Props) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const audioData = useAudioData(audio);

  if (!audioData) {
    return null;
  }

  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 16,
  });

  const scale = visualization.reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className="w-full bg-white dark:bg-stone-900 h-full flex flex-col justify-center gap-20  items-center text-center pt-6 pb-20 px-10 text-[5rem] font-bold ">
      <div>
        <img
          style={{
            transform: `scale(${1 + visualization[1] / 4})`,
            width: 400,
          }}
          src={
            text.toLowerCase().includes("jamaican")
              ? `/karl-jamaican.png`
              : `/karl.png`
          }
          alt=""
        />
      </div>
      <p className=" place-self-start">{text}</p>
      <AbsoluteFill>
        <Audio src={audio} />
      </AbsoluteFill>
    </div>
  );
};
