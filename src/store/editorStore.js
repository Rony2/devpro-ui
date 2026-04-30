import { create } from "zustand";

export const useEditorStore = create((set) => ({
  language: "javascript",
  code: "",
  runResults: [],
  setLanguage: (language) => set({ language }),
  setCode: (code) => set({ code }),
  setRunResults: (runResults) => set({ runResults }),
  reset: () => set({ language: "javascript", code: "", runResults: [] }),
}));
