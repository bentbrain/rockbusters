import {
  findQuestionAudioClipByToken,
  getAudioBaseUrl,
} from "@/lib/rockbusters-audio";
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
    token: string;
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

export async function GET(request: NextRequest, context: RouteContext) {
  const { token } = await context.params;
  const clip = findQuestionAudioClipByToken(token);

  if (!clip) {
    return new Response("Not found", { status: 404 });
  }

  const upstreamResponse = await fetch(buildUpstreamUrl(clip.fileName), {
    cache: "no-store",
    headers: getUpstreamHeaders(request),
  });

  if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
    return new Response("Audio unavailable", { status: upstreamResponse.status });
  }

  return new Response(upstreamResponse.body, {
    headers: getProxyHeaders(upstreamResponse),
    status: upstreamResponse.status,
  });
}
