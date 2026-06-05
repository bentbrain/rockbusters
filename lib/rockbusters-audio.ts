import { env } from "@/lib/env";

export const defaultAudioBaseUrl =
  "https://pub-28f3be4d403e42d09e69bafe4ec255bf.r2.dev";

const questionIndexesWithoutAnswerAudio = new Set([77, 118]);

function buildAudioUrl(fileName: string) {
  const baseUrl =
    env.NEXT_PUBLIC_ROCKBUSTERS_AUDIO_BASE_URL ?? defaultAudioBaseUrl;

  return `${baseUrl.replace(/\/$/, "")}/${fileName}`;
}

export function getQuestionAudio(index: number) {
  const audioId = String(index + 1).padStart(3, "0");
  return {
    answerUrl: questionIndexesWithoutAnswerAudio.has(index)
      ? undefined
      : buildAudioUrl(`rockbuster-${audioId}-answer.mp3`),
    questionUrl: buildAudioUrl(`rockbuster-${audioId}-question.mp3`),
  };
}
