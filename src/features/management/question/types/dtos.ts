import type { QuestionType } from "@/shared/types";

/**
 * Question DTOs - Maps to backend DTOs
 */

export type CreateQuestionRequest = {
  content: string;
  questionType: QuestionType;
};

export type UpdateQuestionRequest = {
  content?: string;
  questionType?: QuestionType;
  isActive?: boolean;
};

export type QuestionDetailResponse = {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
};

export type QuestionSummaryResponse = {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
};
