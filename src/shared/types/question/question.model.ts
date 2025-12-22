import type { Answer } from "../answer";
import type { QuestionTypeEnum } from "../enums/question-type.enum";
import type { Quiz } from "../quiz/quiz.model";

export interface Question{
    content: string;
    questionType: QuestionTypeEnum;
    isActive: boolean;
    quizzes: Quiz[];
    answers: Answer[];
}