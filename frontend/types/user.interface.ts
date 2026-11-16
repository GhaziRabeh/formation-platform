export type UserRole = 'admin' | 'formateur' | 'participant';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
}