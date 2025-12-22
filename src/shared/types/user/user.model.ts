import type { Quiz } from "../quiz";
import type { Role } from "../role";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  dateOfBirth?: string | null; // convert LocalDate -> string
  isActive: boolean;
  createdAt: string; // LocalDateTime -> string ISO
  roles: Role[]; // type ở dưới
  quizzes: Quiz[];
}
