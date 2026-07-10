"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1.5 bg-transparent">
      <div
        className="h-1.5 transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--neo-pink), var(--neo-blue), var(--neo-green), var(--neo-purple))',
        }}
      />
    </div>
  );
}
