import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
stats = [
    { title: 'Total ateliers', value: 24, icon: '📚' },
    { title: 'Participants', value: 156, icon: '👥' },
    { title: 'Formateurs', value: 12, icon: '🎓' },
    { title: 'Inscriptions', value: 89, icon: '📝' }
  ];

  ateliers = [
    {
      title: 'Développement Web',
      formateur: 'Ahmed Ben Ali',
      date: '20/11/2026',
      statut: 'Planifié'
    },
    {
      title: 'Angular Avancé',
      formateur: 'Mohamed Salah',
      date: '25/11/2026',
      statut: 'En cours'
    },
    {
      title: 'Laravel API',
      formateur: 'Sami Trabelsi',
      date: '28/11/2026',
      statut: 'Planifié'
    }
  ];
}



