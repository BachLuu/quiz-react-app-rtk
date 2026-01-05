export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdAt: string;
  displayName: string;
  roles: string[];
}
