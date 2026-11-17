
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Atelier } from 'types/atelier.interface';
import { Inscription } from 'types/inscription.interface';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { InscriptionService } from 'src/app/core/services/inscription.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { LucideAngularModule, ClipboardList, LogOut, Search, GraduationCap, MapPin, Calendar, ArrowRight, CircleCheck, Hourglass } from 'lucide-angular';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  readonly ClipboardList = ClipboardList;
  readonly LogOut = LogOut;
  readonly Search = Search;
  readonly GraduationCap = GraduationCap;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly ArrowRight = ArrowRight;
  readonly CircleCheck = CircleCheck;
  readonly Hourglass = Hourglass;

  search = '';

  ateliers: Atelier[] = [];

  // Active inscriptions by atelier
  mesInscriptions: Record<number, Inscription> = {};

  loading = false;

  errorMessage = '';
  successMessage = '';

  // Atelier being registered
  inscriptionEnCours: number | null = null;

  constructor(
    private atelierService: AtelierService,
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCatalogue();
  }

  get userName(): string {
    return this.authService.getUser()?.name || 'Participant';
  }

  loadCatalogue(): void {

    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      ateliers: this.atelierService.getAll(),
      inscriptions: this.inscriptionService.getMine()
    }).subscribe({

      next: ({ ateliers, inscriptions }) => {

        this.ateliers = ateliers;

        this.mesInscriptions = {};

        inscriptions
          .filter(i => i.statut !== 'annulee' && i.atelier.id)
          .forEach(i => this.mesInscriptions[i.atelier.id as number] = i);

        this.loading = false;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger le catalogue.';

        this.loading = false;

      }

    });

  }

  get filteredAteliers(): Atelier[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.ateliers.filter(atelier =>
      (atelier.title || '').toLowerCase().includes(searchValue) ||
      (atelier.lieu || '').toLowerCase().includes(searchValue) ||
      (atelier.formateur?.name || '').toLowerCase().includes(searchValue)
    );

  }

  isInscrit(atelier: Atelier): boolean {
    return !!this.mesInscriptions[atelier.id];
  }

  placesRestantes(atelier: Atelier): number {
    return Math.max(atelier.capacite - (atelier.participants_count ?? 0), 0);
  }

  isComplet(atelier: Atelier): boolean {
    return this.placesRestantes(atelier) === 0;
  }

  inscrire(atelier: Atelier): void {

    this.inscriptionEnCours = atelier.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.inscriptionService.inscrire(atelier.id).subscribe({

      next: inscription => {

        this.mesInscriptions[atelier.id] = inscription;
        atelier.participants_count = (atelier.participants_count ?? 0) + 1;

        this.successMessage =
          `Inscription à « ${atelier.title} » envoyée. Elle est en attente de confirmation.`;

        this.inscriptionEnCours = null;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de vous inscrire à cet atelier.';

        this.inscriptionEnCours = null;

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
