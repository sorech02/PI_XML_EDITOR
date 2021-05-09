import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../services/user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private isAdmin:boolean;
  private usersList:User[];
  private noEmailUsersList:User[];
  private adminsList:User[];

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.isAdmin = false;
    this.usersList=[];
    this.noEmailUsersList=[];
    this.adminsList=[];
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        var userDocument = this.db.collection("users").doc(res.uid);
        var user: any = userDocument.valueChanges();
        user.subscribe(value => {
          this.isAdmin = !!value.userRank && value.userRank==2;
        });
      } else {
        this.isAdmin = false;
      }
    });

    this.loadUsers();
  }

  loadUsers() {
    var thisComponent = this;

    this.db.collection("users").get().forEach(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var user:User = new User();
        user.uid = doc.data().uid;
        user.email = doc.data().email;
        user.emailVerified = doc.data().emailVerified;
        user.userRank = doc.data().userRank;

        if(!user.emailVerified) {
          thisComponent.noEmailUsersList.push(user);
        } else if(user.userRank==2) {
          thisComponent.adminsList.push(user);
        } else {
          thisComponent.usersList.push(user);
        }
      });
    });
  }

  changeRank(user:User, event) {
    if(event.target.checked) { //we update the rank
      user.userRank = 1;
    } else {
      user.userRank = 0;
    }

    //we update the user into the db
    this.db.collection("users").doc(user.uid).update({
      "userRank": user.userRank
    }).then(function() {
      console.log("User rank successfully updated");
      
    }).catch(function(error) {
      console.log("Error while updating the user : ", error);
    });
  }

  test() {
    console.log("TEST");
  }
}

