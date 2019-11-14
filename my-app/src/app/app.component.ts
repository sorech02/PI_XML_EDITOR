import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import {environment} from '../environments/environment'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  isAuth: boolean;
  constructor(private authService: AuthService,
    private router: Router) { 
      
  
    firebase.initializeApp(environment.firebase);
    

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


