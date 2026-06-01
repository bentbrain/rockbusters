// app/providers.js
"use client";
import { env } from "@/lib/env";
import { setAnalyticsEnabled } from "@/lib/analytics";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const posthogApiPath = "/ingest";
let hasInitializedPostHog = false;

function initializePostHog() {
  if (hasInitializedPostHog) return;
  if (typeof window === "undefined") return;

  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: posthogApiPath,
    capture_dead_clicks: true,
    capture_exceptions: {
      capture_console_errors: true,
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
    },
    capture_performance: {
      network_timing: true,
      web_vitals: true,
    },
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });

  hasInitializedPostHog = true;
}

export function CSPostHogProvider({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  setAnalyticsEnabled(enabled);

  if (!enabled) {
    return children;
  }

  initializePostHog();

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
