import type { QuizDetailResponse } from "../types/dtos";
import type { QuizDetail, QuizFormValues, QuizSummary } from "../types/ui";

// Map detail DTO -> UI model
export const mapToQuizDetail = (dto: QuizDetailResponse): QuizDetail => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  duration: dto.duration,
  thumbnailUrl: dto.thumbnailUrl,
  isActive: dto.isActive,
  totalQuestions: dto.totalQuestions,
  totalAttempts: dto.totalAttempts,
});

// Normalize quiz data into form-friendly defaults
export const mapQuizToFormValues = (
  quiz: QuizSummary | QuizDetail | null | undefined
): Partial<QuizFormValues> | undefined => {
  if (!quiz) return undefined;

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    duration: quiz.duration,
    thumbnailUrl: quiz.thumbnailUrl,
    isActive: quiz.isActive,
  };
};
