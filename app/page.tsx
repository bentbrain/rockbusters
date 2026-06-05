import { rockbustersDistinctIdCookie } from "@/lib/feature-flags";
import { env } from "@/lib/env";
import { isPreviousGuessesEnabled } from "@/lib/posthog";
import {
  getAbsoluteUrl,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/seo";
import { ConcealAnswer, getCurrentItem } from "@/lib/utils";
import { cookies } from "next/headers";
import Guesser from "../components/ui/guesser";

export const dynamic = "auto";

const defaultAudioBaseUrl =
  "https://pub-28f3be4d403e42d09e69bafe4ec255bf.r2.dev";
const questionIndexesWithoutAnswerAudio = new Set([77, 118]);

function buildAudioUrl(fileName: string) {
  const baseUrl =
    env.NEXT_PUBLIC_ROCKBUSTERS_AUDIO_BASE_URL ?? defaultAudioBaseUrl;

  return `${baseUrl.replace(/\/$/, "")}/${fileName}`;
}

export default async function Home() {
  const { hint, dayID, questionIndex } = getCurrentItem();
  const cookieStore = await cookies();
  const distinctId =
    cookieStore.get(rockbustersDistinctIdCookie)?.value ?? "rockbusters";
  const showPreviousGuesses = await isPreviousGuessesEnabled(distinctId);
  const audioId = String(questionIndex + 1).padStart(3, "0");
  const questionAudio = buildAudioUrl(`rockbuster-${audioId}-question.mp3`);
  const answerAudio = questionIndexesWithoutAnswerAudio.has(questionIndex)
    ? undefined
    : buildAudioUrl(`rockbuster-${audioId}-answer.mp3`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    alternateName: siteTitle,
    url: getAbsoluteUrl("/"),
    description: siteDescription,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="px-2 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <div className="max-w-screen-sm w-full grid place-items-center gap-2 text-center mx-auto">
        <div className="">
          <Guesser
            key={`guesser-${dayID}`}
            id={dayID}
            hint={hint.hint}
            answer={ConcealAnswer(hint.answer)}
            showPreviousGuesses={showPreviousGuesses}
            targetAnswer={hint.answer}
            questionAudio={
              questionAudio
                ? {
                    questionUrl: questionAudio,
                    answerUrl: answerAudio,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </main>
  );
}
