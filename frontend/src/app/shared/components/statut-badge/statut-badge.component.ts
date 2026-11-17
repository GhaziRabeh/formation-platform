
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statut-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statut-badge.component.html',
  styleUrls: ['./statut-badge.component.css']
})
export class StatutBadgeComponent {

  // Atelier or inscription status
  @Input() statut = '';

  // Status labels
  labels: Record<string, string> = {
    // Ateliers
    planifie: 'Planifié',
    en_cours: 'En cours',
    termine: 'Terminé',
    annule: 'Annulé',

    // Inscriptions
    en_attente: 'En attente',
    confirmee: 'Confirmée',
    annulee: 'Annulée'
  };

  // Status colors
  colors: Record<string, string> = {
    // Ateliers
    planifie: 'bg-blue-100 text-blue-700',
    en_cours: 'bg-green-100 text-green-700',
    termine: 'bg-gray-100 text-gray-700',
    annule: 'bg-red-100 text-red-700',

    // Inscriptions
    en_attente: 'bg-amber-100 text-amber-700',
    confirmee: 'bg-green-100 text-green-700',
    annulee: 'bg-red-100 text-red-700'
  };

  get label(): string {
    return this.labels[this.statut] || this.statut;
  }

  get color(): string {
    return this.colors[this.statut] || 'bg-gray-100 text-gray-700';
  }

}
