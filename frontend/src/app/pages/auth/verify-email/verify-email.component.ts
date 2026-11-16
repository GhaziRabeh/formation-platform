import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent {

  loading = false;
  errorMessage = '';
  successMessage = '';

  verifyForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.verifyForm = this.fb.nonNullable.group({
      email: [
        this.route.snapshot.queryParamMap.get('email') || '',
        [Validators.required, Validators.email]
      ],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  submit(): void {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.verifyEmail(this.verifyForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login']),
      error: error => {
        this.errorMessage = error.error?.message || 'Code OTP invalide.';
        this.loading = false;
      }
    });
  }

  resendOtp(): void {
    const email = this.verifyForm.controls.email.value;

    if (!email) {
      this.errorMessage = 'Veuillez saisir votre email.';
      return;
    }

    this.authService.resendEmailOtp(email).subscribe({
      next: response => {
        this.successMessage = response.message || 'Code envoyé.';
        this.errorMessage = '';
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Erreur lors de l’envoi.';
      }
    });
  }
}