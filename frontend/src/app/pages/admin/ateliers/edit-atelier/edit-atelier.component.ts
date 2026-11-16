
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
import { Atelier, AtelierStatut } from 'types/atelier.interface';

@Component({
  selector: 'app-edit-atelier',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-atelier.component.html',
  styleUrls: ['./edit-atelier.component.css']
})
export class EditAtelierComponent implements OnInit {

  atelierForm: FormGroup;

  id!: number;

  loading = false;
  loadingData = true;

  errorMessage = '';

  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private atelierService: AtelierService
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

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.id || Number.isNaN(this.id)) {

      this.errorMessage = 'Identifiant atelier invalide.';
      this.loadingData = false;

      return;
    }

    this.loadAtelier();

  }

  // Récupérer les informations de l'atelier
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

          statut: atelier.statut

        });

        this.loadingData = false;

      },

      error: (error) => {

        console.error('Erreur chargement atelier:', error);

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger les informations de cet atelier.';

        this.loadingData = false;

      }

    });

  }

  // Convertir la date Laravel vers datetime-local
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

  // Sélectionner une nouvelle image
  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0];

    } else {

      this.selectedImage = null;

    }

  }

  // Enregistrer les modifications
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

    // Image facultative
    if (this.selectedImage) {

      formData.append('image', this.selectedImage);

    }

    // Laravel reçoit une requête PUT via POST
    formData.append('_method', 'PUT');

    this.atelierService.update(this.id, formData).subscribe({

      next: (response) => {

        console.log('Atelier modifié avec succès:', response);

        this.loading = false;

        this.router.navigate(['/admin/ateliers']);

      },

      error: (error) => {

        console.error('Erreur modification atelier:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Impossible de modifier cet atelier.';

      }

    });

  }

}
