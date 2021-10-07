import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.verifyAccess();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess();
  }

  verifyAccess() {
    const token = localStorage.getItem('JWT');

    if (token) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
}
