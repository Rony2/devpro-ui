const STORAGE_KEY = "devpro-progress";

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getProgress() {
  if (!canUseStorage()) return { problems: {}, quizzes: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { problems: {}, quizzes: {} };
  } catch {
    return { problems: {}, quizzes: {} };
  }
}

export function setProgress(nextProgress) {
  if (!canUseStorage()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
}

export function clearProgress() {
  if (!canUseStorage()) return;
  localStorage.removeItem(STORAGE_KEY);
}
