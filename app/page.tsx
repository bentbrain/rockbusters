import { ConcealAnswer, getCurrentItem } from "@/lib/utils";
import Guesser from "../components/ui/guesser";

export const dynamic = "force-cache";

export default async function Home() {
  const { hint, dayID } = getCurrentItem();

  return (
    <main className="px-2 md:px-6">
      <div className="max-w-screen-sm w-full grid place-items-center gap-2 text-center mx-auto">
        <div className="">
          <Guesser
            key={`guesser-${dayID}`}
            id={dayID}
            hint={hint.hint}
            answer={ConcealAnswer(hint.answer)}
          />
        </div>
      </div>
    </main>
  );
}
