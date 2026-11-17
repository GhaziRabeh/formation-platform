
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Atelier } from 'types/atelier.interface';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { InscriptionService } from 'src/app/core/services/inscription.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { StatutBadgeComponent } from 'src/app/shared/components/statut-badge/statut-badge.component';
import { LucideAngularModule, BookOpen, Users, GraduationCap, ClipboardList, Plus, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent, StatutBadgeComponent, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  readonly BookOpen = BookOpen;
  readonly Users = Users;
  readonly GraduationCap = GraduationCap;
  readonly ClipboardList = ClipboardList;
  readonly Plus = Plus;
  readonly ArrowRight = ArrowRight;

  stats = [
    { title: 'Total ateliers', value: 0, icon: BookOpen },
    { title: 'Participants', value: 0, icon: Users },
    { title: 'Formateurs', value: 0, icon: GraduationCap },
    { title: 'Inscriptions', value: 0, icon: ClipboardList }
  ];

  ateliers: Atelier[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private atelierService: AtelierService,
    private inscriptionService: InscriptionService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  get userName(): string {
    return this.authService.getUser()?.name || 'Administrateur';
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      ateliers: this.atelierService.getAll(),
      users: this.userService.getAll(),
      inscriptions: this.inscriptionService.getAll()
    }).subscribe({
      next: ({ ateliers, users, inscriptions }) => {
        this.ateliers = [...ateliers]
          .sort((a, b) =>
            new Date(b.created_at || b.date_debut).getTime() -
            new Date(a.created_at || a.date_debut).getTime()
          )
          .slice(0, 5);

        this.stats[0].value = ateliers.length;
        this.stats[1].value = users.filter(u => u.role === 'participant').length;
        this.stats[2].value = users.filter(u => u.role === 'formateur').length;
        this.stats[3].value = inscriptions.filter(i => i.statut !== 'annulee').length;

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ||
          'Impossible de charger le tableau de bord.';
        this.loading = false;
      }
    });
  }
}
