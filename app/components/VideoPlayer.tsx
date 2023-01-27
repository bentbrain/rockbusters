"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Player } from "@remotion/player";
import { MyComposition } from "../../remotion/Composition";

type Props = {
  audio: string;
  hint: string;
};

export const VideoPlayer = ({ audio, hint }: Props) => {
  const [duration, setDuration] = useState(1);

  const getDuration = useCallback(async () => {
    const remote = await getAudioDurationInSeconds(audio);
    setDuration(remote);
  }, []);

  useEffect(() => {
    getDuration();
  }, []);

  return (
    <Player
      component={MyComposition}
      inputProps={{
        text: hint,
        audio: audio,
      }}
      durationInFrames={Math.ceil(duration * 30)}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      controls
      style={{
        height: "unset",
        width: "100%",
      }}
      className="max-w-full aspect-video mb-6 rounded-md"
    />
  );
};
