import { Component, OnInit } from '@angular/core';
import {commentary } from '../services/commentary'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from '../services/user'


@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  protected CommentaireCollection:      AngularFirestoreCollection ;
  protected Commentaire:    AngularFirestoreDocument<commentary>;
  protected document$:          Observable<any[]>;
  protected commentaires:          commentary[];
  protected db:                 AngularFirestore;
  protected isDocumentDefined:  boolean; 
  protected myCommentaire:      commentary;
  protected isCodeSelected:     boolean;
  protected isEditing:          boolean;
  protected tmpPersonne:        User;
  
  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.isEditing = false;
    this.tmpPersonne = new User;
  }
  

  


    ngOnInit() {
      this.CommentaireCollection = this.db.collection("Commentaire");
      this.document$ = this.CommentaireCollection.valueChanges();
      this.document$.forEach(list => this.commentaires = list);      
    }
    getUserName(id:string){
      let test  = this.db.doc('users/' + id).valueChanges();
      test.subscribe(value => { this.tmpPersonne = <User> value
      });
    }
   
   

  ShowMeComment(com:commentary){
   com.showCom=!com.showCom;
  }

  
}
