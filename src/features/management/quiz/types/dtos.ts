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
