export const dynamic = "force-dynamic";

export function GET() {
  return new Response("Not found", {
    headers: {
      "cache-control": "no-store",
    },
    status: 404,
  });
}
