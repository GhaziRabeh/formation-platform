
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Atelier,
  AtelierParticipant,
  AtelierStatut
} from 'types/atelier.interface';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, Plus, Search, GraduationCap, Users, ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-ateliers',
  standalone: true,
  imports: [
    SidebarComponent,
    StatutBadgeComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent implements OnInit {

  readonly Plus = Plus;
  readonly Search = Search;
  readonly GraduationCap = GraduationCap;
  readonly Users = Users;
  readonly ChevronUp = ChevronUp;
  readonly ChevronDown = ChevronDown;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  search = '';

  selectedStatus: AtelierStatut | '' = '';

  ateliers: Atelier[] = [];

  loading = false;

  errorMessage = '';

  // Opened participants list
  openedAtelierId: number | null = null;

  participants: AtelierParticipant[] = [];

  loadingParticipants = false;

  participantsError = '';

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

  // Toggle participants list
  toggleParticipants(atelier: Atelier): void {

    if (this.openedAtelierId === atelier.id) {
      this.openedAtelierId = null;
      return;
    }

    this.openedAtelierId = atelier.id;
    this.participants = [];
    this.participantsError = '';
    this.loadingParticipants = true;

    this.atelierService.getParticipants(atelier.id).subscribe({

      next: data => {

        this.participants = data;
        this.loadingParticipants = false;

      },

      error: error => {

        this.participantsError =
          error.error?.message ||
          'Impossible de charger les participants.';

        this.loadingParticipants = false;

      }

    });

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

        alert(
          error.error?.message ||
          'Impossible de supprimer cet atelier.'
        );

      }

    });

  }
}
