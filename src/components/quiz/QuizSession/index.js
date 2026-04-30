"use client";

import { useMemo, useState } from "react";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizTimer } from "@/components/quiz/QuizTimer";
import { QuizResultScreen } from "@/components/quiz/QuizResultScreen";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useProgress } from "@/hooks/useProgress";

export function QuizSession({ slug, questions }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { setQuizScore } = useProgress();

  const question = questions[index];
  const selected = answers[question.id] || null;

  useKeyboardNav({
    onSelect: (optionIndex) => {
      const option = question.options[optionIndex];
      if (option) setAnswers((state) => ({ ...state, [question.id]: option.id }));
    },
    onConfirm: onConfirm,
    optionCount: question.options.length,
  });

  function onConfirm() {
    if (!selected) return;
    if (!revealAnswer) {
      setRevealAnswer(true);
      return;
    }

    if (index < questions.length - 1) {
      setIndex((current) => current + 1);
      setRevealAnswer(false);
      return;
    }

    const score = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
    setQuizScore(slug, score);
    setFinished(true);
  }

  const breakdown = useMemo(
    () =>
      questions.map((q) => ({
        id: q.id,
        question: q.question,
        correct: answers[q.id] === q.correctOptionId,
        explanation: q.explanation,
      })),
    [questions, answers],
  );

  if (finished) {
    const score = breakdown.filter((item) => item.correct).length;
    return <QuizResultScreen score={score} total={questions.length} elapsedSeconds={elapsedSeconds} breakdown={breakdown} />;
  }

  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <QuizProgress current={index + 1} total={questions.length} />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={timerEnabled} onChange={(event) => setTimerEnabled(event.target.checked)} /> Timer
          </label>
          <QuizTimer enabled={timerEnabled} onTick={setElapsedSeconds} />
        </div>
      </div>

      <QuizQuestion question={question} selectedOptionId={selected} revealAnswer={revealAnswer} onSelect={(optionId) => setAnswers((state) => ({ ...state, [question.id]: optionId }))} />

      <button
        type="button"
        onClick={onConfirm}
        disabled={!selected}
        className="focus-ring min-h-[44px] border-2 border-[var(--border)] bg-[var(--brand)] px-4 text-sm font-bold font-[family-name:var(--font-display)] shadow-[4px_4px_0px_0px_var(--border)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border)] disabled:opacity-60"
      >
        {!revealAnswer ? "Confirm" : index < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </button>
    </div>
  );
}
