
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { UserService } from 'src/app/core/services/user.service';
import { AtelierStatut } from 'types/atelier.interface';
import { User } from 'types/user.interface';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-create-atelier',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './create-atelier.component.html',
  styleUrls: ['./create-atelier.component.css']
})
export class CreateAtelierComponent implements OnInit {

  readonly ArrowLeft = ArrowLeft;

  atelierForm: FormGroup;

  loading = false;
  errorMessage = '';

  selectedImage: File | null = null;

  formateurs: User[] = [];

  constructor(
    private fb: FormBuilder,
    private atelierService: AtelierService,
    private userService: UserService,
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
      ],

      formateur_id: ['', Validators.required]

    });

  }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  // Get formateurs
  loadFormateurs(): void {

    this.userService.getAll('formateur').subscribe({

      next: data => {
        this.formateurs = data;
      },

      error: error => {
        this.errorMessage =
          error.error?.message ||
          'Impossible de charger les formateurs.';
      }

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

    const { date_debut, date_fin } = this.atelierForm.value;

    if (new Date(date_fin) <= new Date(date_debut)) {
      this.errorMessage = 'La date de fin doit être après la date de début.';
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

      next: () => {

        this.loading = false;

        this.router.navigate(['/admin/ateliers']);

      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Impossible de créer cet atelier.';

      }

    });

  }

}
