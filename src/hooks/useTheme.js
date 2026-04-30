"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const KEY = "theme";

/**
 * Read the current theme from <html> class (set by the blocking script).
 * This is the source of truth so SSR/hydration never flashes.
 */
function getSnapshot() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot() {
  return "light";
}

// Simple pub-sub so useSyncExternalStore re-renders on toggle
const listeners = new Set();
function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function notify() {
  listeners.forEach((cb) => cb());
}

function applyTheme(next) {
  const root = document.documentElement;
  root.classList.toggle("light", next === "light");
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  localStorage.setItem(KEY, next);
  notify();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, toggleTheme };
}
