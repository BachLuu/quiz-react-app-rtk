import type { Question, QuestionType } from "@/shared/types";
import type { QuestionDetailResponse } from "../types/dtos";
import type { QuestionDetail, QuestionFormInitialData } from "../types/ui";

// Map detail DTO -> UI model
export const mapToQuestionDetail = (
  questionDetailResponse: QuestionDetailResponse,
): QuestionDetail => ({
  id: questionDetailResponse.id,
  content: questionDetailResponse.content,
  questionType: questionDetailResponse.questionType,
  isActive: questionDetailResponse.isActive,
  options: questionDetailResponse.options ?? [],
});

// Map question detail/summary to form values
export const mapQuestionToFormValues = (
  question?: Question | QuestionDetail | null,
): QuestionFormInitialData | undefined => {
  if (!question) return undefined;

  return {
    id: question.id,
    content: question.content,
    questionType: question.questionType as QuestionType,
    isActive: question.isActive,
    options: "options" in question ? question.options : undefined,
  };
};
