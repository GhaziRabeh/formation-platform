
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Atelier,
  AtelierStatut
} from 'types/atelier.interface';

import { AtelierService } from 'src/app/core/services/atelier.service';

@Component({
  selector: 'app-ateliers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent implements OnInit {

  search = '';

  selectedStatus: AtelierStatut | '' = '';

  ateliers: Atelier[] = [];

  loading = false;

  errorMessage = '';

  constructor(
    private atelierService: AtelierService
  ) {}

  ngOnInit(): void {
    this.loadAteliers();
  }

  loadAteliers(): void {

    this.loading = true;
    this.errorMessage = '';

    this.atelierService.getAll().subscribe({

      next: data => {

        this.ateliers = data;
        this.loading = false;

      },

      error: error => {

        console.error('Erreur chargement ateliers:', error);

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger les ateliers.';

        this.loading = false;

      }

    });

  }

  get filteredAteliers(): Atelier[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.ateliers.filter(atelier => {

      const matchesSearch =
        (atelier.title || '').toLowerCase().includes(searchValue) ||
        (atelier.formateur?.name || '').toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        atelier.statut === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  getStatutLabel(statut: AtelierStatut): string {

    const labels: Record<AtelierStatut, string> = {

      planifie: 'Planifié',
      en_cours: 'En cours',
      termine: 'Terminé',
      annule: 'Annulé'

    };

    return labels[statut];

  }

  deleteAtelier(id: number): void {

    const confirmed = confirm(
      'Voulez-vous vraiment supprimer cet atelier ?'
    );

    if (!confirmed) {
      return;
    }

    this.atelierService.delete(id).subscribe({

      next: () => {

        this.ateliers = this.ateliers.filter(
          atelier => atelier.id !== id
        );

      },

      error: error => {

        console.error('Erreur suppression:', error);

        alert(
          error.error?.message ||
          'Impossible de supprimer cet atelier.'
        );

      }

    });

  }

}
