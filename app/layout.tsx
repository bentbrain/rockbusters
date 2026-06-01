import { CSPostHogProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import CountdownTimer from "@/components/ui/countdown-timer";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import { InformationDisplay } from "@/components/ui/information-display";
import { Toaster } from "@/components/ui/sonner";
import { StatisticDisplay } from "@/components/ui/statistic-display";
import { getTimeLeft } from "@/lib/countdown";
import { env } from "@/lib/env";
import {
  defaultOgImageAlt,
  getKarlImagePath,
  siteDescription,
  siteName,
  siteTitle,
} from "@/lib/seo";
import { getCurrentItem } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";

const absoluteURL = env.FETCH_SELF_URL;

export function generateMetadata(): Metadata {
  const { dayID } = getCurrentItem();
  const ogImage = `/og?${dayID}`;

  return {
    metadataBase: new URL(absoluteURL),
    applicationName: siteName,
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName,
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: defaultOgImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          alt: defaultOgImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "game",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentTime = new Date().toUTCString();
  const initialTimeLeft = getTimeLeft(currentTime);
  const { hint } = getCurrentItem();
  return (
    <html lang="en" suppressHydrationWarning>
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
            <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
              <header className="bg-background dark:bg-slate-900 p-4 grid w-dvw items-center mb-6 grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto_1fr]">
                <div className="col-start-1 md:col-start-2 min-w-0 gap-2 flex items-center md:justify-center">
                  <Image
                    src={getKarlImagePath(hint.hint)}
                    alt="Rockbusters logo"
                    width={30}
                    height={30}
                  />
                  <h1 className="font-bold text-lg">Rockbusters</h1>
                </div>
                <div className="col-start-2 md:col-start-3 flex shrink-0 items-center justify-end gap-2">
                  <InformationDisplay />
                  <StatisticDisplay displayType="icon" />
                  <ModeToggle className="" />
                </div>
              </header>
              {children}
              <div className="text-center px-3 py-4 grid place-items-center gap-3">
                <CountdownTimer
                  initialTimeLeft={initialTimeLeft}
                  serverTime={currentTime}
                />
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
          <SpeedInsights />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
