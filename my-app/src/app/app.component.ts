import { Component } from '@angular/core';
//import * as firebase from 'firebase';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import {environment} from '../environments/environment';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  
  isAuth: boolean;
  isEditor: boolean;
  isAdmin: boolean;
  
  constructor(private authenticationService: AuthenticationService,
    private router: Router,public afAuth: AngularFireAuth,private db: AngularFirestore) {
      this.isAuth = false;
      this.isEditor = false;
      this.isAdmin = false;
    }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.isAuth = true;
        console.log('user is logged in');

        var userDocument = this.db.collection("users").doc(res.uid);
        var user: any = userDocument.valueChanges();
        user.subscribe(value => {
          if(!!value.userRank) {
            this.isEditor = value.userRank>0;
            this.isAdmin = value.userRank==2;
          }
        });

      } else {
        this.isAuth = false;
        console.log('user not logged in');
        
        this.isEditor = false;
        this.isAdmin = false;
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


