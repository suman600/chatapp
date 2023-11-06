import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth-service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { of, Observable } from 'rxjs';

class UserToken {}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = this.authService.isAuthenticated();
  constructor(
    private authService: AuthService,
    private router: Router){
  };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any  {
    if (this.isLoggedIn){
      return true
    } else {
      this.router.navigate(['/login']);
    }
  }
}
