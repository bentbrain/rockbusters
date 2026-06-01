import { env } from "@/lib/env";
import { PostHog } from "posthog-node";

const previousGuessesFlag = "previous-guesses";

let posthogClient: PostHog | undefined;

function getPostHogClient() {
  posthogClient ??= new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    flushAt: 1,
    flushInterval: 0,
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });

  return posthogClient;
}

export async function isPreviousGuessesEnabled(distinctId: string) {
  if (env.VERCEL_ENV === "preview") {
    return true;
  }

  try {
    const isEnabled = await getPostHogClient().isFeatureEnabled(
      previousGuessesFlag,
      distinctId,
      {
        sendFeatureFlagEvents: false,
      },
    );

    return isEnabled === true;
  } catch {
    return false;
  }
}
