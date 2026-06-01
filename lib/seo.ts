import { env } from "@/lib/env";

export const siteName = "Rockbusters";

export const siteTitle = "Rockbusters - Daily Cryptic Band Guessing Game";

export const siteDescription =
  "Guess the band or artist from a daily cryptic clue in five tries. A new Rockbusters puzzle is available every day.";

export const siteUrl = env.FETCH_SELF_URL;

export const defaultOgImageAlt =
  "Rockbusters daily cryptic band guessing game clue";

export function getAbsoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function getKarlImagePath(hint: string): string {
  return hint.toLowerCase().includes("jamaican")
    ? "/assets/karl-jamaican.png"
    : "/assets/karl.png";
}
