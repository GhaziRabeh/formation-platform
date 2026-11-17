
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Inscription, InscriptionStatut } from 'types/inscription.interface';

import { InscriptionService } from 'src/app/core/services/inscription.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, BookOpen, LogOut, MapPin, Calendar, ArrowRight, X } from 'lucide-angular';

@Component({
  selector: 'app-mes-inscriptions',
  standalone: true,
  imports: [
    SidebarComponent,
    StatutBadgeComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './mes-inscriptions.component.html',
  styleUrls: ['./mes-inscriptions.component.css']
})
export class MesInscriptionsComponent implements OnInit {

  readonly BookOpen = BookOpen;
  readonly LogOut = LogOut;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly ArrowRight = ArrowRight;
  readonly X = X;

  selectedStatus: InscriptionStatut | '' = '';

  inscriptions: Inscription[] = [];

  loading = false;

  errorMessage = '';
  successMessage = '';

  // Inscription being cancelled
  annulationEnCours: number | null = null;

  constructor(
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {

    this.loading = true;
    this.errorMessage = '';

    this.inscriptionService.getMine().subscribe({

      next: data => {

        this.inscriptions = data;
        this.loading = false;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger vos inscriptions.';

        this.loading = false;

      }

    });

  }

  get filteredInscriptions(): Inscription[] {
    return this.inscriptions.filter(inscription =>
      !this.selectedStatus ||
      inscription.statut === this.selectedStatus
    );
  }

  countByStatus(statut: InscriptionStatut): number {
    return this.inscriptions.filter(i => i.statut === statut).length;
  }

  annuler(inscription: Inscription): void {

    const confirmed = confirm(
      `Voulez-vous vraiment annuler votre inscription à « ${inscription.atelier.title} » ?`
    );

    if (!confirmed) {
      return;
    }

    this.annulationEnCours = inscription.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.inscriptionService.annuler(inscription.id).subscribe({

      next: updated => {

        inscription.statut = updated.statut;
        this.successMessage = 'Votre inscription a été annulée.';
        this.annulationEnCours = null;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible d’annuler cette inscription.';

        this.annulationEnCours = null;

      }

    });

  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
