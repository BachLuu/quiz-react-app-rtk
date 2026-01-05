import type { Answer } from "../answer";
import type { QuestionType } from "../enums/question-type.enum";
import type { Quiz } from "../quiz/quiz.model";

export interface Question {
  content: string;
  questionType: QuestionType;
  isActive: boolean;
  quizzes: Quiz[];
  answers: Answer[];
}
