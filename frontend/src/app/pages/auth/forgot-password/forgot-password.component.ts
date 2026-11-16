import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  loading = false;
  errorMessage = '';
  successMessage = '';

  forgotForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const data = this.forgotForm.getRawValue();

    this.authService.forgotPassword(data).subscribe({
      next: response => {
        this.successMessage = response.message || 'Code OTP envoyé par email.';

        this.router.navigate(['/reset-password'], {
          queryParams: { email: data.email }
        });
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Erreur lors de l’envoi du code.';
        this.loading = false;
      }
    });
  }
}