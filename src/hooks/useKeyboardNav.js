"use client";

import { useEffect } from "react";

export function useKeyboardNav({ onSelect, onConfirm, optionCount = 4 }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (/^[1-9]$/.test(event.key)) {
        const index = Number(event.key);
        if (index <= optionCount) onSelect(index - 1);
      }
      if (event.key === "Enter") onConfirm();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onSelect, onConfirm, optionCount]);
}
