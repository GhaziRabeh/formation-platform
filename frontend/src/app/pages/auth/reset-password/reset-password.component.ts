import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  loading = false;
  errorMessage = '';

  resetForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.nonNullable.group({
      email: [
        this.route.snapshot.queryParamMap.get('email') || '',
        [Validators.required, Validators.email]
      ],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password_confirmation: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const data = this.resetForm.getRawValue();

    if (data.new_password !== data.new_password_confirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.resetPassword(data).subscribe({
      next: () => this.router.navigate(['/login']),
      error: error => {
        this.errorMessage = error.error?.message || 'Erreur de réinitialisation.';
        this.loading = false;
      }
    });
  }
}