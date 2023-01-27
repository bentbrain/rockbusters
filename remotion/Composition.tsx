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
  }); // [0.22, 0.1, 0.01, 0.01, 0.01, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const scale = visualization.reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className="w-full bg-white h-full flex flex-col justify-center gap-20  items-center text-center py-6 px-10 text-[5rem] font-bold ">
      <div>
        <img
          style={{
            transform: `scale(${1 + scale / 5})`,
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
