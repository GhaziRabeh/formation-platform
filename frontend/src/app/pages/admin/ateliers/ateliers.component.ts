import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ateliers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent {

 search = '';
  selectedStatus = '';

  ateliers = [
    {
      id: 1,
      title: 'Développement Web',
      description: 'Formation HTML, CSS et JavaScript',
      lieu: 'Nabeul',
      formateur: 'Ahmed Ben Ali',
      date_debut: '2026-11-20',
      date_fin: '2026-11-22',
      capacite: 25,
      statut: 'planifie'
    },
    {
      id: 2,
      title: 'Angular Avancé',
      description: 'Développement avec Angular',
      lieu: 'Tunis',
      formateur: 'Mohamed Salah',
      date_debut: '2026-11-25',
      date_fin: '2026-11-28',
      capacite: 20,
      statut: 'en_cours'
    },
    {
      id: 3,
      title: 'Laravel API',
      description: 'Création des API REST',
      lieu: 'Nabeul',
      formateur: 'Sami Trabelsi',
      date_debut: '2026-11-28',
      date_fin: '2026-11-30',
      capacite: 15,
      statut: 'termine'
    }
  ];

  get filteredAteliers() {
    return this.ateliers.filter(atelier => {
      const matchesSearch =
        atelier.title.toLowerCase().includes(this.search.toLowerCase()) ||
        atelier.formateur.toLowerCase().includes(this.search.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || atelier.statut === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  deleteAtelier(id: number): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer cet atelier ?');

    if (confirmed) {
      this.ateliers = this.ateliers.filter(atelier => atelier.id !== id);
    }
  }
}
