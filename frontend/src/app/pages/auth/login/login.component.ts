import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loading = false;
  errorMessage = '';

  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authService.getCurrentUser().subscribe({
          next: user => {
            switch (user.role) {
              case 'admin':
                this.router.navigate(['/admin/dashboard']);
                break;
              case 'formateur':
                this.router.navigate(['/formateur/dashboard']);
                break;
              case 'participant':
                this.router.navigate(['/participant/dashboard']);
                break;
            }
          },
          error: () => {
            this.errorMessage = 'Impossible de récupérer votre compte.';
            this.loading = false;
          }
        });
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect.';
        this.loading = false;
      }
    });
  }
}