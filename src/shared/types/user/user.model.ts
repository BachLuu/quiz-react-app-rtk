export type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdAt: string;
};
