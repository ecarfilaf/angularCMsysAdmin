import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Auth } from "../services/auth";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(Auth);
  return authService.isAuthenticated();
};