import type { QuestionType } from "../enums/question-type.enum";

export interface Question {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
}
