"use client";

import { useEffect, useState } from "react";
import { getFlag } from "@/lib/featureFlags";

/**
 * React hook that resolves a feature flag.
 * Re-evaluates on mount (picks up localStorage overrides).
 */
export function useFeatureFlag(flag) {
  const [enabled, setEnabled] = useState(() => flag.default);

  useEffect(() => {
    setEnabled(getFlag(flag));
  }, [flag]);

  return enabled;
}
