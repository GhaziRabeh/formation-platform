
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { User } from 'types/user.interface';

import { UserService } from 'src/app/core/services/user.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  readonly Search = Search;

  search = '';

  participants: User[] = [];

  loading = false;

  errorMessage = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  // Get participants
  loadParticipants(): void {

    this.loading = true;
    this.errorMessage = '';

    this.userService.getAll('participant').subscribe({

      next: data => {

        this.participants = data;
        this.loading = false;

      },

      error: error => {

        this.errorMessage =
          error.error?.message ||
          'Impossible de charger les participants.';

        this.loading = false;

      }

    });

  }

  get filteredParticipants(): User[] {

    const searchValue = this.search.toLowerCase().trim();

    return this.participants.filter(participant =>
      (participant.name || '').toLowerCase().includes(searchValue) ||
      (participant.email || '').toLowerCase().includes(searchValue)
    );

  }
}
