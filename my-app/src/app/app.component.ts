import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
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
}


