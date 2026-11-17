
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const requiredRole = route.data?.['role'];
  const currentUser = authService.getUser();

  // Check user role
  if (currentUser) {
    return currentUser.role === requiredRole
      ? true
      : router.createUrlTree(['/login']);
  }

  // Load user then check role
  return authService.getCurrentUser().pipe(
    map(user => {
      return user.role === requiredRole
        ? true
        : router.createUrlTree(['/login']);
    }),
    catchError(() => {
      authService.clearSession();
      return of(router.createUrlTree(['/login']));
    })
  );
};
