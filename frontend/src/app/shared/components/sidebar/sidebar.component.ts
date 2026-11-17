
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  LucideIconData,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  LogOut
} from 'lucide-angular';

import { AuthService } from 'src/app/core/services/auth.service';

// Menu link
interface MenuLink {
  label: string;
  icon: LucideIconData;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  readonly LogOut = LogOut;

  // Current role
  @Input() role: 'admin' | 'formateur' | 'participant' = 'admin';

  // Admin menu
  adminLinks: MenuLink[] = [
    { label: 'Dashboard', icon: LayoutDashboard, route: '/admin/dashboard' },
    { label: 'Ateliers', icon: BookOpen, route: '/admin/ateliers' },
    { label: 'Inscriptions', icon: ClipboardList, route: '/admin/inscriptions' },
    { label: 'Utilisateurs', icon: Users, route: '/admin/users' }
  ];

  // Formateur menu
  formateurLinks: MenuLink[] = [
    { label: 'Mes ateliers', icon: BookOpen, route: '/formateur/mes-ateliers' }
  ];

  // Participant menu
  participantLinks: MenuLink[] = [
    { label: 'Catalogue', icon: BookOpen, route: '/participant/catalogue' },
    { label: 'Mes inscriptions', icon: ClipboardList, route: '/participant/inscriptions' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Get links by role
  get links(): MenuLink[] {

    if (this.role === 'formateur') {
      return this.formateurLinks;
    }

    if (this.role === 'participant') {
      return this.participantLinks;
    }

    return this.adminLinks;

  }

  // Subtitle
  get subtitle(): string {

    if (this.role === 'formateur') {
      return 'Espace formateur';
    }

    if (this.role === 'participant') {
      return 'Espace participant';
    }

    return 'Administration';

  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }

}
