import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { Composition, getInputProps } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { MyComposition } from "./Composition";

const inputProps = getInputProps();

export const RemotionRoot: React.FC = () => {
  const [duration, setDuration] = useState(1);

  const getDuration = useCallback(async () => {
    const remote = await getAudioDurationInSeconds(
      inputProps?.audio ??
        "https://cdn.sanity.io/files/qqo9n2ek/production/812726e8898008896cc441d415dedc1f1983b876.wav"
    );

    setDuration(remote);
  }, []);

  useEffect(() => {
    getDuration();
  }, []);

  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={Math.ceil(30 * duration)}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          text: "Test",
          audio:
            "https://cdn.sanity.io/files/qqo9n2ek/production/812726e8898008896cc441d415dedc1f1983b876.wav",
        }}
      />
    </>
  );
};
