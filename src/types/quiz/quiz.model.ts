import type { Question } from "../question";
import type { User } from "../user/user.model";

export interface Quiz {
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  users: User[];
  questions: Question[];
}