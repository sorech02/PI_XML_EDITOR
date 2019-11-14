import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  isAuth: boolean;
  constructor(private authService: AuthService,
    private router: Router) {
  
    const config = {
      apiKey: "AIzaSyAVHzC98f2ffiAsrt9LrKKNBXWupQaUAqs",
    authDomain: "pinist-6d1a2.firebaseapp.com",
    databaseURL: "https://pinist-6d1a2.firebaseio.com",
    projectId: "pinist-6d1a2",
    storageBucket: "pinist-6d1a2.appspot.com",
     messagingSenderId: "404187443436",
     appId: "1:404187443436:web:aa3edf3ae32cf5c2bcb5c9",
   measurementId: "G-MHHTES3BYW"

    };
    firebase.initializeApp(config);

  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
    this.isAuth=false;
    ResourceLoader
  }

}


