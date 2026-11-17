
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  emailNotVerified = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {

    this.errorMessage = '';
    this.emailNotVerified = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        this.loading = false;

        if (!response.token || !response.user) {
          this.errorMessage = 'Réponse de connexion invalide.';
          return;
        }

        // Redirect by role
        switch (response.user.role) {

          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'formateur':
            this.router.navigate(['/formateur/mes-ateliers']);
            break;

          case 'participant':
            this.router.navigate(['/participant/catalogue']);
            break;

          default:
            this.authService.clearSession();
            this.errorMessage = 'Rôle utilisateur non reconnu.';
            break;
        }
      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Email ou mot de passe incorrect.';

        // Email not verified
        this.emailNotVerified =
          error.error?.message === 'Email address is not verified.';
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
