import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecureSignPage implements CanActivate {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authenticationService.isLoggedIn) {
      window.alert("You are not allowed to access this URL!");
       this.router.navigate(['dashboard'])
    }
    return true;
  }

}