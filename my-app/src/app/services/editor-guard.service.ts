import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class EditorGuardService implements CanActivate {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var isEditor: boolean = false;

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        var userDocument = this.db.collection("users").doc(res.uid);
        var user: any = userDocument.valueChanges();
        user.subscribe(value => {
          if(!!value.userRank) {
            isEditor = value.userRank>0;
          }
        });

      }
    });

    if(isEditor) {
      window.alert("You are not allowed to access this URL!");
       this.router.navigate(['home'])
    }
    return true;
  }
}