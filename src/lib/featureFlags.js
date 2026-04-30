/**
 * Feature flag definitions.
 *
 * Each flag has:
 *  - `envKey`  — NEXT_PUBLIC_ env var that sets the default (string "true"/"false")
 *  - `default` — fallback when the env var is not set
 *
 * Flags can be overridden at runtime via localStorage:
 *   localStorage.setItem("ff:neo-theme", "false")   // disable neo-brutalist
 *   localStorage.removeItem("ff:neo-theme")          // revert to env/default
 */

export const FLAGS = {
  NEO_THEME: {
    key: "neo-theme",
    envKey: "NEXT_PUBLIC_FEATURE_NEO_THEME",
    default: true,
  },
};

const LS_PREFIX = "ff:";

/**
 * Resolve a flag value.  Priority: localStorage override → env var → default.
 * Safe to call server-side (localStorage branch is skipped).
 */
export function getFlag(flag) {
  // 1. localStorage override (client only)
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`${LS_PREFIX}${flag.key}`);
    if (stored === "true") return true;
    if (stored === "false") return false;

    // First visit: seed localStorage with resolved default so user can toggle from devtools
    const envVal = typeof process !== "undefined" ? process.env[flag.envKey] : undefined;
    const resolved = envVal === "true" ? true : envVal === "false" ? false : flag.default;
    localStorage.setItem(`${LS_PREFIX}${flag.key}`, String(resolved));
    return resolved;
  }

  // 2. server-side: env var → default
  const envVal = typeof process !== "undefined" ? process.env[flag.envKey] : undefined;
  if (envVal === "true") return true;
  if (envVal === "false") return false;

  return flag.default;
}

/**
 * Override a flag in localStorage (for testing / incremental rollout).
 */
export function setFlagOverride(flag, value) {
  if (typeof window === "undefined") return;
  if (value === null || value === undefined) {
    localStorage.removeItem(`${LS_PREFIX}${flag.key}`);
  } else {
    localStorage.setItem(`${LS_PREFIX}${flag.key}`, String(value));
  }
}
