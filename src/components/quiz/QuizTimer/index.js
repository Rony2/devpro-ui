"use client";

import { useEffect, useState } from "react";

export function QuizTimer({ enabled, onTick }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const startedAt = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setSeconds(elapsed);
      if (onTick) onTick(elapsed);
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, onTick]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return <span className="code-font text-sm font-bold border-2 border-[var(--border)] bg-[var(--neo-yellow)] px-2 py-1">{mm}:{ss}</span>;
}
