import { getAbsoluteUrl, getKarlImagePath } from "@/lib/seo";
import { getCurrentItem } from "@/lib/utils";
import { ImageResponse } from "next/og";

// App router includes @vercel/og.
// No need to install it.

export function GET() {
  const { hint } = getCurrentItem();

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
        <img
          style={{
            width: 200,
          }}
          src={getAbsoluteUrl(getKarlImagePath(hint.hint))}
          alt="Rockbusters logo"
        />
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
