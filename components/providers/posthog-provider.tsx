// app/providers.js
"use client";
import { disableAnalytics, initializeAnalytics } from "@/lib/analytics";
import { env } from "@/lib/env";
import { useEffect } from "react";

const posthogApiPath = "/ingest";

export function CSPostHogProvider({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) {
      disableAnalytics();
      return;
    }

    void initializeAnalytics(env.NEXT_PUBLIC_POSTHOG_KEY, {
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
      person_profiles: "identified_only",
    });
  }, [enabled]);

  return children;
}
