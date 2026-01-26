import type { QuestionType } from "@/shared/types";

/**
 * Question DTOs - Maps to backend DTOs
 * RULE: Use `type = {}` instead of `interface` in feature types
 */

// =====================
// Question Option Types
// =====================

export type CreateQuestionOptionRequest = {
  content: string;
  orderIndex: number;
  isCorrect: boolean;
};

export type UpdateQuestionOptionRequest = {
  id?: string; // null/undefined = create new option
  content: string;
  orderIndex: number;
  isCorrect: boolean;
  isActive: boolean;
};

export type QuestionOptionDetailResponse = {
  id: string;
  content: string;
  orderIndex: number;
  isCorrect: boolean;
  isActive: boolean;
};

// =====================
// Question Types
// =====================

export type CreateQuestionRequest = {
  content: string;
  questionType: QuestionType;
  options?: CreateQuestionOptionRequest[]; // Required for MULTIPLE_CHOICE, SINGLE_CHOICE
};

export type UpdateQuestionRequest = {
  content?: string;
  questionType?: QuestionType;
  isActive?: boolean;
  options?: UpdateQuestionOptionRequest[]; // If provided, replaces all existing options
};

export type QuestionDetailResponse = {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
  options: QuestionOptionDetailResponse[]; // Options included in detail response
};

export type QuestionSummaryResponse = {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
};
