import { getAudioBaseUrl, getAudioClip } from "@/lib/rockbusters-audio";
import { getCurrentItem } from "@/lib/utils";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const proxiedHeaderNames = [
  "accept-ranges",
  "content-length",
  "content-range",
  "content-type",
  "etag",
  "last-modified",
];

interface RouteContext {
  params: Promise<{
    dayId: string;
  }>;
}

function buildUpstreamUrl(fileName: string) {
  return `${getAudioBaseUrl().replace(/\/$/, "")}/${fileName}`;
}

function getUpstreamHeaders(request: NextRequest) {
  const headers = new Headers();
  const range = request.headers.get("range");

  if (range) {
    headers.set("range", range);
  }

  return headers;
}

function getProxyHeaders(upstreamResponse: Response) {
  const headers = new Headers();

  for (const headerName of proxiedHeaderNames) {
    const value = upstreamResponse.headers.get(headerName);

    if (value) {
      headers.set(headerName, value);
    }
  }

  headers.set(
    "cache-control",
    "public, max-age=86400, stale-while-revalidate=604800",
  );

  return headers;
}

function parseDayId(dayId: string) {
  if (!/^\d+$/.test(dayId)) return null;

  const parsedDayId = Number(dayId);
  if (!Number.isSafeInteger(parsedDayId)) return null;

  return parsedDayId;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const requestedDayId = parseDayId(params.dayId);
  const { dayID, questionIndex } = getCurrentItem();

  if (requestedDayId !== dayID) {
    return new Response("Not found", {
      headers: {
        "cache-control": "no-store",
      },
      status: 404,
    });
  }

  const clip = getAudioClip(questionIndex, "answer");

  if (!clip) {
    return new Response("Not found", {
      headers: {
        "cache-control": "no-store",
      },
      status: 404,
    });
  }

  const upstreamResponse = await fetch(buildUpstreamUrl(clip.fileName), {
    cache: "no-store",
    headers: getUpstreamHeaders(request),
  });

  if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
    return new Response("Audio unavailable", {
      headers: {
        "cache-control": "no-store",
      },
      status: upstreamResponse.status,
    });
  }

  return new Response(upstreamResponse.body, {
    headers: getProxyHeaders(upstreamResponse),
    status: upstreamResponse.status,
  });
}
