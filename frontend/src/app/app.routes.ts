
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // AUTHENTIFICATION
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component')
        .then(m => m.RegisterComponent),
  },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./pages/auth/verify-email/verify-email.component')
        .then(m => m.VerifyEmailComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent),
  },

  // ADMIN
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },

      {
        path: 'ateliers',
        loadComponent: () =>
          import('./pages/admin/ateliers/ateliers.component')
            .then(m => m.AteliersComponent),
      },

      {
        path: 'ateliers/create',
        loadComponent: () =>
          import('./pages/admin/ateliers/create-atelier/create-atelier.component')
            .then(m => m.CreateAtelierComponent),
      },

      {
        path: 'inscriptions',
        loadComponent: () =>
          import('./pages/admin/inscriptions/inscriptions.component')
            .then(m => m.InscriptionsComponent),
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/users/users.component')
            .then(m => m.UsersComponent),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // FORMATEUR
  {
    path: 'formateur',
    canActivate: [authGuard, roleGuard],
    data: { role: 'formateur' },
    children: [
      {
        path: 'mes-ateliers',
        loadComponent: () =>
          import('./pages/formateur/mes-ateliers/mes-ateliers.component')
            .then(m => m.MesAteliersComponent),
      },
      {
        path: '',
        redirectTo: 'mes-ateliers',
        pathMatch: 'full',
      },
    ],
  },

  // PARTICIPANT
  {
    path: 'participant',
    canActivate: [authGuard, roleGuard],
    data: { role: 'participant' },
    children: [
      {
        path: 'catalogue',
        loadComponent: () =>
          import('./pages/participant/catalogue/catalogue.component')
            .then(m => m.CatalogueComponent),
      },
      {
        path: 'inscriptions',
        loadComponent: () =>
          import('./pages/participant/mes-inscriptions/mes-inscriptions.component')
            .then(m => m.MesInscriptionsComponent),
      },
      {
        path: '',
        redirectTo: 'catalogue',
        pathMatch: 'full',
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
