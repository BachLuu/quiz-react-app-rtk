/**
 * Question difficulty levels
 * Use union type instead of const enum for better tree-shaking
 */
export type QuestionType = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

/**
 * Helper array for runtime validation (optional)
 */
export const QUESTION_TYPES: readonly QuestionType[] = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;
