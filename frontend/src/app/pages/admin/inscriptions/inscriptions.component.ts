
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Inscription,
  InscriptionStatut
} from 'types/inscription.interface';

import { InscriptionService } from 'src/app/core/services/inscription.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, Search, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [
    SidebarComponent,
    StatutBadgeComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {

  readonly Search = Search;
  readonly Check = Check;
  readonly X = X;

  search = '';

  selectedStatus: InscriptionStatut | '' = '';

  inscriptions: Inscription[] = [];

  loading = false;

  errorMessage = '';

  // Inscription being updated
  updatingId: number | null = null;

  constructor(
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {

    this.loading = true;
    this.errorMessage = '';

    this.inscriptionService.getAll().subscribe({

      next: data => {

        this.inscriptions = data;
        this.loading = false;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger les inscriptions.';

        this.loading = false;

      }

    });

  }

  get filteredInscriptions(): Inscription[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.inscriptions.filter(inscription => {

      const matchesSearch =
        (inscription.participant?.name || '').toLowerCase().includes(searchValue) ||
        (inscription.participant?.email || '').toLowerCase().includes(searchValue) ||
        (inscription.atelier?.title || '').toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        inscription.statut === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  countByStatus(statut: InscriptionStatut): number {
    return this.inscriptions.filter(i => i.statut === statut).length;
  }

  updateStatus(inscription: Inscription, statut: InscriptionStatut): void {

    if (statut === 'annulee') {

      const confirmed = confirm(
        'Voulez-vous vraiment annuler cette inscription ?'
      );

      if (!confirmed) {
        return;
      }

    }

    this.updatingId = inscription.id;
    this.errorMessage = '';

    this.inscriptionService.updateStatus(inscription.id, statut).subscribe({

      next: updated => {

        inscription.statut = updated.statut;
        this.updatingId = null;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de modifier le statut.';

        this.updatingId = null;

      }

    });

  }
}
