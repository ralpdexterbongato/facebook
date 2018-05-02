import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(
    private route: Router,
    private token: TokenService,
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(!this.token.checkIfVerified())
      {
        this.route.navigate(['check-your-email']);
        return false;
      }
      return true;
  }
}
