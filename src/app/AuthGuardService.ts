import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthService';


/**
 * Routes are protected by this component which ensures that only logged in users
 * can access the route, otherwise they are redirected to the home component(overview)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.authService.hasValidIdToken()) {
      return true;
    }
    console.log('Not Logged in.');
    this.router.navigate(['/Login']);
    return false;
  }
}
