
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  // =====================================
  // TOKEN MANAGEMENT
  // =====================================

  getToken(): string | null {
    const token = this.cookieService.get('token');
    return token || null;
  }

  setToken(token: string): void {
    // Supprimer les anciennes versions du cookie
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('token', '/');

    // Enregistrer un cookie sans domaine explicite
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

  removeToken(): void {
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('token', '/');
  }

  // =====================================
  // REGISTER
  // =====================================

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      data
    );
  }

  // =====================================
  // VERIFY EMAIL
  // =====================================

  verifyEmail(data: VerifyEmailRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/verify-email`,
      data
    );
  }

  // =====================================
  // RESEND OTP
  // =====================================

  resendEmailOtp(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/resend-email-otp`,
      { email }
    );
  }

  // =====================================
  // LOGIN
  // =====================================

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

  // =====================================
  // CURRENT USER
  // =====================================

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/user`
    ).pipe(
      tap(user => {
        this.currentUser = user;
      })
    );
  }

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  forgotPassword(data: ForgotPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/forgot-password`,
      data
    );
  }

  // =====================================
  // RESET PASSWORD
  // =====================================

  resetPassword(data: ResetPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/reset-password`,
      data
    );
  }

  // =====================================
  // LOGOUT
  // =====================================

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    ).pipe(
      tap(() => {
        this.clearSession();
      })
    );
  }

  // =====================================
  // GET USER
  // =====================================

  getUser(): User | null {
    return this.currentUser;
  }

  // =====================================
  // AUTHENTICATION
  // =====================================

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // =====================================
  // ROLE
  // =====================================

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

  // =====================================
  // CLEAR SESSION
  // =====================================

  clearSession(): void {
    this.removeToken();
    this.currentUser = null;
  }
}
