import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { Inter } from "@next/font/google";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const medium = fetch(
  new URL("../../assets/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const fetchURL = process.env.FETCH_URL;

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const mediumData = await medium;

  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Rockbusters";

    return new ImageResponse(
      (
        <div tw="flex p-4 text-center h-full w-full ">
          <div tw="flex flex-col bg-white shadow-md rounded-md w-full h-full py-4 px-8">
            <div tw="flex flex-col justify-center w-full items-center">
              <img tw="h-50 " src={`${fetchURL}karl.png`} alt="" />
              <h1 tw="text-8xl font-bold">Rockbusters</h1>
            </div>
            <div tw="flex w-full my-auto justify-center">
              <h1
                style={{
                  fontFamily: "Medium",
                }}
                tw="text-5xl font-bold"
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
          {
            name: "Medium",
            data: mediumData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
