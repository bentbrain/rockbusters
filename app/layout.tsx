import "./globals.css";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import { AnalyticsWrapper } from "./components/analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-stone-100">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className=" flex flex-col justify-start">
        {/* @ts-ignore */}
        <Header />
        <div className="wrapper p-4 grid items-center my-auto text-center">
          <main className="w-[min(600px,100%)] my-6 bg-white p-4 rounded-md mx-auto shadow">
            {children}
          </main>
          <Countdown />
        </div>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
