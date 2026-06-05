import { getQuestionAudio } from "@/lib/rockbusters-audio";
import { questions } from "@/lib/questions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Rockbusters Audio Review",
};

export default function AudioReviewPage() {
  return (
    <main className="px-3 pb-10">
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <div className="grid gap-1">
          <h2 className="text-2xl font-bold">Audio Review</h2>
          <p className="text-sm text-muted-foreground">
            {questions.length} Rockbusters clues with hosted question and answer
            clips.
          </p>
        </div>

        <div className="grid gap-3">
          {questions.map((question, index) => {
            const audio = getQuestionAudio(index);
            return (
              <section
                className="grid gap-3 rounded-md border bg-card p-3 text-card-foreground shadow-sm"
                key={`${question.hint}-${question.answer}`}
              >
                <div className="grid gap-1">
                  <p className="text-sm">
                    <span className="font-bold">#{index + 1}: </span>
                    {question.hint}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Answer: </span>
                    {question.answer}
                  </p>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-1">
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Hint
                    </span>
                    <audio
                      className="w-full"
                      controls
                      preload="metadata"
                      src={audio.questionUrl}
                    >
                      <a href={audio.questionUrl}>Play hint audio</a>
                    </audio>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Answer
                    </span>
                    <audio
                      className="w-full"
                      controls
                      preload="metadata"
                      src={audio.answerUrl}
                    >
                      <a href={audio.answerUrl}>Play answer audio</a>
                    </audio>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
