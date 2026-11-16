
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

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        this.loading = false;

        console.log('LOGIN RESPONSE:', response);

        if (!response.token || !response.user) {
          this.errorMessage = 'Réponse de connexion invalide.';
          return;
        }

        // Redirection selon le rôle
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

        console.error('Erreur login:', error);

        this.errorMessage =
          error.error?.message ||
          'Email ou mot de passe incorrect.';
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
