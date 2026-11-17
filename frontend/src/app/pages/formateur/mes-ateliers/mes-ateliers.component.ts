
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Atelier, AtelierStatut } from 'types/atelier.interface';

import { AtelierService } from 'src/app/core/services/atelier.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, LogOut, Search, MapPin, Calendar, ArrowRight, Users } from 'lucide-angular';

@Component({
  selector: 'app-mes-ateliers',
  standalone: true,
  imports: [
    SidebarComponent,
    StatutBadgeComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './mes-ateliers.component.html',
  styleUrls: ['./mes-ateliers.component.css']
})
export class MesAteliersComponent implements OnInit {

  readonly LogOut = LogOut;
  readonly Search = Search;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly ArrowRight = ArrowRight;
  readonly Users = Users;

  search = '';

  selectedStatus: AtelierStatut | '' = '';

  ateliers: Atelier[] = [];

  loading = false;

  errorMessage = '';

  constructor(
    private atelierService: AtelierService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAteliers();
  }

  get userName(): string {
    return this.authService.getUser()?.name || 'Formateur';
  }

  // Get formateur ateliers
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
          'Impossible de charger vos ateliers.';

        this.loading = false;

      }

    });

  }

  get filteredAteliers(): Atelier[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.ateliers.filter(atelier => {

      const matchesSearch =
        (atelier.title || '').toLowerCase().includes(searchValue) ||
        (atelier.lieu || '').toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        atelier.statut === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  countByStatus(statut: AtelierStatut): number {
    return this.ateliers.filter(a => a.statut === statut).length;
  }

  get totalParticipants(): number {
    return this.ateliers.reduce(
      (total, atelier) => total + (atelier.participants_count ?? 0),
      0
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
