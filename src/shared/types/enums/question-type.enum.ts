/**
 * Question difficulty levels
 * Use union type instead of const enum for better tree-shaking
 */
export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "SINGLE_CHOICE"
  | "TRUE_FALSE"
  | "FILL_IN_THE_BLANKS"
  | "LONG_ANSWER";

/**
 * Helper array for runtime validation (optional)
 */
export const QUESTION_TYPES: readonly QuestionType[] = [
  "MULTIPLE_CHOICE",
  "SINGLE_CHOICE",
  "TRUE_FALSE",
  "FILL_IN_THE_BLANKS",
  "LONG_ANSWER",
] as const;
