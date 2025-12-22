export type CreateQuizRequest = {
  title: string;
  description: string;
  duration: number;
  thumbnailUrl?: string;
  isActive?: boolean;
};

export type UpdateQuizRequest = {
  title: string;
  description: string;
  duration: number;
  thumbnailUrl?: string;
  isActive?: boolean;
};

export type QuizDetailResponse = {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  totalQuestions: number;
  totalAttempts: number;
};

export type QuizSummaryResponse = {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
};
