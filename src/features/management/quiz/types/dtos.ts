export interface CreateQuizDto {
  title: string;
  description: string;
  duration: number;
  thumbnailUrl?: string;
  isActive?: boolean;
}

export interface UpdateQuizDto {
  title: string;
  description: string;
  duration: number;
  thumbnailUrl?: string;
  isActive?: boolean;
}

export interface QuizDetailDto {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  totalQuestions: number;
  totalAttempts: number;
}

export interface QuizViewDto {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
}
