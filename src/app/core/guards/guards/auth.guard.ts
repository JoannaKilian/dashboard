import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.userService.authState$.pipe(
      map(authState => {
        if(authState) {
          return true;
        } else {
          this.router.navigate(['/login/']);
          return false;
        }
      })
    );
  }
}