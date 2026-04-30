import { QuizOption } from "@/components/quiz/QuizOption";

export function QuizQuestion({ question, selectedOptionId, revealAnswer, onSelect }) {
  return (
    <div className="panel p-5">
      <p className="text-xs uppercase tracking-wide font-bold font-[family-name:var(--font-display)] text-[var(--text-muted)]">{question.topic}</p>
      <h2 className="mt-2 text-xl font-bold font-[family-name:var(--font-display)]">{question.question}</h2>
      {question.code ? <pre className="mt-4 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-3 text-xs code-font text-white shadow-[3px_3px_0px_0px_var(--border)]">{question.code}</pre> : null}

      <div className="mt-4 space-y-3">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            isCorrect={question.correctOptionId === option.id}
            isRevealed={revealAnswer}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
