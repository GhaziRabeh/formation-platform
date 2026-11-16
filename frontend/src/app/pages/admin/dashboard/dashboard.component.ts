
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Atelier } from 'types/atelier.interface';
import { AtelierService } from 'src/app/core/services/atelier.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = [
    { title: 'Total ateliers', value: 0, icon: '📚' },
    { title: 'Participants', value: 0, icon: '👥' },
    { title: 'Formateurs', value: 0, icon: '🎓' },
    { title: 'Inscriptions', value: 0, icon: '📝' }
  ];

  ateliers: Atelier[] = [];

  loading = false;
  errorMessage = '';

  constructor(private atelierService: AtelierService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.atelierService.getAll().subscribe({
      next: (data) => {
        this.ateliers = [...data]
          .sort((a, b) =>
            new Date(b.created_at || b.date_debut).getTime() -
            new Date(a.created_at || a.date_debut).getTime()
          )
          .slice(0, 5);

        this.stats[0].value = data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur dashboard:', error);
        this.errorMessage = 'Impossible de charger les ateliers.';
        this.loading = false;
      }
    });
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      planifie: 'Planifié',
      en_cours: 'En cours',
      termine: 'Terminé',
      annule: 'Annulé'
    };

    return labels[statut] || statut;
  }
}
