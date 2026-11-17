
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Atelier } from 'types/atelier.interface';
import { Inscription, InscriptionStatut } from 'types/inscription.interface';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { InscriptionService } from 'src/app/core/services/inscription.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, ArrowLeft, Search, MapPin, Calendar, ArrowRight, Users, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [
    SidebarComponent,
    StatutBadgeComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly ArrowRight = ArrowRight;
  readonly Users = Users;
  readonly Check = Check;
  readonly X = X;

  atelierId!: number;

  atelier: Atelier | null = null;

  inscriptions: Inscription[] = [];

  search = '';

  selectedStatus: InscriptionStatut | '' = '';

  loading = true;

  // Load error
  loadError = '';

  // Action error
  errorMessage = '';

  // Inscription being updated
  updatingId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private atelierService: AtelierService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {

    this.atelierId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.atelierId || Number.isNaN(this.atelierId)) {
      this.loadError = 'Identifiant atelier invalide.';
      this.loading = false;
      return;
    }

    this.loadData();

  }

  loadData(): void {

    this.loading = true;
    this.loadError = '';

    // Get atelier
    this.atelierService.getById(this.atelierId).subscribe({

      next: atelier => {
        this.atelier = atelier;
      },

      error: error => {
        this.loadError =
          error.error?.message ||
          'Impossible de charger cet atelier.';
        this.loading = false;
      }

    });

    // Get inscriptions
    this.inscriptionService.getByAtelier(this.atelierId).subscribe({

      next: data => {
        this.inscriptions = data;
        this.loading = false;
      },

      error: error => {
        this.loadError =
          error.error?.message ||
          'Impossible de charger les participants.';
        this.loading = false;
      }

    });

  }

  get filteredInscriptions(): Inscription[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.inscriptions.filter(inscription => {

      const matchesSearch =
        (inscription.participant.name || '').toLowerCase().includes(searchValue) ||
        (inscription.participant.email || '').toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        inscription.statut === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  countByStatus(statut: InscriptionStatut): number {
    return this.inscriptions.filter(i => i.statut === statut).length;
  }

  // Count taken places
  get placesOccupees(): number {
    return this.countByStatus('en_attente') + this.countByStatus('confirmee');
  }

  updateStatus(inscription: Inscription, statut: InscriptionStatut): void {

    if (statut === 'annulee') {

      const confirmed = confirm(
        `Voulez-vous vraiment annuler l'inscription de ${inscription.participant.name} ?`
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
