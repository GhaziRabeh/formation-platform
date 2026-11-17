export type UserRole = 'admin' | 'formateur' | 'participant';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  email_verified_at?: string | null;
  created_at?: string;
}
