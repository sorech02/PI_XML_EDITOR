import { Component } from '@angular/core';
//import * as firebase from 'firebase';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import {environment} from '../environments/environment';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  
  isAuth: boolean;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,public afAuth: AngularFireAuth) {
      this.isAuth = false;
    }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.isAuth = true;
        console.log('user is logged in');
      } else {
        this.isAuth = false;
        console.log('user not logged in');
      }
    });
    /*firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );*/
  }

  onSignOut() {/*
    this.authService.signOutUser();
    this.isAuth=false;
    ResourceLoader*/
  }

}


