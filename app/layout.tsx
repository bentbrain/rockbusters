import "./globals.css";
import Header from "./Header";

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
      <body className="min-h-screen flex flex-col justify-start md:block">
        <Header />
        <div className="wrapper p-4 grid items-center my-auto">
          <main className="max-w-[min(600px,100%)] my-6 bg-white p-4 rounded-md mx-auto shadow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
