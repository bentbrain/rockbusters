import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    FETCH_SELF_URL: z.string().url(),
    VERCEL_ENV: z
      .enum(["development", "preview", "production"])
      .optional(),
  },

  client: {
    NEXT_PUBLIC_ROCKBUSTERS_AUDIO_BASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_ROCKBUSTERS_AUDIO_BASE_URL:
      process.env.NEXT_PUBLIC_ROCKBUSTERS_AUDIO_BASE_URL,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
});
