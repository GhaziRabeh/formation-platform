
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'formateur' | 'participant';
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
  new_password_confirmation: string;
}
