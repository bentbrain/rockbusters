import { getCurrentItem } from "@/lib/utils";
import { ImageResponse } from "next/og";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as fs from "fs";
import { env } from "@/lib/env";

// App router includes @vercel/og.
// No need to install it.

const fetchURL = env.FETCH_SELF_URL;

export async function GET() {
  const { hint, dayID } = getCurrentItem();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px 10px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          fontFamily: "Geist",
          flexDirection: "column",
          borderRadius: 23,
        }}
      >
        {fetchURL && (
          <img
            style={{
              width: 200,
            }}
            src={
              fetchURL +
              (hint.hint.toLowerCase().includes("jamaican")
                ? "/assets/karl-jamaican.png"
                : "/assets/karl.png")
            }
            alt=""
          />
        )}
        <p
          style={{
            fontWeight: 700,
            maxLines: 3,
            fontSize: 56,
          }}
        >
          {hint.hint.length > 128 ? hint.hint.slice(0, 128) + "..." : hint.hint}
        </p>
        <p
          style={{
            marginTop: "auto",
            fontSize: 30,
          }}
        >
          Rockbusters.lol
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
