"use client";

import { getPostHogClient, useAnalyticsEnabled } from "@/lib/analytics";
import { useEffect, useState } from "react";

export function useFeatureFlagEnabled(flag: string) {
  const analyticsEnabled = useAnalyticsEnabled();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) {
      return;
    }

    const posthogClientPromise = getPostHogClient();

    if (posthogClientPromise === null) {
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    void posthogClientPromise.then((posthog) => {
      if (!isMounted) return;

      const updateFlagState = () => {
        setIsEnabled(posthog.isFeatureEnabled(flag) === true);
      };

      updateFlagState();
      unsubscribe = posthog.onFeatureFlags(updateFlagState);
    });

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [analyticsEnabled, flag]);

  return analyticsEnabled && isEnabled;
}
