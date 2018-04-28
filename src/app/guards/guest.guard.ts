import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
    private token:TokenService,
    private route:Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    if(!this.token.isLoggedIn())
    {
      return true;
    }
    this.route.navigate(['home']);
    return false;
  }
}
