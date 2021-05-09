import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from "../services/user";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData: any; // Save logged in user data
  user$:Observable<any>;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    public afs: AngularFirestore,   // Inject Firestore service
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  

  
// Sign in with email/password
SignIn(email, password) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['comments']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)
    })
}

// Sign up with email/password
SignUp(email, password) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)
    })
}

// Send email verfificaiton when new user sign up
SendVerificationMail() {
  return this.afAuth.auth.currentUser.sendEmailVerification()
  .then(() => {
    this.router.navigate(['verify-email-address']);
  })
}

// Reset Forggot password
ForgotPassword(passwordResetEmail) {
  return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    window.alert('Password reset email sent, check your inbox.');
  }).catch((error) => {
    window.alert(error)
  })
}

// Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null && user.emailVerified !== false) ? true : false;
}

getUser(){
  return(JSON.parse(localStorage.getItem('user')).uid)
}

// Auth logic to run auth providers
AuthLogin(provider) {
  return this.afAuth.auth.signInWithPopup(provider)
  .then((result) => {
     this.ngZone.run(() => {
        this.router.navigate(['home']);
      })
    this.SetUserData(result.user);
  }).catch((error) => {
    window.alert(error)
  })
}

/* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
SetUserData(user) {
  if(user.emailVerified) {  //do it only if the email has not been verified, else the date is reset at every login
    //if the mail has been verified
    this.afAuth.authState.subscribe(res => {
      //check if it is already written in the DB
      if (res && res.uid) {
        var userDocument = this.afs.collection("users").doc(res.uid);
        var userB: any = userDocument.valueChanges();
        var thisComponent = this;
        var once:boolean = false;
        userB.subscribe(value => {
          if(!once) {
            once = true;
            console.log("email already verified: "+value.emailVerified);
            if(!value.emailVerified) {//only update if it wasn't already written
              thisComponent.updateUserData(user);
            }
          }
        });
      }
    });
  } else {
    this.updateUserData(user);
  }
}

updateUserData(user) {
  if(!user.userRank) {
    user.userRank = 0;
  }
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    userRank: user.userRank
  }
  return userRef.set(userData, {
    merge: true
  });
}

// Sign out 
SignOut() {
  return this.afAuth.auth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  })
}


}