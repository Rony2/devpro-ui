import { create } from "zustand";

export const useQuizStore = create((set) => ({
  currentQuestion: 0,
  answers: {},
  timerEnabled: true,
  startedAt: null,
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  setAnswer: (questionId, optionId) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
  setTimerEnabled: (timerEnabled) => set({ timerEnabled }),
  setStartedAt: (startedAt) => set({ startedAt }),
  reset: () => set({ currentQuestion: 0, answers: {}, timerEnabled: true, startedAt: null }),
}));
