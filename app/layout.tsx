import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import { CSPostHogProvider } from "@/components/providers/posthog-provider";
import { InformationDisplay } from "@/components/ui/information-display";
import { StatisticDisplay } from "@/components/ui/statistic-display";
import CountdownTimer from "@/components/ui/countdown-timer";
import { getCurrentItem } from "@/lib/utils";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react"

const absoluteURL = process.env.FETCH_SELF_URL;

export async function generateMetadata(): Promise<Metadata> {
  const { dayID } = getCurrentItem();
  return {
    metadataBase: new URL(absoluteURL ?? ""),
    title: "Rockbusters",
    description:
      "Guess the band or artist in 5 tries. A new clue is available every day.",
    openGraph: {
      images: [`/og?${dayID}`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentTime = new Date().toUTCString();
  const { hint } = getCurrentItem();
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={`${GeistSans.className} bg-secondary dark:bg-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <div className=" min-h-dvh grid grid-rows-[auto,1fr,auto]">
              <header className=" bg-background grid-cols-2 md:grid-cols-[200px,1fr,200px] dark:bg-slate-900 p-4 grid items-center mb-6">
                <div className="md:col-start-2 gap-2 flex md:justify-center items-center">
                  <Image
                    src={
                      hint.hint.toLowerCase().includes("jamaican")
                        ? "/assets/karl-jamaican.png"
                        : "/assets/karl.png"
                    }
                    alt="Text"
                    width={30}
                    height={30}
                  />
                  <h1 className="font-bold text-lg">Rockbusters</h1>
                </div>
                <div className="flex items-center justify-end gap-2 w-full">
                  <InformationDisplay />
                  <StatisticDisplay displayType="icon" />
                  <ModeToggle className="" />
                </div>
              </header>
              {children}
              <div className="text-center px-3 py-4 grid place-items-center gap-3">
                <CountdownTimer serverTime={currentTime} />
                <p className="font-mono text-xs text-muted-foreground">
                  (built by{" "}
                  <a
                    target="_blank"
                    className=" hover:underline"
                    href="https://www.instagram.com/bent.brain/"
                  >
                    @bent.brain)
                  </a>
                </p>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
