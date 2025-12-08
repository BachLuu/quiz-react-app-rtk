export const QuestionTypeEnum = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED"
} as const;

export type QuestionTypeEnum = typeof QuestionTypeEnum[keyof typeof QuestionTypeEnum];
