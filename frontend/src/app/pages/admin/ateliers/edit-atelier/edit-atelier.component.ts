
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { UserService } from 'src/app/core/services/user.service';
import { Atelier, AtelierStatut } from 'types/atelier.interface';
import { User } from 'types/user.interface';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-edit-atelier',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './edit-atelier.component.html',
  styleUrls: ['./edit-atelier.component.css']
})
export class EditAtelierComponent implements OnInit {

  readonly ArrowLeft = ArrowLeft;

  atelierForm: FormGroup;

  id!: number;

  loading = false;
  loadingData = true;

  // Load error
  loadError = '';

  // Save error
  errorMessage = '';

  selectedImage: File | null = null;

  formateurs: User[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private atelierService: AtelierService,
    private userService: UserService
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

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.id || Number.isNaN(this.id)) {

      this.loadError = 'Identifiant atelier invalide.';
      this.loadingData = false;

      return;
    }

    this.loadFormateurs();
    this.loadAtelier();

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

  // Get atelier
  loadAtelier(): void {

    this.loadingData = true;

    this.atelierService.getById(this.id).subscribe({

      next: (atelier: Atelier) => {

        this.atelierForm.patchValue({

          title: atelier.title,

          description: atelier.description || '',

          lieu: atelier.lieu,

          date_debut: this.formatDate(atelier.date_debut),

          date_fin: this.formatDate(atelier.date_fin),

          capacite: atelier.capacite,

          statut: atelier.statut,

          formateur_id: atelier.formateur?.id ?? ''

        });

        this.loadingData = false;

      },

      error: (error) => {

        this.loadError =
          error.error?.message ||
          'Impossible de charger les informations de cet atelier.';

        this.loadingData = false;

      }

    });

  }

  // Format date for input
  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    const d = new Date(date);

    const pad = (value: number) =>
      String(value).padStart(2, '0');

    return (
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
      `T${pad(d.getHours())}:${pad(d.getMinutes())}`
    );

  }

  // Select image
  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

    } else {

      this.selectedImage = null;

    }

  }

  // Update atelier
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

    // Optional image
    if (this.selectedImage) {

      formData.append('image', this.selectedImage);

    }

    // Update via POST route
    this.atelierService.update(this.id, formData).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(['/admin/ateliers']);

      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Impossible de modifier cet atelier.';

      }

    });

  }

}
