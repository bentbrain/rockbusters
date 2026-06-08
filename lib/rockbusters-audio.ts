import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";
import { questions } from "@/lib/questions";

export const defaultAudioBaseUrl =
  "https://pub-28f3be4d403e42d09e69bafe4ec255bf.r2.dev";

type AudioKind = "answer" | "question";

interface AudioClip {
  fileName: string;
  index: number;
  kind: AudioKind;
}

const tokenLength = 32;
const tokenPattern = /^[A-Za-z0-9_-]{32}$/;

function getAudioSecret() {
  return (
    env.ROCKBUSTERS_AUDIO_TOKEN_SECRET ??
    `rockbusters-audio:${env.FETCH_SELF_URL}`
  );
}

export function getAudioBaseUrl() {
  return env.ROCKBUSTERS_AUDIO_BASE_URL ?? defaultAudioBaseUrl;
}

function getAudioFileName(index: number, kind: AudioKind) {
  const audioId = String(index + 1).padStart(3, "0");
  return `rockbuster-${audioId}-${kind}.mp3`;
}

function createAudioToken(fileName: string) {
  return createHmac("sha256", getAudioSecret())
    .update(fileName)
    .digest("base64url")
    .slice(0, tokenLength);
}

function tokensMatch(first: string, second: string) {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

export function getAudioClip(index: number, kind: AudioKind): AudioClip | null {
  if (!Number.isInteger(index) || index < 0 || index >= questions.length) {
    return null;
  }

  return {
    fileName: getAudioFileName(index, kind),
    index,
    kind,
  };
}

export function findQuestionAudioClipByToken(token: string): AudioClip | null {
  if (!tokenPattern.test(token)) return null;

  for (let index = 0; index < questions.length; index++) {
    const fileName = getAudioFileName(index, "question");
    const expectedToken = createAudioToken(fileName);

    if (tokensMatch(token, expectedToken)) {
      return { fileName, index, kind: "question" };
    }
  }

  return null;
}

function buildProxyUrl(index: number, kind: AudioKind) {
  const clip = getAudioClip(index, kind);
  if (!clip) return null;

  return `/api/audio/${createAudioToken(clip.fileName)}`;
}

export function getQuestionAudio(index: number) {
  const questionUrl = buildProxyUrl(index, "question");

  if (!questionUrl) return undefined;

  return {
    questionUrl,
  };
}
