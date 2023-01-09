const fetchURL = process.env.FETCH_URL;

async function getData() {
  const res = await fetch(`${fetchURL}api/datequestion`, {
    next: { revalidate: 60 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Head() {
  const question = await getData();
  const titleString = `#${question.day}: ${question.hint}`;

  return (
    <>
      <title>Rockbusters</title>
      <meta
        property="og:image"
        content={`${fetchURL}api/og?title=${encodeURIComponent(titleString)}`}
      />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Guess the artist in 5 tries. A new clue is available each day"
      />
      <link rel="icon" href="/karl.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="application-name" content="Rockbusters" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Rockbusters" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
    </>
  );
}
