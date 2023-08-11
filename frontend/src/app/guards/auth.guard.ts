import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentification-Service/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
};


