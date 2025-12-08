import type { Question } from "../question";
import type { User } from "../user/user.model";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  users: User[];
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}
