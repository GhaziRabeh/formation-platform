
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { AtelierStatut } from 'types/atelier.interface';

@Component({
  selector: 'app-create-atelier',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-atelier.component.html',
  styleUrls: ['./create-atelier.component.css']
})
export class CreateAtelierComponent {

  atelierForm: FormGroup;

  loading = false;
  errorMessage = '';

  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private atelierService: AtelierService,
    private router: Router
  ) {

    this.atelierForm = this.fb.group({

      title: ['', Validators.required],
      description: [''],
      lieu: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],

      capacite: [
        20,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      statut: [
        'planifie' as AtelierStatut,
        Validators.required
      ]

    });

  }

  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.selectedImage =
      input.files && input.files.length > 0
        ? input.files[0]
        : null;

  }

  submit(): void {

    if (this.atelierForm.invalid) {
      this.atelierForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formData = new FormData();

    Object.entries(this.atelierForm.value).forEach(
      ([key, value]) => {
        formData.append(key, String(value ?? ''));
      }
    );

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.atelierService.create(formData).subscribe({

      next: (response) => {

        console.log('Atelier créé:', response);

        this.loading = false;

        this.router.navigate(['/admin/ateliers']);

      },

      error: (error) => {

        console.error('Erreur création:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Impossible de créer cet atelier.';

      }

    });

  }

}
