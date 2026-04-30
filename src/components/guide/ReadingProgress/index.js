"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
      <div className="h-1 bg-[var(--brand)]" style={{ width: `${progress}%` }} />
    </div>
  );
}
