
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  RegisterRequest,
  AuthResponse,
  VerifyEmailRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from 'types/auth.interface';

import { User } from 'types/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private currentUser: User | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  // Get token
  getToken(): string | null {
    const token = this.cookieService.get('token');
    return token || null;
  }

  // Save token
  setToken(token: string): void {
    // Remove old cookies
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('token', '/');

    // Save token cookie
    this.cookieService.set(
      'token',
      token,
      1,
      '/',
      undefined,
      false,
      'Lax'
    );
  }

  // Remove token
  removeToken(): void {
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('token', '/');
  }

  // Register user
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      data
    );
  }

  // Verify email
  verifyEmail(data: VerifyEmailRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/verify-email`,
      data
    );
  }

  // Resend OTP
  resendEmailOtp(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/resend-email-otp`,
      { email }
    );
  }

  // Login user
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data
    ).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }

        if (response.user) {
          this.currentUser = response.user;
        }
      })
    );
  }

  // Get current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/user`
    ).pipe(
      tap(user => {
        this.currentUser = user;
      })
    );
  }

  // Forgot password
  forgotPassword(data: ForgotPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/forgot-password`,
      data
    );
  }

  // Reset password
  resetPassword(data: ResetPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/reset-password`,
      data
    );
  }

  // Logout user
  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    ).pipe(
      finalize(() => {
        this.clearSession();
      })
    );
  }

  // Get cached user
  getUser(): User | null {
    return this.currentUser;
  }

  // Check authentication
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check user role
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isFormateur(): boolean {
    return this.hasRole('formateur');
  }

  isParticipant(): boolean {
    return this.hasRole('participant');
  }

  // Clear session
  clearSession(): void {
    this.removeToken();
    this.currentUser = null;
  }
}
