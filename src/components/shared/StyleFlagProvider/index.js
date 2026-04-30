"use client";

import { useEffect } from "react";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { FLAGS } from "@/lib/featureFlags";

/**
 * Applies the `data-style` attribute on <html> based on the NEO_THEME flag.
 * When enabled → "neo" (neo-brutalist). When disabled → "classic" (conventional).
 * Renders nothing — purely a side-effect component.
 */
export function StyleFlagProvider({ children }) {
  const neoEnabled = useFeatureFlag(FLAGS.NEO_THEME);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-style",
      neoEnabled ? "neo" : "classic",
    );
    return () => {
      document.documentElement.removeAttribute("data-style");
    };
  }, [neoEnabled]);

  return children;
}
