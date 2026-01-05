export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
