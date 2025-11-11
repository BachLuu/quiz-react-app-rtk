// Các interface theo requirement (có chuẩn hóa nhẹ tên & sửa lỗi chính tả QuizViewMode -> QuizViewModel)
export interface QuizViewModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  isActive: boolean;
  thumbnailUrl?: string;
  quizCode?: string;
  numberOfQuestions?: number; // API canonical field
}

export interface QuizCreateViewModel {
  title: string;
  description: string;
  duration: number;
  isActive: boolean;
}

export interface QuizEditViewModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  isActive: boolean;
}

export interface QuizQuestionCreateViewModel {
  quizId: string;
  questionId: string;
}

export interface UserViewModel {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
}

export interface PrepareQuizViewModel {
  userId: string;
  quizId: string;
  quizCode: string;
}

export interface QuizPrepareInfoViewModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl?: string;
  quizCode: string;
  user: UserViewModel;
}

export interface AnswerForTestViewModel {
  id: string;
  content: string;
}

export interface QuestionForTestViewModel {
  id: string;
  content: string;
  questionType: string;
  answers: AnswerForTestViewModel[];
}

export interface TakeQuizViewModel {
  userId: string;
  quizId: string;
  quizCode: string;
}

export interface QuizForTestViewModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  quizCode: string;
  startTime?: string;
  questions: QuestionForTestViewModel[];
}

export interface UserAnswerSubmissionViewModel {
  questionId: string;
  answerId: string;
}

export interface QuizSubmissionViewModel {
  quizId: string;
  userId: string;
  quizCode: string;
  answers: UserAnswerSubmissionViewModel[];
}
