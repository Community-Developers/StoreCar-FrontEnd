import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const service = inject(LoginService);

  return service.isLoggedIn();
};
