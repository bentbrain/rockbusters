import {
  getAbsoluteUrl,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/seo";
import { ConcealAnswer, getCurrentItem } from "@/lib/utils";
import Guesser from "../components/ui/guesser";

export const dynamic = "auto";

export default function Home() {
  const { hint, dayID } = getCurrentItem();
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
            targetAnswer={hint.answer}
          />
        </div>
      </div>
    </main>
  );
}
