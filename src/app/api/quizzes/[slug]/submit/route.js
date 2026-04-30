import { withApiHandler, createCorrelatedLogger } from "@/lib/http";
import { getQuizBySlug } from "@/lib/content/quizzes";

const logger = createCorrelatedLogger("/api/quizzes/[slug]/submit");

export const POST = withApiHandler("/api/quizzes/[slug]/submit", async (req, correlationId) => {
  const reqLogger = logger.withCorrelationId(correlationId);
  const { slug, answers } = await req.json();

  const quiz = getQuizBySlug(slug);
  if (!quiz) throw new Error("Quiz not found");

  let score = 0;
  const breakdown = quiz.questions.map((question) => {
    const chosen = answers?.[question.id];
    const correct = chosen === question.correctOptionId;
    if (correct) score += 1;

    return {
      id: question.id,
      question: question.question,
      correct,
      explanation: question.explanation,
      selectedOptionId: chosen || null,
      correctOptionId: question.correctOptionId,
    };
  });

  reqLogger.info("Quiz submitted", { slug, score, total: quiz.questions.length });

  return {
    score,
    total: quiz.questions.length,
    breakdown,
  };
});
