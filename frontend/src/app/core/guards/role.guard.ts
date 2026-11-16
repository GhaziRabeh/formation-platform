
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('ROLE GUARD:', state.url);
  console.log('TOKEN:', !!authService.getToken());
  console.log('USER:', authService.getUser());

  if (!authService.isAuthenticated()) {
    console.log('REDIRECT: TOKEN ABSENT');
    return router.createUrlTree(['/login']);
  }

  const requiredRole = route.data?.['role'];
  const currentUser = authService.getUser();

  if (currentUser) {
    console.log('ROLE:', currentUser.role);
    console.log('REQUIRED:', requiredRole);

    return currentUser.role === requiredRole
      ? true
      : router.createUrlTree(['/login']);
  }

  return authService.getCurrentUser().pipe(
    map(user => {
      console.log('API USER:', user);
      console.log('API ROLE:', user.role);

      return user.role === requiredRole
        ? true
        : router.createUrlTree(['/login']);
    }),
    catchError(error => {
      console.error('ROLE GUARD ERROR:', error);
      authService.clearSession();
      return of(router.createUrlTree(['/login']));
    })
  );
};
