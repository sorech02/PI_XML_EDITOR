import { Component, OnInit } from '@angular/core';
import {commentary } from '../services/commentary'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from '../services/user'
import { subComment } from '../services/subComment';
import { formatDate } from '@angular/common';


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
  protected tmpMessage: string;
  protected ListEditor : User[];
  
  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.isEditing = false;
    this.tmpPersonne = new User;
    this.commentaires = new Array()
    this.ListEditor =  new Array();
  }
  
    ngOnInit() {
      this.ListEditor =  new Array();
      this.CommentaireCollection = this.db.collection("Commentaire");
      this.document$ = this.CommentaireCollection.valueChanges();
      this.document$.subscribe((list: commentary[]) => {this.commentaires = list.reverse()
        
        this.commentaires.forEach(
          (commentaire: commentary) => {
          let test  = this.db.doc('users/' + commentaire.idUserPost).valueChanges();
          test.subscribe(value => {
            this.ListEditor.push(<User> value)
          }).unsubscribe;
        }
        
      )
      }
        ).unsubscribe;
       this.tmpMessage="writre your comment"
    }
  /*sortMyList(arg0: commentary[]): commentary[] {
        }*/
  getAllEditors() {
      this.commentaires.forEach(
          (commentaire: commentary) => {
          let test  = this.db.doc('users/' + commentaire.idUserPost).valueChanges();
          test.subscribe(value => {
            console.log(value)
            this.ListEditor.push(<User> value)
          }).unsubscribe;

          }
        
      )
      this.reduceMe()

        }

      reduceMe(){
        let tmpUser: User[]
          this.ListEditor.forEach(User => {
            if(tmpUser.indexOf(User)==-1){
              tmpUser.push(User);
            }
            
            
          });
          this.ListEditor=tmpUser
      }


    getUserName(id:string):User{
     let     flagFind = false;
     let n =0;
     if(this.ListEditor[n]!=undefined){
        while(!flagFind){
          if(this.ListEditor[n].uid == id){
            return(this.ListEditor[n])
          }
          n++;
        }
      }
      return new User
    }

    getDate(date:Date){
      return(formatDate(date, 'dd-MM-yyyy hh:mm:ss a', 'en-US'))
    }
    
    addNewCom(com:commentary){
      let newSubCom = new subComment(JSON.parse(localStorage.getItem('user')).uid,this.tmpMessage);
      com.listCommentaires.push(newSubCom);
      const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${
        formatDate(com.editTime, 'dd-MM-yyyy hh:mm:ss a', 'en-US').concat(com.idUserPost).concat(com.xmlChange).concat(com.label)}
      }`);
      userRef.set(com, {
        merge: true
      })
    }

  ShowMeComment(com:commentary){
   com.showCom=!com.showCom;
  }

 //RECENT CHANGE  
}
